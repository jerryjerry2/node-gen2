const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');
const mailService = require('./mailService');

const register = async (body) => {
    //console.log(body);
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required");
    }

    let checkEmail = await user.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error("Email Duplicate");
    }

    let hashpassword = await bcrypt.hash(body.password, 10);
    let verificationToken = crypto.randomBytes(32).toString('hex');
    let verificationExpired = new Date(Date.now() + 2 * 60 * 1000);
    console.log(verificationToken);

    
    let result = await user.create({
        name : body.name,
        email : body.email,
        password : hashpassword,
        verificationToken,
        verificationExpired
    });

    await mailService.sendVerificationEmail(body.email, verificationToken);

    let row = await user.findById(result);
    return row;
}

const login = async (body) => {
    if(!body.email || !body.password){
        throw new Error("Email and Password is required");
    }

    let UserInfo = await user.findByEmail(body.email);
    if(UserInfo.length == 0){
        throw new Error("Email and Password invalid");
    }

    //console.log(UserInfo);return;
    let isMatch = await bcrypt.compare(body.password, UserInfo[0].password);
    if(!isMatch){
        throw new Error("Email and Password invalid");
    }
    
    const token = jwt.sign(
        {id : UserInfo[0].id, email : UserInfo[0].email},
        jwtConfig.secret,
        {expiresIn : jwtConfig.expireIn}
    );

    // console.log(UserInfo);return;
    if(!UserInfo[0].is_verified){
        throw new Error("Email not verify");
    }
    
    await user.addToken(token, UserInfo[0].id);
    const row = await user.findById(UserInfo[0].id);

    return row;
}

const getMe = async (id) => {
    let row = await user.findById(id);

    return row;
}

const logout = async (id) => {
    await user.removeToken(id);
}

const verifyEmail = async (token) => {
    if(!token){
        throw new Error("Token is required");
    }

    let userInfo = await user.findByVerificationEmail(token);
    console.log(userInfo);
    if(userInfo.length == 0){
        throw new Error("Invalid Token");
    }

    if(userInfo[0].is_verified){
        throw new Error("Email already verify");
    }

    if(!userInfo[0].verification_expires || new Date(userInfo[0].verification_expires) < new Date()){
        throw new Error("Token is expired");
    }

    await user.verifyEmail(userInfo[0].id);
    
    return { message : 'Email verify Successfully' }
}

const resendVerificationEmail = async (email) => {
    if(!email) {
        throw new Error("Email is required");
    }

    const userInfo = await user.findByEmail(email);
    if(userInfo.length == 0){
        throw new Error("Invalid Email");
    }

    if(userInfo[0].is_verified){
        throw new Error("Email already verified");
    }

    let verificationToken = crypto.randomBytes(32).toString('hex');
    let verificationExpired = new Date(Date.now() + 2 * 60 * 1000);

    await user.resendVerificationEmail({
        verificationToken,
        verificationExpired,
        id : userInfo[0].id
    })

    await mailService.sendVerificationEmail(email, verificationToken);

    return { 'message' : 'Resend Email Successfully' };
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    verifyEmail,
    resendVerificationEmail
}
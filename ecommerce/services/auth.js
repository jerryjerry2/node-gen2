const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');
const crypto = require('crypto');
const mailService = require('../services/mailService');

const register = async (body) => {
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required"); 
    }

    const checkEmail = await user.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error("Email Duplicate"); 
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpired = new Date(Date.now() + 1 * 60 * 1000); //60min or 1h
    
    const result = await user.create({
        name : body.name,
        email : body.email,
        password : hashPassword,
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

    const UserInfo = await user.findByEmail(body.email);
    if(UserInfo.length == 0){
        throw new Error("Email and Password invalid"); 
    }

    let isMatch = await bcrypt.compare(body.password, UserInfo[0].password);
    if(!isMatch){
        throw new Error("Email and Password invalid"); 
    }

    if(!UserInfo[0].is_verified){
        throw new Error("You need to verify email"); 
    }
    
    const token = jwt.sign(
        {id : UserInfo[0].id, email : UserInfo[0].email},
        jwtConfig.secret,
        {expiresIn : jwtConfig.expireIn}
    );

    await user.addToken(token, UserInfo[0].id);
    let [row] = await user.findById(UserInfo[0].id);
    
    return row;
}

const getMe = async (id) => {
    const row = await user.findById(id);

    return row;
}

const logout = async (id) => {
    await user.deleteToken(id);
}

const verifyEmail = async (token) => {
    if(!token){
        throw new Error("Token is required");
    }

    let UserInfo = await user.findByVerificationEmail(token);
    if(UserInfo.length == 0){
        throw new Error("Invalid Token");
    }

    if(UserInfo[0].is_verified){ 
        throw new Error("Email already Verified");
    }

    console.log(new Date(UserInfo[0].verification_expires));
    console.log(new Date());
    
    if(!UserInfo[0].verification_expires || new Date(UserInfo[0].verification_expires) < new Date()){
        throw new Error("Link already expired");
    }
    
    await user.verifiedEmail(UserInfo[0].id);
    
    return { message : 'Email Verified Successfully'}
}

const resendVerificationLink = async (email) => {
    if(!email){
        throw new Error("Email is required");
    }

    let userInfo = await user.findByEmail(email);
    console.log(userInfo);
    if(userInfo.length == 0){
        throw new Error("Email not found");
    }

    if(userInfo[0].is_verified){
        throw new Error("Email already Verified");
    }

    const verification_token = crypto.randomBytes(32).toString('hex');
    const verification_expires = new Date(Date.now() + 60 * 60 * 1000); //60min or 1h

    await user.resendVerificationLink({
        id : userInfo[0].id,
        verification_token,
        verification_expires
    })
    
    await mailService.sendVerificationEmail(email, verification_token);

    return {message : 'Resend Successfully'}
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    verifyEmail,
    resendVerificationLink
}
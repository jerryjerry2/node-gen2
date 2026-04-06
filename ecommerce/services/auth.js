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
    const verificationExpired = new Date(Date.now() + 60 * 60 * 1000); //60min or 1h
    console.log(verificationToken);
    
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

module.exports = {
    register,
    login,
    getMe,
    logout
}
const user = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');
const mailService = require('../services/mailService');

const register = async (body) => {
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required");
    }

    let checkEmail = await user.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error("Duplicate Email");
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    const verification_token = crypto.randomBytes(32).toString('hex');
    //const verificationExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const verificationExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 minute
    
    const result = await user.create({
        name : body.name,
        email : body.email,
        password : hashPassword,
        verification_token,
        verificationExpires
    })

    await mailService.sendVerificationEmail(body.email, verification_token);

    const row = await user.findById(result);
    
    return row;
}

const login = async (body) => {
    if( !body.email || !body.password){
        throw new Error(" Email and Password is required");
    }

    let userInfo = await user.findByEmail(body.email);
    if(userInfo.length == 0){
        throw new Error("Invalid Email and Password");
    }
    
    let isMatch = await bcrypt.compare(body.password, userInfo[0].password);
    if(!isMatch){
        throw new Error("Invalid Email and Password");
    }

    if(!userInfo[0].is_verified){
        throw new Error("Please verify your email before login");
    }
    
    const token = jwt.sign(
        {id : userInfo[0].id, email : userInfo[0].email},
        jwtConfig.secret,
        {expiresIn : jwtConfig.expiresIn}
    );

    await user.addToken(token, userInfo[0].id);
    let row = await user.findById(userInfo[0].id);

    return row;
}

const getMe = (id) => {
    let row = user.findById(id);

    return row;
}

const logout = async (id) => {
    await user.deleteToken(id);
}

const verifyEmail = async (token) => {
    if(!token) {
        throw new Error('Verification token is required');
    }

    const userInfo = await user.findByVerificationToken(token);
    if(userInfo.length == 0){
        throw new Error('Invalid verification token');
    }

    if(userInfo[0].is_verified){
        throw new Error('Email Already Verified');
    }

    if (!userInfo[0].verification_expires || new Date(userInfo[0].verification_expires) < new Date()) {
        throw new Error('Verification token has expired');
    }
    
    await user.verifyEmail(userInfo[0].id);
    return { message : 'Email Verified Successfully'}
}

const resendVerificationEmail = async (body) => {
    if(!body.email){
        throw new Error('Email is required');
    }

    const userInfo = await user.findByEmail(body.email);
    if(userInfo.length == 0){
        throw new Error('User not found');
    }

    if (userInfo[0].is_verified) {
        throw new Error('Email is already verified');
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 60 * 60 * 1000);

    await user.resendVerificationEmail({
        id : userInfo[0].id,
        verificationToken,
        verificationExpires
    });

    await mailService.sendVerificationEmail(body.email, verificationToken);
    return { message : 'Verification email resent successfully' }
}


module.exports = {
    register,
    login,
    getMe,
    logout,
    verifyEmail,
    resendVerificationEmail
}
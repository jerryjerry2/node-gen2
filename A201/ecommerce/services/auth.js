const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const register = async (body) => {
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required");
    }

    let checkEmail = await user.getByEmail(body.email);
    if(checkEmail.length > 0) {
        throw new Error("Email Duplicate");
    }

    let hashPassword = await bcrypt.hash(body.password, 10);
    
    let result = await user.create({
        name : body.name,
        email : body.email,
        password : hashPassword
    });

    let row = await user.getById(result);
    
    return row;
}

const login = async (body) => {
    if(!body.email || !body.password){
        throw new Error("Email and Password is required");
    }

    let userInfo = await user.getByEmail(body.email);
    if(userInfo.length == 0) {
        throw new Error("Email and Password is invalid");
    }

    //console.log(userInfo);
    let isMatch = await bcrypt.compare(body.password, userInfo[0].password);
    if(!isMatch){
        throw new Error("Email and Password is invalid");
    }

    let token = jwt.sign(
        {id : userInfo[0].id, email : userInfo[0].email},
        jwtConfig.secret,
        {expiresIn : jwtConfig.expireIn}
    )

    await user.addToken(token, userInfo[0].id);
    let row = await user.getById(userInfo[0].id);
    
    return row;
}

const getMe = async (id) => {
    const row = await user.getById(id);

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
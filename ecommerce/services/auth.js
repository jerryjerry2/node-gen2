const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');

const register = async (body) => {
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required"); 
    }

    const checkEmail = await user.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error("Email Duplicate"); 
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    console.log(hashPassword);
    
    const result = await user.create({
        name : body.name,
        email : body.email,
        password : hashPassword
    })

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
    
    const token = jwt.sign(
        {id : UserInfo[0].id, email : UserInfo[0].email},
        jwtConfig.secret,
        {expiresIn : jwtConfig.expireIn}
    )
    
    return {
        name : UserInfo[0].name,
        email : UserInfo[0].email,
        phone : UserInfo[0].phone,
        address :UserInfo[0].address,
        token : token
    }
}

const getMe = async (id) => {
    const row = await user.findById(id);

    return row;
}

module.exports = {
    register,
    login,
    getMe
}
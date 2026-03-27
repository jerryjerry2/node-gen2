const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');

const register = async (body) => {
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required");
    }

    let checkEmail = await user.findByEmail(body.email);
    if(checkEmail.length > 0){
        throw new Error("Duplicate Email");
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    
    const result = await user.create({
        name : body.name,
        email : body.email,
        password : hashPassword
    })

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
    
    const token = jwt.sign(
        {id : userInfo.id, email : userInfo.email},
        jwtConfig.secret,
        {expiresIn : jwtConfig.expiresIn}
    )

    return {
        name : userInfo[0].name,
        email : userInfo[0].email,
        token
    }
}

module.exports = {
    register,
    login
}
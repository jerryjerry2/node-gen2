const bcrypt = require('bcryptjs');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');

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
    console.log(hashpassword);
    
    let result = await user.create({
        name : body.name,
        email : body.email,
        password : hashpassword
    });

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

    return {
        name : UserInfo[0].name,
        email : UserInfo[0].email,
        address : UserInfo[0].address,
        phone : UserInfo[0].phone,
        token : token
    }
    
    
    
}

module.exports = {
    register,
    login
}
const user = require('../models/user');
const bcrypt = require('bcryptjs');

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
    

    //console.log(body);
    
    
}

module.exports = {
    register,
    login
}
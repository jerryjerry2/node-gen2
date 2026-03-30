const user = require('../models/user');
const bcrypt = require('bcryptjs');

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

    //console.log(body);
}

module.exports = {
    register
}
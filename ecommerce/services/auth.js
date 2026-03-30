const bcrypt = require('bcryptjs');
const user = require('../models/user');

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

module.exports = {
    register
}
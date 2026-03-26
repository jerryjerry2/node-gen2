const user = require('../models/user');
const bcrypt = require('bcrypt');

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

module.exports = {
    register
}
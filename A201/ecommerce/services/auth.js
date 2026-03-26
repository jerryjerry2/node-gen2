const user = require('../models/user');

const register = async (body) => {
    // console.log(body);
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required");
    }

    let checkEmail = await user.getByEmail(body.email);
    if(checkEmail.length > 0) {
        throw new Error("Email Duplicate");
    }
    
    return body;
}

module.exports = {
    register
}
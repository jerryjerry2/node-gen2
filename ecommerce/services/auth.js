const register = (body) => {
    console.log(body);
    if(!body.name || !body.email || !body.password){
        throw new Error("Name, Email, Password is required");
    }
    
    return body;
}

module.exports = {
    register
}
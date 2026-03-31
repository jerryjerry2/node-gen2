const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if(!authHeader){
            return res.json({
                result : false,
                msg : 'You need to login'
            });
        }
        
    } catch (error) {
        
    }
}

module.exports = {
    isLogin
}
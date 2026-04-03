const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');

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

        let parts = authHeader.split(' ');
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.json({
                result : false,
                msg : 'Invalid Token'
            });
        }

        let token = parts[1];
        const decode = jwt.verify(token, jwtConfig.secret);
        
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : 'Invalid or Expired Token'
        });
    }
}

module.exports = {
    isLogin
}
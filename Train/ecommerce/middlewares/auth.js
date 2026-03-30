const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');

const isLogin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        //console.log(authHeader);

        if(!authHeader){
            return res.json({
                result : false,
                message : 'You need to login'
            })
        }

        const parts = authHeader.split(' ');
        
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.json({
                result : false,
                message : 'Invalid token format'
            })
        }

        const token = parts[1];
        const decode = jwt.verify(token, jwtConfig.secret);

        req.user = decode;
        next();

    } catch (error) {
        console.log(error);
        return res.json({
            result: false,
            message: 'Invalid token or expired'
        })
    }
}

module.exports = {
    isLogin
}
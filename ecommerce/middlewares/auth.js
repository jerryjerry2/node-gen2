const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');
const user = require('../models/user');

const isLogin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.json({
                result : false,
                msg : 'You need to login'
            })
        }

        let parts = authHeader.split(' ');
        
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.json({
                result : false,
                msg : 'Invalid Token'
            })
        }

        let token = parts[1];
        let decode = jwt.verify(token, jwtConfig.secret);

        let row = await user.getByToken(token);
        console.log(row);
        if(row.length == 0){
            throw new Error("Invalid or Expired Token");
        }
        
        req.user = decode;
        next();
    } catch (error) {
        return res.json({
            result : false,
            msg : 'Invalid or Expired Token'
        })
    }
}

module.exports = {
    isLogin
}
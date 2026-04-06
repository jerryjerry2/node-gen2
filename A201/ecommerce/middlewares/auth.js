const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const user = require('../models/user');

const islogin = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({
                result: false,
                msg: 'You need to login'
            })
        }

        let parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.json({
                result: false,
                msg: 'Invalid Token'
            })
        }

        let token = parts[1];
        let decode = jwt.verify(token, jwtConfig.secret);

        let userInfo = await user.findByToken(token);
        if(userInfo.length == 0){
            throw new Error("Invalid Token or expired"); 
        }

        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            result: false,
            msg: 'Invalid Token or expired'
        })
    }



}

module.exports = {
    islogin
}
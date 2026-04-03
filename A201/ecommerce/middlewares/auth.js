const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const islogin = (req, res, next) => {
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
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            result: false,
            msg: 'Invalid Token'
        })
    }



}

module.exports = {
    islogin
}
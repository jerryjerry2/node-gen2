const auth = require('../services/auth');

const register = async (req, res) => {
    try {
        const result = await auth.register(req.body);
        
        
        res.json({
            result : true,
            msg : 'Register Successfully',
            data : result
        })

    } catch (error) {
        console.log(error);
        
        res.json({
            result : true,
            data : error.message
        })
    }
}

const login = async (req, res) => {
    try {
        let row = await auth.login(req.body);

        return res.json({
            result : true,
            msg : 'Login Successfully',
            data: row
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const getMe = (req, res) => {
    try {
        console.log(123);
        
    } catch (error) {
        
    }
}

module.exports = {
    register,
    login,
    getMe
}
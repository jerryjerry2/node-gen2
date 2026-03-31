const authService = require('../services/auth');

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        return res.json({
            result : true,
            msg : 'Register Successfully',
            data : result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const login = async (req, res) => {
    try {
        let result = await authService.login(req.body);

        res.json({
            result : true,
            data : result
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : error.message
        })
    }
}

const getMe = async(req, res) => {
    try {
        const row = await authService.getMe(req.user.id);
        
        res.json({
            result : true,
            msg : 'Get own profile',
            data : row
        })
        
    } catch (error) {
        
    }
}

module.exports = {
    register,
    login,
    getMe
}
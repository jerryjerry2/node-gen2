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
        
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

module.exports = {
    register,
    login
}
const auth = require('../services/auth');

const register = async (req, res) => {
    try{
        let result = await auth.register(req.body);
        
        res.json({
            result : true,
            msg : 'Register User Successfully',
            data : result
        })
        
    }catch (error){
        res.json({
            result : true,
            msg : error.message,
        })
    }
};

const login = async (req, res) => {
    try {
        const result = await auth.login(req.body);

        res.json({
            result : true,
            msg : 'Login Successfully',
            data : result
        })
    } catch (error) {
        console.log(error);
        res.json({
            result : true,
            msg : error.message,
        })
    }
}

const getMe = async (req, res) => {
    try {
        const result = await auth.getMe(req.user.id);

        res.json({
            result : true,
            msg : 'Get Profile Successfully',
            data : result
        })
    } catch (error) {
        console.log(error);
        res.json({
            result : true,
            msg : error.message,
        })
    }
    
}

module.exports = {
    register,
    login,
    getMe
}
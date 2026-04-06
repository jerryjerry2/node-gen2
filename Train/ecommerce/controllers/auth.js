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

const logout = async (req, res) => {
    try {
            await auth.logout(req.user.id);

        res.json({
            result : true,
            msg : 'Logout Successfully',
        })
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : error.message,
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        let result = await auth.verifyEmail(req.query.token);

        res.json({
            result : true,
            msg : result.message,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : error.message,
        })
    }
}

const resendVerificationEmail = async (req, res) => {
    try {
        let result = await auth.resendVerificationEmail(req.body);

        res.json({
            result : true,
            msg : result.message,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : error.message,
        })
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    verifyEmail,
    resendVerificationEmail
}
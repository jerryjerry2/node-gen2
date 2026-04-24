const auth = require('../services/auth');

const register = async (req, res) => {
    try {
        const result = await auth.register(req.validData);
        
        
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

const getMe = async (req, res) => {
    try {
        let row = await auth.getMe(req.user.id);

        return res.json({
            result : true,
            msg : 'Get Profile Successfully',
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

const logout = async (req, res) => {
    try {
        await auth.logout(req.user.id);

        return res.json({
            result : true,
            msg : 'Logout Successfully',
            data: []
        });
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        let result = await auth.verifyEmail(req.query.token);

        return res.json({
            result : true,
            msg : result.message,
            data: []
        });
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const resendVerificationEmail = async (req, res) => {
    try {
        let result = await auth.resendVerificationEmail(req.body.email);

        return res.json({
            result : true,
            msg : result.message,
            data: []
        });
        
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
    login,
    getMe,
    logout,
    verifyEmail,
    resendVerificationEmail
}
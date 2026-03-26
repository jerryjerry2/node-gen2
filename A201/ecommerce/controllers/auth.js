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
        res.json({
            result : true,
            data : error.message
        })
    }
}

module.exports = {
    register
}
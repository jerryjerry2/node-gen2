const authService = require('../services/auth');

const register = async (req, res) => {
    const result = await authService.register(req.body);
    
}

module.exports = {
    register
}
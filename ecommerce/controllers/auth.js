const authService = require('../services/auth');

const register = async (req, res) => {
   try {
        let result = authService.register(req.body);
      
        res.json({
            result : true,
            msg : 'Register Successfully',
            data : result
        })
        
   } catch (error) {
        res.json({
            result : false,
            msg : error.message,
        })
   }
    
}

module.exports = {
    register
}
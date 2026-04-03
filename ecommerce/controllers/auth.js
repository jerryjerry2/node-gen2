const authService = require('../services/auth');

const register = async (req, res) => {
   try {
        let result = await authService.register(req.body);
      
        return res.json({
            result : true,
            msg : 'Register Successfully',
            data : result
        })
        
   } catch (error) {
        console.log(error);
        
        return res.json({
            result : false,
            msg : error.message,
        })
   }
    
}

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        

         return res.json({
            result : true,
            msg : 'Register Successfully',
            data : result
        })
        
    } catch (error) {
        return res.json({
            result : false,
            msg : error.message
        })
    }
}

const getMe = async (req, res) => {
    try {
        const row = await authService.getMe(req.user.id);

        return res.json({
            result : true,
            msg : 'Get Profile Successfully',
            data : row
        })

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
    getMe
}
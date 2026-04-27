const express = require('express');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { registerUserSchema } = require('../validators/user');

const router = express.Router();

router.post('/register', validate(registerUserSchema),authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware.isLogin, authController.getMe);
router.delete('/logout', authMiddleware.isLogin, authController.logout);
router.get('/verify-email', authController.verifyEmail);
router.put('/resend-verificationEmail', authController.resendVerificationEmail);


module.exports = router;
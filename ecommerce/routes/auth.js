const express = require('express');
const authController = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', isLogin, authController.getMe);
router.delete('/logout', isLogin, authController.logout);
router.get('/verify-email', authController.verifyEmail);
router.post('/resend-verificationLink', authController.resendVerificationLink)

module.exports = router;
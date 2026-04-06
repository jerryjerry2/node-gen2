const express = require('express');
const { register, login, getMe, logout, verifyEmail, resendVerificationEmail } = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isLogin, getMe);
router.delete('/logout', isLogin, logout);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

module.exports = router;
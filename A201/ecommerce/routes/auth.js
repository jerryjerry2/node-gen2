const express = require('express');
const { register, login, getMe, logout, verifyEmail, resendVerificationEmail } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware.islogin, getMe);
router.delete('/logout', authMiddleware.islogin, logout);
router.get('/verify-email', verifyEmail);
router.put('/resend-verificationEmail', resendVerificationEmail);

module.exports = router;
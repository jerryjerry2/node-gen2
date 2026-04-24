const express = require('express');
const { register, login, getMe, logout, verifyEmail, resendVerificationEmail } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { registerUserSchema } = require('../validators/user');

const router = express.Router();

router.post('/register', validate(registerUserSchema), register);
router.post('/login', login);
router.get('/me', authMiddleware.islogin, getMe);
router.delete('/logout', authMiddleware.islogin, logout);
router.get('/verify-email', verifyEmail);
router.put('/resend-verificationEmail', resendVerificationEmail);

module.exports = router;
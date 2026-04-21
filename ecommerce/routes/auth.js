const express = require('express');
const authController = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { registerUserSchema, loginUserSchema, resendLinkEmailSchema } = require('../validators/user');

const router = express.Router();

router.post('/register', validate(registerUserSchema), authController.register);
router.post('/login', validate(loginUserSchema),authController.login);
router.get('/me', isLogin, authController.getMe);
router.delete('/logout', isLogin, authController.logout);
router.get('/verify-email', authController.verifyEmail);
router.post('/resend-verificationLink', validate(resendLinkEmailSchema), authController.resendVerificationLink)

module.exports = router;
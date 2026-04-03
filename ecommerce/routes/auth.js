const express = require('express');
const authController = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', isLogin, authController.getMe);
router.delete('/logout', isLogin, authController.logout);

module.exports = router;
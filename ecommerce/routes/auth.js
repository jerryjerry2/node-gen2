const express = require('express');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware.isLogin, authController.getMe);
router.delete('/logout', authMiddleware.isLogin, authController.logout);


module.exports = router;
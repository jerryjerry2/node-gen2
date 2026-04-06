const express = require('express');
const { register, login, getMe, logout } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware.islogin, getMe);
router.delete('/logout', authMiddleware.islogin, logout);

module.exports = router;
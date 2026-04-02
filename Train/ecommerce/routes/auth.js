const express = require('express');
const { register, login, getMe } = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isLogin, getMe);
router.delete('/logout,');

module.exports = router;
const express = require('express');
const router = express.Router();

const pool = require('../config/db');
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getAll);

router.post('/category', categoryController.create);

router.put('/category/:id', categoryController.update);

router.delete('/category/:id', categoryController.remove)


module.exports = router;
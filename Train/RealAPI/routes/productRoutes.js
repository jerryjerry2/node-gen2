const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/products', productController.getAll);

module.exports = router;
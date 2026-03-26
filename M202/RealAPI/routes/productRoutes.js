const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.getAll);
router.post('/product', productController.create);

module.exports = router;
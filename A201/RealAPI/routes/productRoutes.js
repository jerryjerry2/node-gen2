const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();


router.get('/products', productController.getAll);
router.post('/product', productController.create);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.remove);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getAll,
    create,
    update,
    remove
} = require('../controllers/categoryController');

router.get('/category', getAll);
router.post('/category', create);
router.put('/category/:id', update)
router.delete('/category/:id', remove)

module.exports = router;
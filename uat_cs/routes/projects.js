const express = require('express');
const upload = require('../utils/upload');
const { getAll, create, update, remove, updateLogo, removeLogo } = require('../controllers/projects');

const router = express.Router();

router.get('/project', getAll);
router.post('/project', create);
router.put('/project/:id', update);
router.delete('/project/:id', remove);

//POST Logo
router.put('/project/logo/:id', upload.single('logo'),updateLogo);
router.delete('/project/logo/:id', removeLogo);

module.exports = router;
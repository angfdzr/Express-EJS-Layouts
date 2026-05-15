const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const { body } = require('express-validator');
const redirectAdminFromClient = require('../middlewares/redirectAdminFromClient');

router.get('/', redirectAdminFromClient, IndexController.index);
router.get('/pages/about-us', redirectAdminFromClient, IndexController.about);

module.exports = router;
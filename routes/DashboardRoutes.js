const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const { body } = require('express-validator');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/dashboard', requireAdmin, DashboardController.index);
router.get('/users/tabel-pengguna', requireAdmin, DashboardController.indexUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { body } = require('express-validator');
const preventAuth = require('../middlewares/preventAuth');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/login', preventAuth, AuthController.indexLogin);
router.get('/register', preventAuth, AuthController.indexRegister);

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], AuthController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], AuthController.login);

router.post('/logout', requireAdmin, AuthController.logout);

module.exports = router;
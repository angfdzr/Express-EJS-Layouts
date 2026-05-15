const Auth = require('../models/Auth');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

class AuthController {
    async indexLogin(req, res) {
        return res.render('login', {
            title: 'Login Page',
            user: null,
            layout: false
        })
    }

    async indexRegister(req, res) {
        return res.render('register', {
            title: 'Register Page',
            user: null,
            layout: false
        })
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const { email, username, password } = req.body;
            const role = 'admin';
            const status = 'active';

            const existingUser = await Auth.getEmail(email);
            if (existingUser[0].length > 0) {
                return res.status(400).json({ success: false, message: 'Email already exists' });
            }

            const hashedPassword = await bcryptjs.hash(password, 10);

            await Auth.register({ email, username, password: hashedPassword, role, status });
            return res.status(201).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const userResult = await Auth.getEmail(email);
            if (userResult[0].length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            const user = userResult[0][0];
            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            req.session.user = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                status: user.status
            };

            return res.status(200).json({ success: true, message: 'Login successful' });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            return res.status(200).json({ success: true, message: 'Logout successful' });
        });
    }
}

module.exports = new AuthController();
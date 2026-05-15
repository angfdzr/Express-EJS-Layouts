const Sidebar = require('../models/Sidebar');

class IndexController {
    async index(req, res) {
        try {
            return res.render('layouts/client/index/index', {
                title: 'Home Page',
                activePage: req.path,
                user: req.session.user,
                sidebar: Sidebar.clientMenu()
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    async about(req, res) {
        try {
            return res.render('layouts/client/about/about', {
                title: 'About Us',
                activePage: req.path,
                user: req.session.user,
                sidebar: Sidebar.clientMenu()
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

module.exports = new IndexController();
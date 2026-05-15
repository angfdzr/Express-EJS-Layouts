const Sidebar = require('../models/Sidebar');

class DashboardController {
    async index(req, res) {
        try {
            return res.render('layouts/admin/dashboard/dashboard', {
                title: 'Dashboard',
                activePage: req.path,
                user: req.session.user,
                sidebar: Sidebar.adminMenu()
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    async indexUser(req, res) {
        try {
            return res.render('layouts/admin/users/tabel-pengguna', {
                title: 'Manage Users',
                activePage: req.path,
                user: req.session.user,
                sidebar: Sidebar.adminMenu()
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

module.exports = new DashboardController();
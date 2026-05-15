module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
        // Jika pengguna sudah login, redirect ke halaman dashboard atau home
        if (req.session.user.role === 'admin') {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/');
        }
    }
    next();
};
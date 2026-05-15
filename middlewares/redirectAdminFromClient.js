// middlewares/redirectAdminFromClient.js
module.exports = function (req, res, next) {
    try {
        const user = req.session && req.session.user;
        if (user && user.role === 'admin') {
            return res.redirect('/dashboard');
        }
        return next();
    } catch (err) {
        return next(err);
    }
};
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Set view engine ke EJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SECRET_KEY || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000, // 
        secure: false           // true jika pakai HTTPS
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layouts/client/main'); // layout default untuk client

// expose user ke views & pilih layout berdasarkan role
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;

    if (res.locals.user && res.locals.user.role === 'admin') {
        res.locals.layout = 'layouts/admin/main';
    } else {
        res.locals.layout = 'layouts/client/main';
    }

    next();
});

// register routes
const indexRoutes = require('./routes/IndexRoutes');
const authRoutes = require('./routes/AuthRoutes');
const dashboardRoutes = require('./routes/DashboardRoutes');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));
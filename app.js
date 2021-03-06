var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var sequelize = require('sequelize');
var cors = require('cors');
var session = require('express-session');
const request = require('request');

var app = express();

// const whitelist = [
//     'http://localhost:3000',
//     'https://eric-a.netlify.app',
//     'http://dev.bbbae.shop',
// ];
// const corsOptions = {
//     // origin: '*',
//     credentials: true,
// };

const whitelist = [
    'http://localhost:3000',
    'http://user.bbbae.shop',
    'http://www.bbbae.shop',
    'http://pages.bbbae.shop',
    'http://admin.bbbae.shop',
    'http://www.eric-a.shop',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(
    session({
        secret: 'csyrock',
        resave: true,
        saveUninitialized: true,
        // store: new fileStore(),
    })
);

var deliveryRouter = require('./routes/deliveryRoute');
var userRouter = require('./routes/userRoute');
var adminRouter = require('./routes/adminRoute');
var controlRouter = require('./routes/controlRoute');

dotenv.config();
const db = require('./models');
db.sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/delivery', deliveryRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/control', controlRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

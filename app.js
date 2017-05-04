const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// load mongoose package
const mongoose = require('mongoose');
const database = require('./config/db');
let session = require('express-session');
let User = require("./models/User");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let flash = require("connect-flash");
var index = require('./routes/index');


let app = express();
// Промонтировать файлы из public в наш сайт по адресу /public
app.use(express.static(path.join(__dirname, 'public')));
// Парсер Куки!
app.use(flash());
app.use(cookieParser());

app.use(session({
    secret: 'anystringyouwant',
    resave: false,
    saveUninitialized: false
}));

mongoose.Promise = global.Promise;
mongoose.connect(database.url)
  .then(() =>  console.log('connection to Mongo succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator() );
  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

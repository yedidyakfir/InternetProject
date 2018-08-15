var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cookieSession = require("cookie-session");
const passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Data/users');
var booksRouter = require('./routes/Data/books');
const spaRouter = require('./routes/spa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieSession({
    name: 'BookShop',
    keys: ["secret"],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//the passport initilzation
app.use(passport.initialize());
app.use(passport.session());
require('./passportAuth')(passport);
//
//the socket-io configoration
//require('./io-socket');
//

app.use('/users', usersRouter);
app.use('/books', booksRouter);


app.use('/public',express.static(path.join(__dirname, 'public')));
global.appRoot = __dirname;
app.use(express.static(path.join(__dirname,'BookStore','dist','BookStore')),spaRouter);

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("message:" + err.message);
  console.log("stack:" + err.stack);
  //res.render('error');
});

module.exports = app;

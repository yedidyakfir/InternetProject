var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cookieSession = require("cookie-session");
const UserDB = require('./model')('Users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

//////this is for login and identifaction
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDB.createStrategy());
passport.serializeUser(UserDB.serializeUser());
passport.deserializeUser(UserDB.deserializeUser());

passport.use(new GoogleStrategy({
        clientID: '360063253601-tqu1os8a3it3qlmnm98gn0tm8n917e55.apps.googleusercontent.com',
        clientSecret: 'Z5NQ14WJhAAg-vAHBd98Tluh',
        callbackURL: "http://localhost:3000/users/googleAuth/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            UserDB.findOne({'google.id': profile.id}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new UserDB();
                    newUser.email = profile.emails[0].value;
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                    console.log(profile);
                }
            });
        });
    }
));
//////

app.use('/users', usersRouter);
app.use('/books', booksRouter);

global.appRoot = __dirname;
app.use(express.static(path.join(__dirname,'BookStore','dist','BookStore')),spaRouter);
app.use('/images',express.static(path.join(__dirname, 'public')));

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

var express = require('express');
const passport = require('passport');
const User = require('../../model')('Users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//user attempt to register
router.post('/register', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.register(new User({active: true, email, admin:false}), password, function(err) {
      if (err) {
          console.log('error while user register!', err);
          return next(err);
      }
      res.json({ success: true });
  });
});

//user atempt to log in
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({ success: false}); }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({ success: true});
        });
    })(req, res, next);
});

//user check if he is logged in
router.get('/isLogIn', function (req, res) {
    if(req.isAuthenticated()) { res.json({success: true}); console.log("logged") }
    else {res.json({success: false})}
});

//user logout
router.get('/logout', function (req, res) {
   req.logout();
});

module.exports = router;

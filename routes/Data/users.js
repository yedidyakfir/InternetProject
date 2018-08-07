var express = require('express');
const passport = require('passport');
//const User = require('../../model/User/UserSchema')('User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

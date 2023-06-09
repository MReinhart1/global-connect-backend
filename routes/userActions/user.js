var express = require('express');
var router = express.Router();
const User = require("../../schemas/User")
const passport = require('passport')
const bcrypt = require("bcrypt")
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/authentication")

router.get('/open', function(req, res, next) {
  console.log(req.session)
  res.send("This is: open")
});

router.get('/closed', checkAuthenticated, function(req, res, next) {
  console.log(req.session)
  res.send("This is: closed")
});

router.get('/register', checkNotAuthenticated, function(req, res, next) {
  res.render('register');
});

router.post('/register', checkNotAuthenticated, async function(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  req.body.password = hashedPassword
  let newUser = new User(req.body)
  try {
    let result = await newUser.save()
    req.login(result, function(err) {
      if (err) { return next(err); }
      return res.redirect('/policies');
    });
  } catch (err){
    if (err.code === 11000){
      res.send("This username or email already exists")
    }
  }
});

router.get('/login', checkNotAuthenticated, function(req, res, next) {
  res.render('login');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/policies',
  failureRedirect: '/auth/login'
}))


router.get('/logout', function(req, res, next) {
  res.render('logout');
});

router.post('/logout', checkAuthenticated, function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.render('login');
  });
});

module.exports = router;

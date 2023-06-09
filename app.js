const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
const fs = require("fs")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
const path = require('path');

const {initializePassport} = require("./routes/middleware/authentication")

// Express App set up
var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));



// Mongoose
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Authentication
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// Routes
var indexRouter = require('./routes/s3Actions/index');
var usersRouter = require('./routes/userActions/user');
var policyRouter = require('./routes/policyActions/policies');
app.use('/file', indexRouter);
app.use('/auth', usersRouter);
app.use('/policies', policyRouter);


if (!fs.existsSync("./uploads")){
  fs.mkdirSync('./uploads');
  fs.chmod( './uploads', "0o777" )
}
app.get('/', function(req, res, next) {
  res.render("index", {title: "Insurance"})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

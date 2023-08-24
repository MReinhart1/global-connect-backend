const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
const fs = require("fs")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
var cors = require('cors');


// Express App set up
var app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}));



// Mongoose
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  autoIndex: true
});

// Routes
var usersRouter = require('./routes/userActions/user');
var policiesCreateRouter = require('./routes/policies/create');
var policiesReadRouter = require('./routes/policies/read');
var policiesUpdateRouter = require('./routes/policies/update');
var filesRouter = require('./routes/files/upload');

app.use('/auth', usersRouter);
app.use('/policies', policiesCreateRouter);
app.use('/policies', policiesReadRouter);
app.use('/policies', policiesUpdateRouter);
app.use('/files', filesRouter);

if (!fs.existsSync("./uploads")){
  fs.mkdirSync('./uploads');
  fs.chmod( './uploads', "0o777" )
}

app.get('/', function(req, res, next) {
  res.send("index")
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
  res.status(404).send('error');
});

module.exports = app;

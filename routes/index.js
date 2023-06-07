var express = require('express');
var router = express.Router();
const multer  = require('multer')
const csv = require('csvtojson')
const upload = multer({ dest: 'uploads/' })
const fs = require("fs")

const { uploadToS3, deleteFromS3} = require('../cloudResources/S3')

router.get('/', function(req, res, next) {
  res.render('index', {title: "Express"});
});

router.post('/uploadfile', upload.single('uploadfile'), async function(req, res, next) {
  req.session.companyName = "Progressive"
  // uploadToS3 (filename, file)
  await uploadToS3( `${req.session.companyName}-${Date.now()}`, req.file)
  res.send("done")
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  req.session.companyName = req.body.companyName
  req.session.companyEmail = req.body.companyEmail
  res.send(req.session);
});


router.get('/logout', function(req, res, next) {
  res.render('logout');
});

router.post('/logout', function(req, res, next) {
  req.session.companyName = ""
  res.send(req.session);
});

module.exports = router;

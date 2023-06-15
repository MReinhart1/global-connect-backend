var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const User = require('../../schemas/User')
const { listFromS3, getFromS3, uploadToS3, deleteFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/authentication")
const { createJSONFromString } = require('../../csvtoJSON/index')
const fs = require('fs')

router.get('/list', checkAuthenticated, async function(req, res, next) {
  // uploadToS3 (filename, file)
  let companyName = await User.findById(req.session.passport.user)
  let results = await listFromS3(companyName.organization)
  res.render('listfiles', {
     fileNames: results.Contents
  })
});

router.get('/upload', checkAuthenticated, function(req, res, next) {
  res.render('uploadfile');
});

router.post('/upload', checkAuthenticated, upload.single('uploadfile'), async function(req, res, next) {
  let companyName = await User.findById(req.session.passport.user)
  // uploadToS3 (filename, file)
  await uploadToS3( `${companyName.organization}/${companyName.organization}-${Date.now()}`, req.file)
  res.send("done")
});


router.get('/download/:orgname/:filename', checkAuthenticated, async function(req, res, next) {
  let results = await getFromS3(req.params.orgname+"/"+req.params.filename)
  res.send(results.Body);
});

router.get('/print/:orgname/:filename', checkAuthenticated, async function(req, res, next) {
  let results = await getFromS3(req.params.orgname+"/"+req.params.filename)
  let fileContents = results.Body.toString()
  let json = await createJSONFromString(fileContents)
  res.send(json)
});


module.exports = router;

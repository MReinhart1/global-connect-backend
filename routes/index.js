var express = require('express');
var router = express.Router();
const multer  = require('multer')
const csv = require('csvtojson')

const upload = multer({ dest: 'uploads/' })

router.get('/', function(req, res, next) {
  res.render('index', {title: "Express"});
});

router.post('/uploadfile', upload.single('uploadfile'), async function(req, res, next) {
    console.log(req.file.filename);
    console.log(req.session.companyName);
    console.log(Date.now());
    let results = await csv().fromFile(`./uploads/${req.file.filename}`)
    console.log(results)
    res.send(results)
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

var express = require('express');
var router = express.Router();
const User = require("../schemas/user")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/create', async function(req, res, next) {
  let newUser = new User({name: "Michael", age: 222})
  var result = await newUser.save()
  res.send(result);
});

/* GET users listing. */
router.post('/create', async function(req, res, next) {
  let newUser = new User({name: "Michael", age: req.body.age, age2: req.body.age2 })
  let error = newUser.validateSync();
  try{
    let result = await newUser.save()
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});


/* GET users listing. */
router.get('/download', async function(req, res, next) {
  console.log(res.download('./insurance-quote.csv'))
});


module.exports = router;

var express = require('express');
var router = express.Router();
const UserSchema = require("../../schemas/user")
const bcrypt = require("bcrypt")
const { createToken, checkAuthenticated } = require("../middleware/authentication")

router.get('/protected', checkAuthenticated, function(req, res) {
  res.send("This is protected info")
})

// Register an org



// Add the org to the request for a user that wants to register
router.post('/register', async function(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  req.body.password = hashedPassword
  let newUser = new UserSchema(req.body)
  console.log(newUser)
  try {
    await newUser.save()
    let token = await createToken({ email: req.body.email, company: req.body.company, date: Date().now})
    res.send({token})
  } catch (err){
    if (err.code === 11000){
      return res.status(200).send("This username or email already exists")
    }
    return res.send(err.message)
  }
})

router.post('/login', async function(req, res, next) {
  if(!req.body.email || !req.body.password) return res.send("No email or password")
  let result = await UserSchema.findOne({email: req.body.email})
  if(result === null) {
    console.log("No user here")
    return res.status(200).send("No user found")
  }
  if (await bcrypt.compare(req.body.password, result.password)){
    let token = await createToken({email: result.email, company: result.company, date: Date().now})
    res.send({token})
  } else {
    res.status(200).send("Incorrect Password")
  }
})

router.post('/user', checkAuthenticated, async function(req, res, next) {
  console.log(req.body)
  if(!req.body.email) return res.send("No username")
  let result = await UserSchema.findOne({email: req.body.email})
  if(result === null) {
    console.log("No user here")
    return res.status(200).send("No user found")
  }
  result.password = ""
  return res.status(200).send({result})
})

router.post('/token', checkAuthenticated, async function(req, res, next) {
  let result = await UserSchema.findOne({email: req.body.email})
  let token = await createToken({email: result.email, company: result.company, date: Date().now})
  return res.status(200).send({token})
})

module.exports = router;

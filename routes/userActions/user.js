var express = require('express');
var router = express.Router();
const UserSchema = require("../../schemas/user")
const bcrypt = require("bcrypt")
const { createToken, checkAuthenticated, checkAdmin} = require("../middleware/authentication")
const { logger }  = require("../../logger")

// Add the org to the request for a user that wants to register
// Deprecated in favor of org level user creation:

// router.post('/register', async function(req, res, next) {
//   logger.log("info", 'A user is being registered');
//   const hashedPassword = await bcrypt.hash(req.body.password, 10)
//   req.body.password = hashedPassword
//   let newUser = new UserSchema(req.body)
//   try {
//     let result = await newUser.save()
//     result = {
//       email: result.email,
//       country: result.country,
//       company: result.company,
//       occupation: result.occupation
//     }
//     console.log("result::")
//     console.log(result)
//     let token = await createToken({ ...result, date: Date().now})
//     res.send({token})
//   } catch (err){
//     if (err.code === 11000){
//       return res.status(200).send("This username or email already exists")
//     }
//     return res.send(err.message)
//   }
// })

// To login as a existing user
router.post('/login', async function(req, res, next) {
  try {
    logger.log("info", `A user is loggin in: ${req.body.email}`);
    if(!req.body.email || !req.body.password) return res.send("No email or password")
    let result = await UserSchema.findOne({email: req.body.email})
    if(result === null) {
      logger.log("info", 'User does not exist');
      return res.status(404).send("No user found")
    }
    if (await bcrypt.compare(req.body.password, result.password)){
      result = {
        email: result.email,
        country: result.country,
        company: result.company,
        occupation: result.occupation
      }
      let token = await createToken({ ...result, date: Date().now})
      res.cookie("token", token)
      return res.status(200).send("Logged In")
    } else {
      return res.status(401).send("Incorrect Password")
    }
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

router.get('/logout', async function(req, res, next) {
  try {
    logger.log("info", `A user is logged out`);
    res.clearCookie("token");
    return res.status(200).send("Logged out")
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

// To return user information for a user that is currently logged in by email
router.post('/user', checkAuthenticated, async function(req, res, next) {
  try {
    if(!req.body.email) return res.send("No username")
    let result = await UserSchema.findOne({email: req.body.email})
    if(result === null) {
      logger.log("warn", `User: ${req.body.email} does not exist`);
      return res.status(200).send("No user found")
    }
    result.password = ""
    return res.status(200).send({result})
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

// To generate a token that can be used with our API
router.post('/token', checkAuthenticated, checkAdmin, async function(req, res, next) {
  try {
    let result = await UserSchema.findOne({email: req.body.email})
    result = {
      email: result.email,
      country: result.country,
      company: result.company,
      occupation: result.occupation
    }
    let token = await createToken({ ...result, date: Date().now}, "30d")
    return res.status(200).send({token})
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})


module.exports = router;

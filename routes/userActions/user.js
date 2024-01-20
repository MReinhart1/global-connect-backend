var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const UserSchema = require("../../schemas/user")
const bcrypt = require("bcrypt")
const { createToken, checkAuthenticated, checkAdmin} = require("../middleware/authentication")
const { logger }  = require("../../logger")


async function validateManager(user, manager){
  let valid = false
  let result = await UserSchema.find({occupation: "Manager", company: user.company})
  result.forEach((element) => {
    if (element.firstName == manager.split(" ")[0] && element.lastName == manager.split(" ")[1]) {
      valid =  true
    }
  })
  return valid
}

router.post('/register', checkAuthenticated, checkAdmin, async function(req, res, next) {
  logger.log("info", 'A user is being registered');
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  req.body.password = hashedPassword
  let newUser = new UserSchema(req.body)
  try {
    let result = await newUser.save()
    result = {
      email: result.email,
      country: result.country,
      company: result.company,
      occupation: result.occupation,
      _id: result._id
    }
    let token = await createToken({ ...result, date: Date().now})
    res.send({token})
  } catch (err){
    if (err.code === 11000){
      return res.status(200).send("This username or email already exists")
    }
    return res.send(err.message)
  }
})

// To login as a existing user
router.post('/login', async function(req, res, next) {
  try {
    logger.log("info", `A user is logging in: ${req.body.email}`);
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
        occupation: result.occupation,
        _id: result._id
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


router.get('/currentuser', checkAuthenticated, async function(req, res, next) {
  try {
    let result = await UserSchema.findById(req.user._id)
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


router.post('/getuserbyid', checkAuthenticated, async function(req, res, next) {
  try {
    let result = await UserSchema.findById(req.body._id)
    if(result === null) {
      logger.log("warn", `User: ${req.body._id} does not exist`);
      return res.status(200).send("No user found")
    }
    if (result.company != req.user.company){
      return res.status(401).send(`This user does not work at ${req.user.company}`)
    }

    result.password = ""
    return res.status(200).send({result})
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

router.get('/allusers', checkAuthenticated, checkAdmin, async function(req, res, next) {
  try {
    let result = await UserSchema.find({company: req.user.company})
    if(result === null) {
      logger.log("warn", `User does not exist`);
      return res.status(200).send("No users found")
    }
    result.forEach((user) => user.password = "")
    return res.send(result)
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

router.get('/allmanagers', checkAuthenticated, async function(req, res, next) {
  try {
    let result = await UserSchema.find({occupation: "Manager", company: req.user.company})
    if(result === null) {
      logger.log("warn", `Managers do not exist`);
      return res.status(200).send("No Managers found")
    }
    result.forEach((user) => user.password = "")
    return res.send(result)
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

router.post('/updateuser', checkAuthenticated, async function(req, res, next) {
  try {
    if (req.body.user.salutation || req.body.user.firstName || req.body.user.lastName || req.body.user.email || req.body.user.mobile){
      let result = await UserSchema.findByIdAndUpdate(req.user._id, req.body.user)
      if(result === null) {
        logger.log("warn", `User does not exist`);
        return res.status(200).send("No users found")
      }
      return res.send({...result._doc, ...req.body.user})
    } else {
      return res.send("User is not authorized to update this field").status(401)
    }
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})

router.post('/updatemanager', checkAuthenticated, checkAdmin, async function(req, res, next) {
  try {
      let validManager = await validateManager(req.user, req.body.user.manager)
      if (!validManager) return res.send("Not a valid manager name").status(400)
      let result = await UserSchema.findByIdAndUpdate(req.body.user._id, {manager: req.body.user.manager})
      if(result === null) {
        logger.log("warn", `User does not exist`);
        return res.status(200).send("No users found")
      }
      return res.send({...result._doc, ...req.body.user})
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
      occupation: result.occupation,
      id: result._id
    }
    let token = await createToken({ ...result, date: Date().now}, "30d")
    return res.status(200).send({token})
  } catch (error) {
    logger.log("error", error)
    return res.send("Unexpected Error")
  }
})


module.exports = router;

var express = require('express');
var router = express.Router();
const UserSchema = require("../../schemas/user")
const CountrySchema = require("../../schemas/countries")
const InvitationSchema = require("../../schemas/userInvitations")
const OrganizationSchema = require("../../schemas/OrganizationSchema")
const bcrypt = require("bcrypt")
const { createToken, checkAuthenticated, checkAdmin } = require("../middleware/authentication")
const { logger } = require("../../logger")
const { sendMail } = require('../utilities/email')

// Create Organization
router.post('/createorganization', checkAdmin, async function(req, res, next) {
  try {
    let result = await OrganizationSchema.create({
      company_id: req.body.company_id,
      country_id: req.body.country_id,
      location_id: "",
      email: req.body.email
    })
    return res.send(result)

  } catch (error) {
    if (error.code === 11000){
      return res.send(`Organization has already been created`)
    } else {
      logger.log("error", error)
      return res.send(err.message)
    }
  }

})

// invite a user to the org
router.post('/invite', checkAdmin, async function(req, res, next) {
  logger.log("info", 'A user is being invited to join');
  logger.log('info', `${req.body}`)
  const listOfUsers = req.body.users
  const errorList = []
  for( let user = 0; user < listOfUsers.length; user++ ){
    let newInvite = {
      firstName: listOfUsers[user]?.firstName || "",
      lastName: listOfUsers[user]?.lastName || "",
      user_email: listOfUsers[user].email,
      manager_email: listOfUsers[user]?.manager || "",
      company_id: req.user.company_id,
      country_id:  req.user.country_id,
      occupation: listOfUsers[user].occupation,
    }
    let newInviteDB = new InvitationSchema(newInvite)
    try {
      let inviteId = await newInviteDB.save()
      inviteId = inviteId._id.toString()
      if (process.env.MAILENABLED == 'true'){
        sendMail({
            from: process.env.EMAIL,
            to: "michaelreinhart112@gmail.com" || req.user.email,
            subject: "Global Connect Invitation",
            html: `
            <h1>Hello</h1>
            <p> You have been signed up for Global Connect under ${req.user._id}</p>  
            <p><a href="http://localhost:3005/auth/org/getinvite/${inviteId}">Click here to set up your account</a></p>
            `
        })
      }
    } catch (error){
      if (error.code === 11000){
        errorList.push(`${newInvite.user_email} has already been invited`)
      } else {
        logger.log("error", error)
        return res.send(error.message)
      }
    }
  }
  if (errorList.length == 0){
    return res.send("Hello Invite")
  } else {
    return res.status(200).send(errorList)
  }
})

// To create a user based on an invitation
// Body contains { "password": "<Password>" }
router.post('/acceptinvite/:inviteId', async function(req, res, next) {
  try {
    if (!req.body.password)return res.status(401).send("A password is required")
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let invite = await InvitationSchema.findById(req.params.inviteId)
    if(invite === null) {
      logger.log("warn", `"No Invitation found for userId: ${req.params.inviteId}`);
      return res.status(200).send("No Invitation found")
    }
    let userBody = {
      salutation: invite?.salutation || req.body?.salutation || "",
      firstName: invite?.firstName || req.body?.firstName || "" ,
      lastName: invite?.lastName || req.body?.lastName || "" ,
      email: invite.user_email,
      mobile: invite?.mobile || req.body?.mobile || "" ,
      password: hashedPassword,
      country_id: invite.country_id,
      company_id: invite.company_id,
      manager: invite?.manager || req.body?.manager || "" ,
      occupation: invite.occupation,
    }
    let newUser = new UserSchema(userBody)
    let result = await newUser.save()
    result = {
      email: result.email,
      country: result.country_id,
      company: result.company_id,
      occupation: result.occupation
    }
    let token = await createToken({ ...result, date: Date().now})
    await InvitationSchema.findByIdAndUpdate({_id: req.params.inviteId}, {deleted: "true"})
    return res.send({token})
  } catch (error) {
    if (error.code === 11000){
      return res.send(`User has already been accepted`)
    } else {
      logger.log("error", error)
      return res.send(err.message)
    }
  }
})

// To get the current invitation for a user based on the _id of the invitation (can be shown on frontend when clicking email link)
router.get('/getinvite/:inviteId', async function(req, res, next) {
  try {
    let user = await InvitationSchema.findById(req.params.inviteId)
    logger.log("info", `User with Id: ${req.params.inviteId} is being searched for`)
    return res.send(user)
  } catch (error) {
    if (error.code === 11000){
      return res.send(`User has already been accepted`)
    } else {
      logger.log("error", error)
      return res.send(err.message)
    }
  }
})

router.get('/getcountries', async function(req, res, next) {
  try {
    let countries = await CountrySchema.find().select({ name: 1, _id: 0 })
    return res.send(countries)
  } catch (error) {
    logger.log("error", error)
    return res.send(error.message)
  }
})

module.exports = router;

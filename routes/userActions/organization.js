var express = require('express');
var router = express.Router();
const UserSchema = require("../../schemas/user")
const InvitationSchema = require("../../schemas/userInvitations")
const bcrypt = require("bcrypt")
const { createToken, checkAuthenticated, checkAdmin } = require("../middleware/authentication")
const { logger } = require("../../logger")
const { sendMail } = require('../utilities/email')

// invite a user to the org
router.post('/invite', checkAdmin, async function(req, res, next) {
  // logger.log("info", 'A user is being invited to join');
  // logger.log('info', `${req.body}`)
  const listOfUsers = req.body.users
  const errorList = []
  for( let user = 0; user < listOfUsers.length; user++ ){
    let newInvite = {
      user_email: listOfUsers[user].email,
      admin_email: req.user.email,
      company_id: req.user.company,
      country_id:  req.user.country,
      occupation: listOfUsers[user].occupation,
    }
    let newInviteDB = new InvitationSchema(newInvite)
    try {
      let inviteId = await newInviteDB.save()
      inviteId = inviteId._id.toString()
      console.log(inviteId)
      if (process.env.MAILENABLED == 'true'){
        sendMail({
            from: process.env.EMAIL,
            to: "michaelreinhart112@gmail.com" || req.user.email,
            subject: "Global Connect Invitation",
            html: `
            <h1>Hello</h1>
            <p> You have been signed up for Global Connect under ${req.user.company}</p>  
            <p><a href="http://localhost:3005/auth/org/acceptinvite/${inviteId}">Click here to set up your account</a></p>    
            `
        })
      }
    } catch (err){
      if (err.code === 11000){
        errorList.push(`${newInvite.user_email} has already been invited`)
      } else {
        logger.log("error", error)
        return res.send(err.message)
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let invite = await InvitationSchema.findById(req.params.inviteId)
    if(invite === null) {
      logger.log("warn", `"No Invitation found for userId: ${req.params.inviteId}`);
      return res.status(200).send("No Invitation found")
    }
    let userBody = {
      country: invite.country_id,
      password: hashedPassword,
      email: invite.user_email,
      company: invite.company_id,
      occupation: invite.occupation,
    }
  
    let newUser = new UserSchema(userBody)
    let result = await newUser.save()
    result = {
      email: result.email,
      country: result.country,
      company: result.company,
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
router.get('/acceptinvite/:inviteId', async function(req, res, next) {
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

module.exports = router;

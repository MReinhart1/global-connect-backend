var express = require('express');
var router = express.Router();
const UserSchema = require("../../schemas/user")
const InvitationSchema = require("../../schemas/userInvitations")
const bcrypt = require("bcrypt")
const { createToken, checkAuthenticated, checkAdmin } = require("../middleware/authentication")
const { logger } = require("../../logger")
const { sendMail } = require('../utilities/email')

// invite a user to the org
router.get('/hello', checkAuthenticated, async function(req, res, next) {
    return res.send("Hello")
})

module.exports = router;

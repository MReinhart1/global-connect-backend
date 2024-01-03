const User = require("../../schemas/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

function createToken(user, expiration="7d"){
    return jwt.sign(user, "secret", { expiresIn: expiration })
}

async function checkAuthenticated(req, res, next) {
  if(!req.cookies.token){
    return res.status(200).send("Must login first")
  }
  const token = req.cookies.token
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(200).send("User not Authenticated")
    req.user = user
    next()
  })
  }

async function checkAdmin(req, res, next) {
  if(!req.cookies.token){
    return res.status(200).send("Must login first")
  }
  const token = req.cookies.token
  let user = jwt.verify(token, "secret")
  if (user.occupation == "Administrator"){
    req.user = user
    next()
  } else {
    return res.status(200).send("User not Authorized, must be an Administrator")
  }
}
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


module.exports = { createToken, checkAuthenticated, checkAdmin, checkNotAuthenticated}

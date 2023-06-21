const User = require("../../schemas/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

function createToken(user){
    return jwt.sign(user, "secret")
}

async function checkAuthenticated(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(200).send("User not Authenticated")
    req.user = user
    next()
  })
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


module.exports = { createToken, checkAuthenticated, checkNotAuthenticated}

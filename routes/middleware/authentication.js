const LocalStrategy = require("passport-local").Strategy
const LocalStrategy = require("passport-jwt").Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require("../../schemas/User")
const bcrypt = require("bcrypt")

function initializePassport(passport){
    const authenticateUser = async (username, password, done) => {
        const result = await User.findOne({username: username})
        if (result == null){
            return done(null, false)
        }
        try {
            if (await bcrypt.compare(password, result.password)){
                return done(null, result)
            } else {
                return done(null, false)
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ username: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const result = await User.findById(id)
        return done(null, result)
    })
}



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/auth/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


module.exports = {initializePassport, checkAuthenticated, checkNotAuthenticated}

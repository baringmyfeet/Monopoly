const User = require('../models/user')

module.exports = {
  signup: (req, res, next) => {
    console.log('try to sign up')
    passport.authenticate('local-signup', {
      successRedirect: '/lobby',
      failureRedirect: '/signup'
    })
  },

  login: (req, res, next) => {
    console.log('log in')
    passport.authenticate('local-login', {
      successRedirect: '/lobby',
      failureRedirect: '/login'
    })
  }

}
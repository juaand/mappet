const passport = require('passport')

module.exports.facebookCallback = (req, res, next) => {
  const passportController = passport.authenticate(
    'facebook',
    (error, user) => {
      if (error) {
        next(error)
      } else {
        req.session.currentUser = user
        res.redirect('/')
      }
    }
  )
  passportController(req, res, next)
}

module.exports.googleCallback = (req, res, next) => {
  const passportController = passport.authenticate('google', (error, user) => {
    if (error) {
      next(error)
    } else {
      req.session.currentUser = user
      res.redirect('/')
    }
  })

  passportController(req, res, next)
}

const { Router } = require('express')
const router = new Router()
const routeGuard = require('../middlewares/session.middleware')
const passport = require('passport')
const socialController = require('../controllers/social.controller')

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
  routeGuard.isNotAuthenticated
)

router.get(
  '/auth/facebook/callback',
  routeGuard.isNotAuthenticated,
  socialController.facebookCallback
)

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  routeGuard.isNotAuthenticated
)

router.get(
  '/auth/google/callback',
  routeGuard.isNotAuthenticated,
  socialController.googleCallback
)

module.exports = router

// routes/auth.routes.js

const { Router } = require('express')
const router = new Router()
const uploads = require('../config/multer.config')
const routeGuard = require('../middlewares/session.middleware')
const authController = require('../controllers/auth.controller')

router.get('/login', routeGuard.isNotAuthenticated, authController.getLogin)
router.post('/login', routeGuard.isNotAuthenticated, authController.postLogin)

router.get(
  '/register',
  routeGuard.isNotAuthenticated,
  authController.getRegister
)

router.post(
  '/register',
  routeGuard.isNotAuthenticated,
  uploads.single('avatar'),
  authController.postRegister
)

router.get(
  '/activate/:token',
  routeGuard.isNotAuthenticated,
  authController.getToken
)

router.get('/logout', routeGuard.isAuthenticated, authController.doLogout)

router.get('/thankyou', routeGuard.isNotAuthenticated, authController.getThankyou)

module.exports = router

const express = require('express')
const router = express.Router()
const navController = require('../controllers/nav.controller')
const routeGuard = require('../middlewares/session.middleware')

router.get(
  '/restaurants',
  routeGuard.isNotAuthenticated,
  navController.getRestaurants
)
router.get(
  '/services',
  routeGuard.isNotAuthenticated,
  navController.getServices
)
router.get(
  '/activities',
  routeGuard.isNotAuthenticated,
  navController.getActivities
)
router.get('/events', routeGuard.isNotAuthenticated, navController.getEvents)

module.exports = router

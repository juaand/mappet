const express = require('express')
const router = express.Router()
const navController = require('../controllers/nav.controller')
const routeGuard = require('../middlewares/session.middleware')

router.get(
  '/activities',
  routeGuard.isNotAuthenticated,
  navController.getActivities
)

router.get(
  '/animal-shelter',
  routeGuard.isNotAuthenticated,
  navController.getAnimalShelter
)

router.get('/blog', routeGuard.isNotAuthenticated, navController.getBlog)

router.get('/beach', routeGuard.isNotAuthenticated, navController.getBeach)

router.get('/events', routeGuard.isNotAuthenticated, navController.getEvents)

router.get(
  '/grooming',
  routeGuard.isNotAuthenticated,
  navController.getGrooming
)

router.get('/hiking', routeGuard.isNotAuthenticated, navController.getHiking)

router.get('/hotel', routeGuard.isNotAuthenticated, navController.getHotel)

router.get('/park', routeGuard.isNotAuthenticated, navController.getPark)

router.get('/pipican', routeGuard.isNotAuthenticated, navController.getPipican)

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

router.get('/store', routeGuard.isNotAuthenticated, navController.getStore)

router.get('/tour', routeGuard.isNotAuthenticated, navController.getTour)

router.get(
  '/training',
  routeGuard.isNotAuthenticated,
  navController.getTraining
)

router.get(
  '/veterinary',
  routeGuard.isNotAuthenticated,
  navController.getVeterinary
)

router.get('/walk', routeGuard.isNotAuthenticated, navController.getWalk)

module.exports = router

const express = require('express')
const router = express.Router()
const navController = require('../controllers/nav.controller')

router.get('/restaurants', navController.getRestaurants)
router.get('/services', navController.getServices)
router.get('/activities', navController.getActivities)
router.get('/events', navController.getEvents)

module.exports = router

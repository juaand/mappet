const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map.controller')
const routeGuard = require('../middlewares/session.middleware')

router.get(
  '/map-show/map/cat/:category',
  routeGuard.isNotAuthenticated,
  mapController.getMap
)

module.exports = router

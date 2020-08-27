const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const routeGuard = require('../middlewares/session.middleware')

router.get('/', routeGuard.isNotAuthenticated, usersController.getHome)

module.exports = router

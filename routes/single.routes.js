const { Router } = require('express')
const router = new Router()
const uploads = require('../config/multer.config')
const routeGuard = require('../middlewares/session.middleware')
const singleController = require('../controllers/single.controllers')
const express = require("express");
const app = express();

router.get(
  '/:category/:id',
  routeGuard.isNotAuthenticated,
  singleController.getSpot
)

router.post(
  '/:category/:id/like',
  routeGuard.isAuthenticated,
  singleController.newLike
)

router.post(
  '/ong/:id/charge',
  routeGuard.isAuthenticated,
  singleController.charge
)

module.exports = router

// routes/crud.routes.js

const { Router } = require('express')
const router = new Router()
const uploads = require('../config/multer.config')
const routeGuard = require('../middlewares/session.middleware')
const crudController = require('../controllers/crud.controller')

const User = require('../models/user.model')
const mongoose = require('mongoose')



router.get(
  '/user-profile/:id',
  routeGuard.isAuthenticated,
  crudController.editUser
)

router.post(
  '/user-profile/:id/edit',
  routeGuard.isAuthenticated,
  uploads.single('avatar'),
  crudController.saveEditedUser
)

router.get(
  '/user-profile/:id/delete',
  routeGuard.isAuthenticated,
  crudController.deleteUser)

router.get(
  '/spot/:id/new',
  routeGuard.isAuthenticated,
  crudController.createSpot
)

router.post(
  '/spot/:id/new',
  routeGuard.isAuthenticated,
  uploads.array('pictures'),
  crudController.saveSpot
)

module.exports = router







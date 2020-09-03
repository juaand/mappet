// routes/crud.routes.js

const { Router } = require('express')
const router = new Router()
const uploads = require('../config/multer.config')
const routeGuard = require('../middlewares/session.middleware')
const crudController = require('../controllers/crud.controller')

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
  crudController.deleteUser
)

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

router.get(
  '/:category/:id/update',
  routeGuard.isAuthenticated,
  crudController.editSpot
)

router.post(
  '/:category/:id/update',
  routeGuard.isAuthenticated,
  uploads.array('pictures'),
  crudController.updateSpot
)

router.get(
  '/:category/:id/delete',
  routeGuard.isAuthenticated,
  crudController.deleteSpot
)

router.get('/pets/:id', routeGuard.isAuthenticated, crudController.addPet)

router.post(
  '/pets/:id',
  routeGuard.isAuthenticated,
  uploads.single('avatar'),
  crudController.createPet
)

router.get('/edit-pet/:id', routeGuard.isAuthenticated, crudController.editPet)

router.post(
  '/edit-pet/:id',
  routeGuard.isAuthenticated,
  uploads.single('avatar'),
  crudController.updatePet
)

router.get('/delete/:id', routeGuard.isAuthenticated, crudController.deletePet)

module.exports = router

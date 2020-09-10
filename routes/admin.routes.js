// routes/admin.routes.js

const { Router } = require('express')
const router = new Router()
const routeGuard = require('../middlewares/session.middleware')
const adminController = require('../controllers/admin.controller')
const commentController = require('../controllers/comment.controllers')

router.get('/admin', routeGuard.isAuthenticated, adminController.getAdmin)

router.get(
  '/admin/comment/:id/aprove',
  routeGuard.isAuthenticated,
  adminController.aproveComment
)

router.get(
  '/admin/comment/:id/delete',
  routeGuard.isAuthenticated,
  commentController.deleteComment
)

router.get(
  '/admin/data/comments',
  routeGuard.isAuthenticated,
  adminController.getCommentsData
)

router.get(
  '/admin/data/pets',
  routeGuard.isAuthenticated,
  adminController.getPetsData
)

router.get(
  '/admin/data/spots',
  routeGuard.isAuthenticated,
  adminController.getSpotsData
)

router.get(
  '/admin/data/users',
  routeGuard.isAuthenticated,
  adminController.getUsersData
)

router.get(
  '/admin/stats/comments',
  routeGuard.isAuthenticated,
  adminController.getAdminComments
)

router.get(
  '/admin/stats/pets',
  routeGuard.isAuthenticated,
  adminController.getAdminPets
)

router.get(
  '/admin/stats/spots',
  routeGuard.isAuthenticated,
  adminController.getAdminSpots
)

router.get(
  '/admin/stats/statistics',
  routeGuard.isAuthenticated,
  adminController.getAdminStatistics
)

router.get(
  '/admin/stats/users',
  routeGuard.isAuthenticated,
  adminController.getAdminUsers
)

module.exports = router

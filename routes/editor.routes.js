// routes/editor.routes.js

const { Router } = require('express')
const router = new Router()
const routeGuard = require('../middlewares/session.middleware')
const uploads = require('../config/multer.config')
const editorController = require('../controllers/editor.controller')


router.get('/editor', routeGuard.isAuthenticated, editorController.getBlog)

router.post(
  '/editor/blog/:id',
  routeGuard.isAuthenticated,
  uploads.single('picPath'),
  editorController.postBlog
)

router.get('/mappet/blog/:id', routeGuard.isNotAuthenticated, editorController.getSingle)
module.exports = router

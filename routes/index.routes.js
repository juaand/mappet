const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')

router.get('/', usersController.getHome)
router.get('/login', usersController.getLogin)
router.get('/register', usersController.getRegister)

module.exports = router

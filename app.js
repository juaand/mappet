require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const categories = require('./data/categories')

const session = require('./config/session.config')
// const passport = require('./config/passport.config')

require('./config/db.config')
require('./config/hbs.config')

const routeGuard = require('./middlewares/session.middleware')

// Routers
const indexRouter = require('./routes/index.routes')

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

app.use((req, res, next) => {
  res.locals.allCategories = categories
  next()
})

//Routes middlewares
app.use('/', indexRouter)

module.exports = app

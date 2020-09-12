require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const path = require('path')
const categories = require('./data/categories')
const session = require('./config/session.config')
const passport = require('./config/passport.config')

require('./config/db.config')
require('./config/hbs.config')

const routeGuard = require('./middlewares/session.middleware')

// Routers
const indexRouter = require('./routes/index.routes')
const navRouter = require('./routes/nav.routes')
const authRouter = require('./routes/auth.routes')
const socialRouter = require('./routes/social.routes')
const crudRouter = require('./routes/crud.routes')
const singleRouter = require('./routes/single.routes')
const commentRouter = require('./routes/comment.routes')
const mapRouter = require('./routes/map.routes')
const adminRouter = require('./routes/admin.routes')
const editorRouter = require('./routes/editor.routes')

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session)
app.use(passport)
app.use(routeGuard.isNotAuthenticated)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

app.use((req, res, next) => {
  res.locals.session = req.user
  res.locals.allCategories = categories
  next()
})

//Routes middlewares
app.use('/', indexRouter)
app.use('/', navRouter)
app.use('/', authRouter)
app.use('/', socialRouter)
app.use('/', crudRouter)
app.use('/', singleRouter)
app.use('/', commentRouter)
app.use('/', mapRouter)
app.use('/', adminRouter)
app.use('/', editorRouter)

module.exports = app

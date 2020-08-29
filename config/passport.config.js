const passport = require('passport')
const bcryptjs = require('bcryptjs')
const saltRounds = 10
const User = require('../models/user.model')
const { json } = require('express')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

//GOOGLE LOG IN

const google = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, next) => {
    User.findOne({ 'social.google': profile.id })
      .then((user) => {
        if (user) {
          next(null, user)
        } else {
          const newUser = new User({
            name: profile._json.name,
            username: profile._json.email.split('@')[0],
            email: profile._json.email,
            avatar: profile._json.picture,
            bio: "",
            password:
              profile.provider + Math.random().toString(36).substring(7),
            social: {
              google: profile._json.sub
            }
          })
          bcryptjs
          .genSalt(saltRounds)
          .then((salt) => bcryptjs.hash(password, salt))
          newUser
            .save()
            .then((user) => {
              next(null, user)
            })
            .catch((err) => next(err))
        }
      })
      .catch((err) => next(err))
  }
)

// FACEBOOK LOG IN
const facebook = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
  },
  (accessToken, refreshToken, profile, next) => {
    User.findOne({ 'social.facebook': profile.id })
      .then((user) => {
        console.log(JSON.stringify(profile))
        if (user) {
          next(null, user)
        } else {
          const newUser = new User({
            name: profile._json.name,
            username: profile._json.email.split('@')[0],
            email: profile._json.email,
            avatar: profile._json.picture.data.url,
            password:
              profile.provider + Math.random().toString(36).substring(7),
            social: {
              facebook: profile._json.id
            }
          })
          
          bcryptjs
          .genSalt(saltRounds)
          .then((salt) => bcryptjs.hash(password, salt))

          newUser
            .save()
            .then((user) => {
              next(null, user)
            })
            .catch((err) => next(err))
        }
      })
      .catch((err) => next(err))
  }
)

passport.serializeUser(function (user, next) {
  next(null, user)
})
passport.deserializeUser(function (user, next) {
  next(null, user)
})

passport.use(google)
passport.use(facebook)

module.exports = passport.initialize()

// controller/crud.controller.js

const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const saltRounds = 10

module.exports.editUser = (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .then((user) => {
      // res.json(user)
      const userId = req.session.currentUser._id
      if (userId === id) {
        res.render('users/user-profile', { user })
      } else {
        req.session.destroy()
        res.render('auth/login', {
          message: 'Something is wrong with your user, please login again.'
        })
      }
    })
    .catch((error) => next(error))
}

module.exports.saveEditedUser = (req, res, next) => {
  const { username, email, avatar, password, bio, name } = req.body
  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
  if (!regex.test(password)) {
    res.status(500).render('users/user-profile', {
      errorMessage:
        'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
    })
    return
  }
  const id = req.params.id
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      req.body.avatar = req.file ? req.file.filename : undefined
      const id = req.params.id
      console.log(req.body)
      if (req.body.avatar) {
         return User.findByIdAndUpdate(id, {
          // username: username
          name: req.body.name,
          avatar: `${process.env.CLOUDINARY_SECURE}/${req.body.avatar}`,
          password: hashedPassword,
          bio: req.body.bio
        })
        .then(() => {
          res.redirect(`/user-profile/${id}`)
        })
        .catch((error) => next(error))
      } else {
         return User.findByIdAndUpdate(id, {
          // username: username
          name: req.body.name,
          password: hashedPassword,
          bio: req.body.bio
        })
      }
    })
    .then(() => {
      res.redirect(`/user-profile/${id}`)
    })
    .catch((error) => next(error))
  // close .catch()
}


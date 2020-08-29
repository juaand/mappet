// controller/crud.controller.js

const User = require('../models/user.model')
const Spot = require('../models/spot.model')
const bcryptjs = require('bcryptjs')
const saltRounds = 10


////////////////////////////////////////////////////////////////////////
//////////////////////////// RENDER USER ///////////////////////////////
////////////////////////////////////////////////////////////////////////



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

////////////////////////////////////////////////////////////////////////
//////////////////////////// EDIT USER /////////////////////////////////
////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////
//////////////////////////// DELETE USER /////////////////////////////////
////////////////////////////////////////////////////////////////////////

module.exports.deleteUser = (req, res, next) => {
  const id = req.params.id
  User.findByIdAndDelete(id)
    .then(() => {
      if (req.session.currentUser.role === 'ADMIN') {
        res.redirect('/admin')
      } else {
        req.session.destroy()
        res.redirect('/')
      }
    })
    .catch((error) => next(error))
}

////////////////////////////////////////////////////////////////////////
//////////////////////////// USER SPOTS ////////////////////////////////
////////////////////////////////////////////////////////////////////////

module.exports.createSpot = (req, res, next) => {
  res.render('spots/new-spot')
}

module.exports.saveSpot = (req, res, next) => {
  // req.body.pictures = req.files ? req.files.map(file => file.secure_url) : ""
    const id = req.params.id
    const kk = `${process.env.CLOUDINARY_SECURE}/`
    return Spot.create({
      name: req.body.name,
      content: req.body.content,
      creatorId: id,
      // pictures: `${process.env.CLOUDINARY_SECURE}/${req.files ? req.files.map(file => file.filename) : ''}`,
      // pictures: `${process.env.CLOUDINARY_SECURE}/${req.body.pictures}`,
      pictures: req.files ? req.files.map(file => kk.concat(file.filename)) : '',
      url: req.body.url,
      category: req.body.categories,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipcode,
      open: req.body.open,
      close: req.body.close      
    })
      .then(() => {
        res.redirect(`/`)
      })
      .catch((error) => next(error))
}


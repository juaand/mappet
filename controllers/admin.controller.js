// controllers/admin.controllers.js

const User = require('../models/user.model')
const Spot = require('../models/spot.model')
const Pet = require('../models/pet.model')
const Comment = require('../models/comment.model')
const Likes = require('../models/like.model')

module.exports.getAdmin = (req, res, next) => {
  const user = req.session.currentUser

  if (user.role === 'ADMIN') {
    const users = User.find()
    const spots = Spot.find()
    const pets = Pet.find()
    const comments = Comment.find()
    const likes = Likes.find()

    Promise.all([users, spots, pets, comments, likes])
      .then((values) => {
        res.render('admin/', {
          profiles: values[0],
          spots: values[1],
          pets: values[2],
          comments: values[3],
          likes: values[4],
          title: 'Admin page',
          admin: true
        })
      })
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
}

module.exports.getAdminSpots = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Spot.find().then((spots) => {
      res.render('admin/spots', { spots, title: 'Admin page', admin: true })
    })
  }
}

module.exports.getAdminUsers = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    User.find().then((profiles) => {
      res.render('admin/users', { profiles, title: 'Admin page', admin: true })
    })
  }
}

module.exports.getAdminPets = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Pet.find().then((pets) => {
      res.render('admin/pets', { pets, title: 'Admin page', admin: true })
    })
  }
}

module.exports.getAdminComments = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Comment.find().then((comments) => {
      res.render('admin/comments', {
        comments,
        title: 'Admin page',
        admin: true
      })
    })
  }
}

module.exports.getAdminStatistics = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    res.render('admin/statistics', {
      title: 'Admin page',
      admin: true
    })
  }
}

module.exports.getSpotsData = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Spot.find()
      .then((spots) => {
        res.json(spots)
      })
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
}

module.exports.getUsersData = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    User.find()
      .then((profiles) => {
        res.json(profiles)
      })
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
}

module.exports.getPetsData = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Pet.find()
      .then((pets) => {
        res.json(pets)
      })
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
}

module.exports.getCommentsData = (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Comment.find()
      .then((comments) => {
        res.json(comments)
      })
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
}

const Spot = require('../models/spot.model')
const User = require('../models/user.model')
const Pet = require('../models/pet.model')
const Like = require('../models/like.model')

module.exports.getHome = (req, res, next) => {
  Spot.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .populate('creatorId')
    .then((values) => {
      // res.json(values)
      if (req.session.currentUser && req.session.currentUser.role === 'ADMIN') {
        res.render('index', {
          values,
          admin: true,
          title: 'Welcome to mappet'
        })
      } else if (
        req.session.currentUser &&
        req.session.currentUser.role === 'EDITOR'
      ) {
        res.render('editor/', {
          editor: true,
          title: 'Mappet editor'
        })
      } else {
        res.render('index', {
          values,
          title: 'Welcome to mappet'
        })
      }
    })
    .catch((error) => next(error))
}

module.exports.getUserSpots = (req, res, next) => {
  const id = req.params.id
  const user = User.findById(id)
  const pets = Pet.find({ creatorId: id })
  const spots = Spot.find({ creatorId: id })
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'User'
      }
    })
    .populate('likes')

  Promise.all([user, pets, spots])
    .then((values) => {
      if (req.session.currentUser) {
        if (req.session.currentUser.role === 'ADMIN') {
          res.render('users/show-profile', {
            profile: values[0],
            pets: values[1],
            spots: values[2],
            title: `@${values[0].username} spots`,
            admin: true
          })
        } else if (id == req.session.currentUser._id) {
          const owner = true
          res.render('users/show-profile', {
            profile: values[0],
            pets: values[1],
            spots: values[2],
            title: `@${values[0].username} spots`,
            owner: owner
          })
        } else {
          res.render('users/show-profile', {
            profile: values[0],
            pets: values[1],
            spots: values[2],
            title: `@${values[0].username} spots`
          })
        }
      } else {
        res.render('users/show-profile', {
          profile: values[0],
          pets: values[1],
          spots: values[2],
          title: `@${values[0].username} spots`
        })
      }
    })
    .catch((error) => next(error))
}

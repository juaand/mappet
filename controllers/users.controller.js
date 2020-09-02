const Spot = require('../models/spot.model')
const User = require('../models/user.model')
const Pet = require('../models/pet.model')

module.exports.getHome = (req, res, next) => {
  Spot.find()
    .sort({ createdAt: -1 })
    .populate('creatorId')
    .then((values) => {
      // res.json(values)
      res.render('index', {
        values,
        title: 'Welcome to mappet'
      })
    })
    .catch((error) => next(error))
}

module.exports.getUserSpots = (req, res, next) => {
  const id = req.params.id
  const user = User.findById(id)
  const pets = Pet.find({ creatorId: id })
  const spots = Spot.find({ creatorId: id })

  Promise.all([user, pets, spots])
    .then((values) => {
      // res.json(values)
      res.render('users/user-spots', {
        profile: values[0],
        pets: values[1],
        spots: values[2],
        title: `@${values[0].username} spots`
      })
    })
    .catch((error) => next(error))
}

const Spot = require('../models/spot.model')
const User = require('../models/user.model')

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

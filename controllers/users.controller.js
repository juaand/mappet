const Spot = require('../models/spot.model')
const User = require('../models/user.model')

module.exports.getHome = (req, res, next) => {
  Spot.find()
    .populate('creatorId')
    .then((values) => {
      // res.json(values)
      res.render('index', {
        values
      })
    })
    .catch((error) => next(error))
}

module.exports.getLogin = (req, res, next) => {}
module.exports.getRegister = (req, res, next) => {}

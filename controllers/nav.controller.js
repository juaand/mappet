const Spot = require('../models/spot.model')
const User = require('../models/user.model')

module.exports.getRestaurants = (req, res, next) => {
  Spot.find({ category: 'Restaurants' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/restaurants', { values })
    })
}

module.exports.getServices = (req, res, next) => {
  Spot.find({ category: 'Services' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/services', { values })
    })
}

module.exports.getActivities = (req, res, next) => {
  Spot.find({ category: 'Activities' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/activities', { values })
    })
}

module.exports.getEvents = (req, res, next) => {
  Spot.find({ category: 'Events' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/events', { values })
    })
}

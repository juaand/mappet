const Spot = require('../models/spot.model')
const User = require('../models/user.model')

module.exports.getRestaurants = (req, res, next) => {
  Spot.find({ category: 'Restaurants' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'restaurants' })
    })
}

module.exports.getServices = (req, res, next) => {
  Spot.find({ category: 'Services' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'services' })
    })
}

module.exports.getActivities = (req, res, next) => {
  Spot.find({ category: 'Activities' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'activities' })
    })
}

module.exports.getEvents = (req, res, next) => {
  Spot.find({ category: 'Events' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'events' })
    })
}

module.exports.getAnimalShelter = (req, res, next) => {
  Spot.find({ category: 'Animal Shelter' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'animal-shelter' })
    })
}

module.exports.getBeach = (req, res, next) => {
  Spot.find({ category: 'Beach' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'beach' })
    })
}

module.exports.getGrooming = (req, res, next) => {
  Spot.find({ category: 'Grooming' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'grooming' })
    })
}

module.exports.getHiking = (req, res, next) => {
  Spot.find({ category: 'Hiking' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'hiking' })
    })
}

module.exports.getHotel = (req, res, next) => {
  Spot.find({ category: 'Hotel' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'hotel' })
    })
}

module.exports.getPark = (req, res, next) => {
  Spot.find({ category: 'Park' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'park' })
    })
}

module.exports.getPipican = (req, res, next) => {
  Spot.find({ category: 'Pipican' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'pipican' })
    })
}

module.exports.getRestaurants = (req, res, next) => {
  Spot.find({ category: 'Restaurants' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'restaurants' })
    })
}

module.exports.getStore = (req, res, next) => {
  Spot.find({ category: 'Store' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'store' })
    })
}

module.exports.getTour = (req, res, next) => {
  Spot.find({ category: 'Store' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'store' })
    })
}

module.exports.getBeach = (req, res, next) => {
  Spot.find({ category: 'Tour' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'tour' })
    })
}

module.exports.getTraining = (req, res, next) => {
  Spot.find({ category: 'Training' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'training' })
    })
}

module.exports.getVeterinary = (req, res, next) => {
  Spot.find({ category: 'Veterinary' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'veterinary' })
    })
}

module.exports.getActivities = (req, res, next) => {
  Spot.find({ category: 'Activities' })
    .populate('creatorId')
    .then((values) => {
      res.render('spots/generate', { values, category: 'activities' })
    })
}
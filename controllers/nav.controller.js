module.exports.getRestaurants = (req, res, next) => {
  res.render('spots/restaurants')
}

module.exports.getServices = (req, res, next) => {
  res.render('spots/services')
}

module.exports.getActivities = (req, res, next) => {
  res.render('spots/activities')
}

module.exports.getEvents = (req, res, next) => {
  res.render('spots/events')
}

// controllers/map.controllers.js

const Spot = require('../models/spot.model')

module.exports.getMap = (req, res, next) => {
  const name = req.params.category
  const cat = name.charAt(0).toUpperCase() + name.slice(1)

  Spot.find({ category: cat })
    .then((spots) => {
      res.render('map/show-map', { title: `Mappet map`, cat, spots: JSON.stringify(spots) })
    })
    .catch((error) => next(error))
}

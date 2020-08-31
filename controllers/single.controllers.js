const Spot = require('../models/spot.model')
require('../models/comment.model')
require('../models/user.model')

module.exports.getSpot = (req, res, next) => {
  const id = req.params.id

  Spot.findById(id)
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'User'
      }
    })
    .populate({
      path: 'creatorId',
      populate: {
        path: 'pets'
      }
    })
    .then((spot) => {
      // res.json(spot.comments)
      // res.json(spot.creatorId.pets)
      res.render('spots/single', { spot, title: spot.name })
    })
    .catch((error) => next(error))
}

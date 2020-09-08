const Spot = require('../models/spot.model')
const Comments = require('../models/comment.model')
const User = require('../models/user.model')
const Like = require('../models/like.model')

module.exports.getSpot = (req, res, next) => {
  const id = req.params.id
  const user = req.session.currentUser

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
    .populate('likes')
    .then((spot) => {
      // res.json(spot.comments)
      // res.json(spot.creatorId.pets)

      if (user) {
        if (req.session.currentUser.role === 'ADMIN') {
          res.render('spots/single', {
            user,
            spot,
            title: spot.name,
            admin: true
          })
        } else if (user._id == spot.creatorId._id) {
          const owner = true
          res.render('spots/single', {
            user,
            spot,
            title: spot.name,
            owner: owner
          })
        } else {
          res.render('spots/single', {
            user,
            spot,
            title: spot.name
          })
        }
      } else {
        res.render('spots/single', {
          spot,
          title: spot.name
        })
      }
    })
    .catch((error) => next(error))
}

module.exports.newLike = (req, res, next) => {
  const params = { spot: req.params.id, user: req.session.currentUser._id }
  console.log(params)
  Like.findOne(params)
    .then((like) => {
      if (like) {
        Like.findByIdAndRemove(like._id)
          .then(() => {
            res.json({ like: -1 })
          })
          .catch(next)
      } else {
        const newLike = new Like(params)
        newLike
          .save()
          .then(() => {
            res.json({ like: 1 })
          })
          .catch(next)
      }
    })
    .catch(next)
}

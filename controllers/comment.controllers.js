// controllers/comment.controllers.js

const User = require('../models/user.model')
const Comment = require('../models/comment.model')
const Spot = require('../models/spot.model')
const Pet = require('../models/pet.model')

module.exports.saveComment = (req, res, next) => {
  const user = req.session.currentUser
  const id = req.params.id

  if (req.body.content) {
    Comment.create({
      content: req.body.content,
      authorId: user._id,
      spotId: id
    })
  }

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
      if (user) {
        if (user._id == spot.creatorId._id) {
          const owner = true
          res.render('spots/single', {
            user,
            spot,
            title: spot.name,
            owner: owner
          })
        } else {
          res.render('spots/single', { user, spot, title: spot.name })
        }
      } else {
        res.render('spots/single', { spot, title: spot.name })
      }
    })
    .catch((error) => next(error))
}

module.exports.deleteComment = (req, res, next) => {
  const id = req.params.id
  const user = req.session.currentUser
  Comment.findByIdAndDelete(id)
    .then(() => {
      if (user.role === 'ADMIN') {
        res.redirect('/admin/stats/comments')
      }
    })
    .catch((error) => next(error))
}

// controllers/comment.controllers.js

const User = require('../models/user.model')
const Comment = require('../models/comment.model')
const Spot = require('../models/spot.model')
const Pet = require('../models/pet.model')

module.exports.saveComment = (req, res, next) => {
  const user = req.session.currentUser
  const id = req.params.id

  Comment.create({
    content: req.body.content,
    authorId: user._id,
    SpotId: id
  })

  console.log(`ESTE ES EL ID DEL SPOT ${id}`)

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
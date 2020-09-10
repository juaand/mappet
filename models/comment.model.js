// models/comment.model.js
const { Schema, model, ObjectId } = require('mongoose')

const commentSchema = new Schema(
  {
    content: {
      type: String
    },
    authorId: {
      type: ObjectId,
      ref: 'User'
    },
    spotId: {
      type: ObjectId,
      ref: 'Spot'
    },
    verify: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Comment', commentSchema)

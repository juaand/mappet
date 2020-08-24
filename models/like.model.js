// models/like.model.js
const { Schema, model, ObjectId } = require('mongoose')

const likeSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    spot: {
      type: ObjectId,
      ref: 'Spot',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('Like', likeSchema)

// models/blog.model.js
const { Schema, model, ObjectId } = require('mongoose')

const blogSchema = new Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    authorId: {
      type: ObjectId,
      ref: 'User'
    },
    picPath: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Blog', blogSchema)

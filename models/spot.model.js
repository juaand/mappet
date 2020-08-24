// models/spot.model.js
const { Schema, model, ObjectId } = require('mongoose')

const spotSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    creatorId: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    picPath: {
      type: String
    },
    url: {
      type: String
    },
    category: {
      enum: ['Restaurant', 'Service', 'Activity', 'Event']
    },
    subcategory: {
      type: String
    },
    coordenate: {
      type: [Number]
    },
    rate: {
      type: Number
    },
    contact: {
      phone: {
        type: String
      },
      url: {
        type: String
      }
    },
    schedule: {
      days: {
        enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      open: {
        type: String
      },
      snap: {
        type: String
      },
      close: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
)

projectSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'projectId',
  justOne: false
})

projectSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'project',
  justOne: false
})

module.exports = model('Project', spotSchema)

// models/spot.model.js
const { Schema, model, ObjectId } = require('mongoose')
const categories = require('../data/categories')

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

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
    pictures: {
      type: [String],
      default: []
    },
    url: {
      type: String
    },
    category: {
      type: [String],
      enum: categories.map((c) => c.name),
      default: []
    },
    subCategory: {
      type: [String],
      enum: categories.map((c) => c.id),
      default: []
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    rate: {
      type: [Number],
      default: []
    },
    phone: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    zipCode: {
      type: String
    },
    days: {
      type: [String],
      enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      default: []
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    open: {
      type: String
    },
    close: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

spotSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'spotId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { createdAt: -1 } } // Query options, see http://bit.ly/mongoose-query-options
})

spotSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'spot',
  justOne: false,
  options: { sort: { createdAt: -1 } }
})

module.exports = model('Spot', spotSchema)

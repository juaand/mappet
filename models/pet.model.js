// models/pet.model.js
const { Schema, model, ObjectId } = require('mongoose')

const petSchema = new Schema(
  {
    creatorId: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    animal: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    breed: {
      type: String
    },
    picPath: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Pet', petSchema)

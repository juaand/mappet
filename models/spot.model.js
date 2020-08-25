// models/spot.model.js
const { Schema, model, ObjectId } = require("mongoose");

const spotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    creatorId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    pictures: {
      type: [String],
      default: [],
    },
    url: {
      type: String,
    },
    category: {
      enum: ["Restaurant", "Service", "Activity", "Event"],
    },
    subcategory: {
      type: String,
    },
    coordenate: {
      type: [Number],
    },
    rate: {
      type: Number,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    days: {
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    open: {
      type: String,
    },
    snap: {
      type: String,
    },
    close: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

spotSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "spotId",
  justOne: false,
});

spotSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "spot",
  justOne: false,
});

module.exports = model("Spot", spotSchema);

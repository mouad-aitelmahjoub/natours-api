const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: [1, "Rating can not be lower than 1.0"],
      max: [5, "Rating can not be higher than 5.0"],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a Tour!"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a User!"],
    },
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
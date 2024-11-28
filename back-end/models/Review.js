const mongoose = require('mongoose');
const reviewScheme = mongoose.Schema(
  {
    bookTitle: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: false },
    date: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const review = mongoose.model("review", reviewScheme);

module.exports = review;
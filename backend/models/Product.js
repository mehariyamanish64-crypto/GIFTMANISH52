const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String
});

const productSchema = new mongoose.Schema({

  name: String,

  price: Number,

  discount: Number,

  images: [String],   // multiple images

  colors: [String],   // color options

  description: String,

  category: String,

  reviews: [reviewSchema],

  rating: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Product", productSchema);
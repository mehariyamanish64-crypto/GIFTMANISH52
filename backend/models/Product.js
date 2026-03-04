const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String, // add this field
});

module.exports = mongoose.model("Product", productSchema);
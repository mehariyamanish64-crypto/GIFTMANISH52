const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ productId: String, quantity: Number }],
  amount: Number,
  paymentId: String,
  status: { type: String, default: "pending" },
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
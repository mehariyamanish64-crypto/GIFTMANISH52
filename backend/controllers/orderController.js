const Razorpay = require("razorpay");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
const placeOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      userId: req.user._id,
      amount,
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: order._id
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// Get Orders
const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

module.exports = { placeOrder, getOrders };
const Razorpay = require("razorpay");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place Order (creates Razorpay order + saves order in MongoDB)
const placeOrder = async (req, res) => {
  const { cartItems, amount } = req.body;

  try {
    // Create Razorpay order
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "order_rcpt_" + new Date().getTime(),
    };
    const razorpayOrder = await razorpay.orders.create(options);

    // Save order in MongoDB
    const order = await Order.create({
      userId: req.user._id,
      products: cartItems,
      amount,
      paymentId: null, // will update after payment success
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    res.json({
      orderId: order._id,
      razorpayOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order placement failed" });
  }
};

// Get all orders (admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Fetching orders failed" });
  }
};

module.exports = { placeOrder, getOrders };
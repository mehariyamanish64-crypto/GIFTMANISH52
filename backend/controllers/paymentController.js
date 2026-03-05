const Razorpay = require("razorpay");
const Order = require("../models/Order");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ Create Order
exports.createOrder = async (req, res) => {
  const { amount } = req.body; // total in INR

  try {
    // Razorpay order options
    const options = {
      amount: amount * 100, // paise me convert
      currency: "INR",
      receipt: "order_rcpt_" + new Date().getTime(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save order in MongoDB
    const order = await Order.create({
      userId: req.user._id,
      products: [], // populate from cart if needed
      amount,
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    res.json({
      orderId: order._id,
      razorpayOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// 2️⃣ Handle Payment Success (optional)
exports.paymentSuccess = async (req, res) => {
  const { razorpayPaymentId, orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentId = razorpayPaymentId;
    order.status = "paid";

    await order.save();
    res.json({ message: "Payment Successful ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment update failed" });
  }
};
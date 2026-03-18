const Razorpay = require("razorpay");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// CREATE ORDER
exports.placeOrder = async (req, res) => {
  try {

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      userId: req.user._id,
      amount: amount,
      status: "pending",
      razorpayOrderId: razorpayOrder.id
    });

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: order._id
    });

  } catch (error) {

    console.log("ORDER ERROR:", error);

    res.status(500).json({
      message: "Order creation failed"
    });

  }
};



// PAYMENT SUCCESS
exports.paymentSuccess = async (req, res) => {

  try {

    const { orderId, razorpayPaymentId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentId = razorpayPaymentId;
    order.status = "paid";

    await order.save();

    res.json({ message: "Payment saved successfully" });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Payment update failed" });

  }

};



// GET USER ORDERS
exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find({ userId: req.user._id });

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Failed to fetch orders" });

  }

};
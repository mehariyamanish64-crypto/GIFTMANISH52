const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Create Razorpay order
router.post("/create-order", protect, placeOrder);

// Get all orders
router.get("/", protect, getOrders);

module.exports = router;
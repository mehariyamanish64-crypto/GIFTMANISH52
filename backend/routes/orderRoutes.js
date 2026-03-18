const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");


// CREATE RAZORPAY ORDER
router.post("/create-order", protect, orderController.placeOrder);


// SAVE PAYMENT SUCCESS
router.post("/payment-success", protect, orderController.paymentSuccess);


// GET USER ORDERS
router.get("/", protect, orderController.getOrders);


module.exports = router;
const router = require("express").Router();
const { placeOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, placeOrder);

module.exports = router;
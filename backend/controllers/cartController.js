const Cart = require("../models/Cart");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();

    res.json({
      success: true,
      message: "Item added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
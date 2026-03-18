const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");


// ADD TO CART
router.post("/add", async (req, res) => {

  try {

    const { name, price, image, quantity } = req.body;

    const item = new Cart({
      name,
      price,
      image,
      quantity
    });

    await item.save();

    res.json({
      success: true,
      message: "Item added to cart",
      data: item
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// GET CART ITEMS
router.get("/", async (req, res) => {

  try {

    const items = await Cart.find();

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// REMOVE SINGLE ITEM
router.delete("/remove/:id", async (req, res) => {

  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// REMOVE ALL ITEMS
router.delete("/remove-all", async (req, res) => {

  try {

    await Cart.deleteMany({});

    res.json({
      success: true,
      message: "All items removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;
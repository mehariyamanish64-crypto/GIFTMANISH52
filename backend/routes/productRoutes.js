const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {

    const products = await Product.find();
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ CATEGORY ROUTE FIRST
router.get("/category/:categoryName", async (req, res) => {
  try {

    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ SINGLE PRODUCT ROUTE LAST
router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
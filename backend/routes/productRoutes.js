const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getSingleProduct,
  getProductsByCategory
} = require("../controllers/productController");


// ADD PRODUCT
router.post("/add", addProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// CATEGORY ROUTE
router.get("/category/:categoryName", getProductsByCategory);

// SINGLE PRODUCT
router.get("/:id", getSingleProduct);

module.exports = router;
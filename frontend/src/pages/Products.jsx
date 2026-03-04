// src/pages/Products.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const categories = [
  "Personalized Gifts",
  "Home Decor & Accents",
  "Handmade & Artisanal",
  "Corporate & Office",
  "Seasonal & Festive",
  "Gourmet & Edibles",
  "Toys & Games",
  "Fashion & Accessories",
  "Wellness & Self-Care",
  "Stationery & Paper Goods",
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `/products/category/${encodeURIComponent(selectedCategory)}`
          : "/products";
        const res = await axiosInstance.get(url);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Add to Cart handler
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart ✅`);
  };

  return (
    <div className="products-container">
      <h1>Products</h1>

      <div className="category-menu">
        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={() => setSelectedCategory("")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Cart Preview */}
      <div className="cart-preview">
        <h2>Cart ({cart.length})</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
    </div>
  );
}
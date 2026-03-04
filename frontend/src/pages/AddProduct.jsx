import { useState } from "react";
import axios from "../api/axiosInstance";
import "../styles/addProduct.css";

// Predefined Categories
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

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    discount: "",
    image: "",
    description: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products/add", formData);
      alert("Product Added ✅");
      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        discount: "",
        image: "",
        description: "",
      });
    } catch (err) {
      alert("Failed to add product ❌");
      console.log(err);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>Add Product</h2>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          {/* Category Dropdown */}
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
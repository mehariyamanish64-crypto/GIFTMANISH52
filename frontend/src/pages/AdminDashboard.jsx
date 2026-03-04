// AdminDashboard.jsx
import { useState } from "react";
import AddProduct from "./AddProduct";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Toggle Button */}
      <button
        className="toggle-add-product-btn"
        onClick={() => setShowAddProduct(!showAddProduct)}
      >
        {showAddProduct ? "Hide Add Product" : "Add Product"}
      </button>

      {/* Conditional Rendering */}
      {showAddProduct && <AddProduct />}
    </div>
  );
}
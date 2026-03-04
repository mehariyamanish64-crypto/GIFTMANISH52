import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🎁 GiftShop</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>  {/* Products Page */}
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>    {/* ✅ Profile Page */}
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
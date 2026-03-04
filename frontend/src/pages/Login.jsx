import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/Login.css"; // ✅ Import Login CSS

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      alert(res.data.message);
      navigate("/products"); // ✅ Redirect to products page
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="input-group">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label>Password</label>
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
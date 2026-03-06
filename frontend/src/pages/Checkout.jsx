import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cart.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  // Back button function
  const handleBack = () => {
    navigate(-1); // previous page
  };

  const handlePayment = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {

      const res = await axiosInstance.post(
        "/orders/create-order",
        { amount: totalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "GiftShop",
        description: "Gift Purchase",
        order_id: order.id,

        handler: function (response) {

          alert("Payment Successful ✅");
          console.log(response);

          localStorage.removeItem("cart");

          navigate("/profile");
        },

        theme: {
          color: "#ff9900",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>

      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#555",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h1>Checkout</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px"
          }}
        >

          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px"
            }}
          />

          <div>
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <p>Qty: {item.quantity || 1}</p>
            <p>Total: ₹{item.price * (item.quantity || 1)}</p>
          </div>

        </div>
      ))}

      <h2>Total Amount: ₹{totalAmount}</h2>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 20px",
          background: "#ff9900",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px"
        }}
      >
        Pay Now
      </button>

    </div>
  );
}
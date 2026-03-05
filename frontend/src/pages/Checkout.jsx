import React from "react";
import axiosInstance from "../api/axiosInstance";

export default function Checkout() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
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
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "GiftShop",
        description: "Gift Purchase",
        order_id: order.id,

        handler: function (response) {
          alert("Payment Successful ✅");
          console.log(response);
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
    <div style={{ padding: "40px" }}>

      <h1>Checkout</h1>

      {cart.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{totalAmount}</h2>

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
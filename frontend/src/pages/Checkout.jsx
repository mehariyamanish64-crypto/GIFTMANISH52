import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setCart(storedCart);
    setUser(storedUser);
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      // 1️⃣ Create order in backend
      const { data } = await axios.post(
        "/api/orders",
        {
          cartItems: cart,
          amount: totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "GiftShop",
        description: "Purchase from GiftShop",
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          alert("Payment Successful! ✅");

          await axios.put(
            `/api/orders/${data.orderId}`,
            {
              paymentId: response.razorpay_payment_id,
              status: "completed",
            },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          localStorage.removeItem("cart"); // clear cart
          window.location.href = "/";
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobile || "",
        },
        theme: { color: "#ff9900" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Total: ₹{totalAmount}</h2>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 25px",
          backgroundColor: "#ff9900",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
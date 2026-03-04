import React from "react";
import axios from "axios";

export default function Payment({ amount }) {
  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const { data: order } = await axios.post("/api/payment/create-order", { amount });

      // 2. Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "GiftShop",
        description: "Order Payment",
        order_id: order.id,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          // TODO: Save order to backend
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#ff9900",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{ padding: "10px 20px", backgroundColor: "#ff9900", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer" }}
    >
      Pay ₹{amount}
    </button>
  );
}
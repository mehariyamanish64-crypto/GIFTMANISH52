// src/pages/Cart.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Back Button
  const handleBack = () => {
    navigate(-1);
  };

  // Remove single item
  const handleRemove = (index) => {

    const updatedCart = [...cartItems];
    const removedItem = updatedCart.splice(index, 1)[0];

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${removedItem.name} removed from cart ❌`);
  };

  // Buy single item
  const handleBuyNow = (item) => {

    localStorage.setItem("cart", JSON.stringify([item]));

    navigate("/checkout");
  };

  // Remove all items
  const handleRemoveAll = () => {

    if (window.confirm("Are you sure you want to remove all items?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  // Buy all items
  const handleBuyAll = () => {

    if (cartItems.length === 0) {
      alert("Cart is empty 😢");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        fontFamily: "Poppins"
      }}
    >

      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#444",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty 😢</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                padding: "10px 15px",
                background: "#2c2c3e",
                borderRadius: "10px",
                color: "#fff"
              }}
            >

              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

              {/* Product Info */}
              <div style={{ flex: 1, marginLeft: "15px" }}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>

                <button
                  onClick={() => handleBuyNow(item)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ffd700",
                    color: "#222",
                    cursor: "pointer"
                  }}
                >
                  Buy Now
                </button>

                <button
                  onClick={() => handleRemove(index)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          {/* Bottom Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "30px"
            }}
          >

            <button
              onClick={handleBuyAll}
              style={{
                padding: "12px 25px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Buy All
            </button>

            <button
              onClick={handleRemoveAll}
              style={{
                padding: "12px 25px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Remove All
            </button>

          </div>
        </>
      )}

    </div>
  );
}
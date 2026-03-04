// src/pages/Cart.jsx
import { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

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
    alert(`Proceeding to buy ${item.name} for ₹${item.price} 🛒`);
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
    if (cartItems.length === 0) return alert("Cart is empty 😢");
    let total = cartItems.reduce((acc, item) => acc + item.price, 0);
    alert(`Proceeding to buy all items for ₹${total} 🛒`);
    // Optionally, clear cart after buying
    // setCartItems([]);
    // localStorage.removeItem("cart");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Your Cart</h2>

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
                color: "#fff",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", borderRadius: "5px" }}
                />
              </div>

              {/* Buttons for single item */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleBuyNow(item)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ffd700",
                    color: "#222",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  Buy Now
                </button>

                <button
                  onClick={() => handleRemove(index)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Buy All & Remove All Buttons */}
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
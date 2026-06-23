import React from "react";
import { createOrder } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../index.css"
import "./Cart.css";

function CartPage({ cart, setCart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // reduce is used to calculate the total price of the items in the cart by multiplying the price of each item by its quantity and summing them up
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return; // Prevent checkout if cart is empty

    setLoading(true);
    setError(null);

    try {
      await createOrder(cart);
      console.log("Order created successfully!", cart);
      setCart([]); // Clear cart after successful order
      navigate("/"); // Redirect to home or order confirmation page
    } catch (err) {
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 😞</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => {
              const itemSubtotal = item.price * item.quantity;
              return (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-pricing">
                    <p>Price: {item.price}€</p>
                    <p className="item-subtotal">Subtotal: {itemSubtotal}€</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h4> Total: {totalPrice}€</h4>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
            <button onClick={handleCheckout} disabled={loading} className="checkout-btn">
              {loading ? "Processing..." : "Place Order"}
            </button>
    </div>
  );
}

export default CartPage;
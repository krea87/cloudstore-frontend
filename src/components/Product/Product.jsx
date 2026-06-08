import React from "react";
import { useState } from "react";
import "./Product.css";

function Product({ product, onAddToCart }) {
  // Quantity state
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleItemClick = () => {
    // set Number to ensure it's a number and not a string
    onAddToCart(product, Number(selectedQuantity));
  };

  return (
    <div className="product-wrapper">
      <h4 className="p-title">{product.title}</h4>
      <p className="p-price">{product.price}€</p>
      <p className="p-description">{product.description}</p>
      <p className="p-category">Category: {product.category}</p>
      <img src={product.image} alt={product.title} className="p-image" />

      <div>
        <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
        <select
          id={`quantity-${product.id}`}
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(Number(e.target.value))}
          className="quantity-select"
        >
          {/* the _ is the first argument, which will never be used, it's the object/value on that index*/}
          {[...Array(10)].map((_, index) => {
            const value = index + 1;
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <button onClick={handleItemClick} className="add-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;

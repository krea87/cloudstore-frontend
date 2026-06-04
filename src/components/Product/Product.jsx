import React from "react";

function Product({ product }) {
  return (
    <div className="product-wrapper">
      <h4 className="p-title">{product.title}</h4>
      <p className="p-price">{product.price}</p>
      <p className="p-description">{product.description}</p>
      <p className="p.category">{product.category}</p>
    </div>
  );
}

export default Product;

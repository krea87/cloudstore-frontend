import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../../api/api";
import Product from "../../components/Product/Product";
import './Products.css';





function ProductsPage({ onAddToCart }) {


const {data: products, loading, error} = useProducts();

if(loading) return <div> Loading products...</div>
if(error && !products) return <div> Retrying... {error}</div>

  return (
    <div className="products-container">
      {products.map(product => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApiWithFallback } from "../../api/api";
import Product from "../../components/Product/Product";





function ProductsPage() {


const {data: products, loading, error} = useApiWithFallback("/api/products");

if(loading) return <div> Loading products...</div>
if(error && !products) return <div> Retrying... {error}</div>

  return (
    <div className="products-container">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;

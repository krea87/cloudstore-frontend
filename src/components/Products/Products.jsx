import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
        .then(res => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

  return (
    <div>Products</div>
  )
}

export default Products
import { useState, useEffect } from "react";
import axios from "axios";

// Base URL for API requests, set via environment variable. 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let token = localStorage.getItem("token");


// --- ACCOUNT RELATED ---

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);

    // If the data contains a token, save it to localStorage and return the data
    if (res.data?.token) localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (userInfo) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/register`, userInfo);
    // If the data contains a token, save it to localStorage and return the data
    if (res.data?.token) localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to login page after logout
};


export const useProducts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return { data, loading, error };
};


// --- PRODUCTS RELATED && ORDER RELATED ---

export const createOrder = async (cartItems) => {
  try {
    const currentToken = localStorage.getItem("token");

    const orderRequest = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    }
    const res = await axios.post(`${API_BASE_URL}/api/orders`, orderRequest, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Order creation failed");
      }
};
  

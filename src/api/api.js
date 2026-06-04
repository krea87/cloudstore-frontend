import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
const FALLBACK_URL="https://fakestoreapi.com";
let token = localStorage.getItem("token");

export const useApiWithFallback = (primaryEndpoint, fallbackEndpoint = "/products", options = {}) => {

  const primaryUrl = `${API_BASE_URL}${primaryEndpoint}`;
  const fallbackUrl = `${FALLBACK_URL}${fallbackEndpoint}`;
  
  const {retryDelay = 3000} = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const res = await axios.get(url); 
      setData(res.data);
      setError(null);
      return true; 
    } catch (err) {
      setError(err.message);
        return false;
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const execute = async () => {
      setLoading(true);
      setError(null);

      if (token !== null) {
        setError("Unauthorized: No token found");
        return false;
      }

      // Try primary URL first
      const primarySuccess = await fetchData(primaryUrl);

      if (primarySuccess || isCancelled) {
        setLoading(false);
        return;
      }

      // Fallback logic in two steps:
      // 1. Retry primary URL with delay
      // 2. If still fails, try secondary URL
      if(!isCancelled) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        if (!isCancelled) {
          await fetchData(fallbackUrl);
    }
  }
  
  setLoading(false);
}

  execute();

  return () => {
    isCancelled = true;
  };
  }, [primaryUrl, fallbackUrl, retryDelay]);

  return { data, loading, error };
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);

    // If the data contains a token, save it to localStorage and return the data
    if(res.data?.token) localStorage.setItem("token", res.data.token);
    
      return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (userInfo) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/register`, userInfo);
    // If the data contains a token, save it to localStorage and return the data
    if(res.data?.token) localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to login page after logout
};
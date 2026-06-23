import React, { useState } from "react";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./RegisterPage.css";
function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, // reminder for self that this means that the three dots means keep the existing values in formData and only update the one that changed
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const data = await registerUser(formData);
      setSuccess(true);
      console.log("Registration successful, user data:", data);
      navigate("/products");
    } catch (error) {
      setError(error.message);
      console.error("Registration failed:", error);
    }
  };
  return (
    <>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register and login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default RegisterPage;

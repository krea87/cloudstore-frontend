import React, { useState } from 'react'
import { loginUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        });
        const [error, setError] = useState(null);
        const [success, setSuccess] = useState(false);


        
        const navigate = useNavigate();

        const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        });
        }

        const handleSubmit = async (e) => { 
            e.preventDefault();
            setError(null);
            setSuccess(false);

            try {
                const data = await loginUser(formData);
                setSuccess(true);
                console.log("Login successful, user data:", data);
                navigate("/products"); // navigate to products page after successful login, will implement later
            } catch (error) {
                setError(error.message);
                console.error("Login failed:", error);
                console.log("Login failed, error message:", error.message);
            }
        }
  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default LoginPage
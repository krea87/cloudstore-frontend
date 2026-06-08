import React from 'react'
import { Link } from 'react-router-dom';
import { logoutUser } from '../../api/api';
import './Navbar.css';

function Navbar( { cartCount }) {

    // Check if there is a token in localStorage
    // If there is a token, isLoggedIn will be true, otherwise it will be false
    const isLoggedIn = localStorage.getItem("token") !== null;



  return (
    <div>
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link></li>
                        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
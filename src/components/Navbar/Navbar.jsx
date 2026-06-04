import React from 'react'
import { logoutUser } from '../../api/api';

function Navbar() {

    // Check if there is a token in localStorage
    // If there is a token, isLoggedIn will be true, otherwise it will be false
    const isLoggedIn = localStorage.getItem("token") !== null;



  return (
    <div>
        <nav className="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                {isLoggedIn ? (
                    <>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/logout" onClick={logoutUser}>Logout</a></li>
                    </>
                ) : (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
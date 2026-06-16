import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser, checkCurrentUser } from "../../api/api";
import "./Navbar.css";

function Navbar({ cartCount }) {
  const [user, setUser] = useState(null);

  // get userdata and set the value to the state of user
  // # TODO is to use the info for display later, now it's just to determine if the user is logged in or not

  useEffect(() => {
    checkCurrentUser()
      .then((data) => {
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
  }, []);

  // isLoggedIn is true if the user is not null
  const isLoggedIn = user !== null;

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link>
              </li>
              <li>
                <Link to="/" onClick={logoutUser}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

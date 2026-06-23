import React from 'react'
import "../../index.css";
import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';

function LandingPage() {
 
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  }


  return (
    <div className='landingpage'>
        <h1>Welcome to CloudStore!</h1>
        <div className="menu">
        <div onClick={handleClick} className='object'>📦  </div><span>products</span>
        </div>
    </div>
  )
}

export default LandingPage
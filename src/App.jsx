import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import RegisterPage from './pages/Register/RegisterPage';
import ProductsPage from './pages/Products/ProductsPage';
import LoginPage from './pages/Login/LoginPage';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/Landing/LandingPage';
import CartPage from './pages/Cart/CartPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    
    // Check if the product is already in the cart
    setCart(prevCart => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If the product is already in the cart, update the quantity
       return prevCart.map((item) => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
       );
      }
      // If the product is not in the cart, add it with the specified quantity
      return [...prevCart, { ...product, quantity }];
    });
  };

  return (
    <>
    <BrowserRouter>
    <div className="app-container">

    {/* Show the number of items in the cart in the navbar */}
    <Navbar cartCount={cart.length} />

    <main className="main-content">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
    </Routes>
    </main>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App

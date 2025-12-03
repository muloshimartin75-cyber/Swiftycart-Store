import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

// Context Providers
import { CartProvider, CartContext } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";

// Styles
import "./App.css";
import "./styles/amazon-theme.css";

// Professional Navigation Component
function Navigation() {
  const { cart } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAuth = (type) => {
    navigate(type === 'login' ? '/login' : '/register');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <nav className="amazon-navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-brand">
          SwiftCart
        </Link>
        
        <form className="navbar-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">🔍</button>
        </form>

        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <Link to="/" className="navbar-link">
                <span className="navbar-link-main">Hello, {user?.name?.split(' ')[0]}</span>
                <span className="navbar-link-sub">Account & Lists</span>
              </Link>
              <Link to="/cart" className="navbar-link cart-link">
                <span className="cart-icon">🛒</span>
                {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                <span className="navbar-link-sub">Cart</span>
              </Link>
              <button onClick={handleLogout} className="navbar-link" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'white'}}>
                <span className="navbar-link-main">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleAuth('login')} 
                className="navbar-link"
                style={{background: 'none', border: 'none', cursor: 'pointer', color: 'white'}}
              >
                <span className="navbar-link-main">Hello, Sign in</span>
                <span className="navbar-link-sub">Account & Lists</span>
              </button>
              <button 
                onClick={() => handleAuth('register')} 
                className="navbar-link"
                style={{background: 'none', border: 'none', cursor: 'pointer', color: 'white', marginLeft: '10px', paddingLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.3)'}}
              >
                <span className="navbar-link-main">New customer?</span>
                <span className="navbar-link-sub">Sign up</span>
              </button>
              <Link to="/cart" className="navbar-link cart-link">
                <span className="cart-icon">🛒</span>
                {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                <span className="navbar-link-sub">Cart</span>
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="navbar-bottom">
        <div className="navbar-menu">
          <span>☰</span>
          <span>All</span>
        </div>
        <div className="navbar-items">
          <Link to="/" className="navbar-item">Today's Deals</Link>
          <Link to="/" className="navbar-item">Customer Service</Link>
          <Link to="/" className="navbar-item">Registry</Link>
          <Link to="/" className="navbar-item">Gift Cards</Link>
          <Link to="/" className="navbar-item">Sell</Link>
        </div>
      </div>
    </nav>
  );
}

// Main App Component
function AppContent() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="not-found">
              <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" className="home-btn">Go Home</Link>
              </div>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SwiftCart</h3>
            <p>Fast, smooth shopping experience with premium products.</p>
          </div>
          
          <div className="footer-section">
            <h4>Shop</h4>
            <Link to="/">All Products</Link>
            <Link to="/">New Arrivals</Link>
            <Link to="/">Best Sellers</Link>
            <Link to="/">Deals & Offers</Link>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/">Help Center</Link>
            <Link to="/">Returns</Link>
            <Link to="/">Shipping Info</Link>
            <Link to="/">Contact Us</Link>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <p>Email: muloshimartin75@gmail.com</p>
            <p>Phone: +260 079615785</p>
            <p>Hours: 8am-6pm Customer Support</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 SwiftCart. All rights reserved. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}

// Root App Component with All Providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
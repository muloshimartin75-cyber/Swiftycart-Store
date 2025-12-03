import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Checkout.css';

function Checkout() {
  const { cart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = item.product || item;
      const price = product.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!user || !token) {
        setError('Please log in to continue');
        navigate('/login');
        return;
      }

      if (cart.length === 0) {
        setError('Your cart is empty');
        return;
      }

      // Call backend to create Stripe session
      const response = await fetch('http://localhost:5000/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.product?._id || item._id,
            quantity: item.quantity || 1
          })),
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Create a simple checkout redirect URL
      // In a real app, this would redirect to Stripe Hosted Checkout
      window.location.href = `http://localhost:5000/api/checkout/success?session_id=${sessionId}`;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="checkout-container">
        <p>Please <a href="/login">log in</a> to continue with checkout.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item, index) => {
                const product = item.product || item;
                return (
                  <div key={index} className="order-item">
                    <span>{product.name}</span>
                    <span>x{item.quantity}</span>
                    <span>${((product.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                );
              })}
              <div className="order-total">
                <strong>Total: ${calculateTotal()}</strong>
              </div>
            </>
          )}
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleCheckout} className="checkout-form">
          <h2>Shipping Information</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
              placeholder="123 Main St"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="New York"
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                placeholder="NY"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                placeholder="10001"
              />
            </div>

            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                placeholder="United States"
              />
            </div>
          </div>

          <button
            type="submit"
            className="checkout-btn"
            disabled={loading || cart.length === 0}
          >
            {loading ? 'Processing...' : `Pay $${calculateTotal()}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

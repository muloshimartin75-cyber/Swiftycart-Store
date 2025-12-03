import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CheckoutCancel.css';

function CheckoutCancel() {
  return (
    <div className="checkout-cancel-container">
      <div className="cancel-card">
        <div className="cancel-icon">✕</div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was cancelled. Please try again.</p>
        <div className="actions">
          <Link to="/cart" className="btn btn-primary">
            Return to Cart
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCancel;

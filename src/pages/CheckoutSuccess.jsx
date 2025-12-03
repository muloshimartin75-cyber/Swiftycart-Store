import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CheckoutSuccess.css';

function CheckoutSuccess() {
  return (
    <div className="checkout-success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <p className="order-info">
          A confirmation email has been sent to your email address.
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn btn-secondary">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            SwiftCart
          </Link>
          
          <h1 className="auth-title">Sign in</h1>

          {error && (
            <div className="auth-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Continue"}
            </button>
          </form>

          <div className="auth-divider">
            <span>New to SwiftCart?</span>
          </div>

          <Link to="/register" className="auth-create-btn">
            Create your SwiftCart account
          </Link>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <div className="demo-header">
              <span className="demo-icon">ℹ️</span>
              <strong>Demo Credentials</strong>
            </div>
            <div className="demo-content">
              <div className="demo-row">
                <span className="demo-label">Email:</span>
                <span className="demo-value">demo@swiftcart.com</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Password:</span>
                <span className="demo-value">password123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
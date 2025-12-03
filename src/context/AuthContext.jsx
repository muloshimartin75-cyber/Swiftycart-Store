import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user: userData } = response;
      
      // Store token and user data
      localStorage.setItem("swiftcart_token", token);
      localStorage.setItem("swiftcart_user", JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register(name, email, password);
      const { token, user: userData } = response;
      
      // Store token and user data
      localStorage.setItem("swiftcart_token", token);
      localStorage.setItem("swiftcart_user", JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("swiftcart_token");
    localStorage.removeItem("swiftcart_user");
  };

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("swiftcart_token");
      const storedUser = localStorage.getItem("swiftcart_user");
      
      if (token && storedUser) {
        try {
          // Verify token is still valid
          const response = await authAPI.getMe();
          setUser(response.user);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem("swiftcart_token");
          localStorage.removeItem("swiftcart_user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
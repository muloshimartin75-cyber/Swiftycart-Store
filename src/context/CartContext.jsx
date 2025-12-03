import { createContext, useState, useEffect } from "react";
import { cartAPI } from "../utils/api";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from backend if authenticated, otherwise use localStorage
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const response = await cartAPI.get();
          setCart(response.cart || []);
        } catch (error) {
          console.error("Error loading cart:", error);
          // Fallback to localStorage
          const localCart = localStorage.getItem("swiftcart_cart");
          if (localCart) {
            setCart(JSON.parse(localCart));
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Use localStorage for non-authenticated users
        const localCart = localStorage.getItem("swiftcart_cart");
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Save cart to localStorage whenever it changes (for non-authenticated users)
  useEffect(() => {
    if (!isAuthenticated && cart.length >= 0) {
      localStorage.setItem("swiftcart_cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const addToCart = async (item) => {
    const productId = item._id || item.id;
    
    if (isAuthenticated) {
      try {
        await cartAPI.add(productId, 1);
        const response = await cartAPI.get();
        setCart(response.cart || []);
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Fallback to local state
        setCart([...cart, { productId, quantity: 1, product: item }]);
      }
    } else {
      // For non-authenticated users, use local storage
      const existingItem = cart.find(c => (c.productId || c.product?._id || c.product?.id) === productId);
      if (existingItem) {
        setCart(cart.map(c => 
          (c.productId || c.product?._id || c.product?.id) === productId
            ? { ...c, quantity: (c.quantity || 1) + 1 }
            : c
        ));
      } else {
        setCart([...cart, { productId, quantity: 1, product: item }]);
      }
    }
  };

  const removeFromCart = async (id) => {
    if (isAuthenticated) {
      try {
        await cartAPI.remove(id);
        const response = await cartAPI.get();
        setCart(response.cart || []);
      } catch (error) {
        console.error("Error removing from cart:", error);
        // Fallback to local state
        setCart(cart.filter((item) => (item.productId || item.product?._id || item.product?.id) !== id));
      }
    } else {
      setCart(cart.filter((item) => (item.productId || item.product?._id || item.product?.id) !== id));
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (isAuthenticated) {
      try {
        await cartAPI.update(id, quantity);
        const response = await cartAPI.get();
        setCart(response.cart || []);
      } catch (error) {
        console.error("Error updating cart:", error);
        // Fallback to local state
        setCart(cart.map(item => 
          (item.productId || item.product?._id || item.product?.id) === id
            ? { ...item, quantity }
            : item
        ));
      }
    } else {
      setCart(cart.map(item => 
        (item.productId || item.product?._id || item.product?.id) === id
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await cartAPI.clear();
        setCart([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
        setCart([]);
      }
    } else {
      setCart([]);
      localStorage.removeItem("swiftcart_cart");
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};
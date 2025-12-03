const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('swiftcart_token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (name, email, password) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    }),

  login: (email, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  getMe: () => apiRequest('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => apiRequest(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => apiRequest('/cart'),
  
  add: (productId, quantity = 1) =>
    apiRequest('/cart', {
      method: 'POST',
      body: { productId, quantity },
    }),

  update: (productId, quantity) =>
    apiRequest(`/cart/${productId}`, {
      method: 'PUT',
      body: { quantity },
    }),

  remove: (productId) =>
    apiRequest(`/cart/${productId}`, {
      method: 'DELETE',
    }),

  clear: () =>
    apiRequest('/cart', {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersAPI = {
  create: (orderData) =>
    apiRequest('/orders', {
      method: 'POST',
      body: orderData,
    }),

  getAll: () => apiRequest('/orders'),

  getById: (id) => apiRequest(`/orders/${id}`),
};

export default apiRequest;


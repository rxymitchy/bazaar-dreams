
import { toast } from "@/components/ui/use-toast";

const API_URL = 'http://localhost:5000/api';

// Helper function to handle API errors
const handleError = (error) => {
  console.error('API Error:', error);
  
  const message = 
    error.response?.data?.error || 
    error.message || 
    'Something went wrong';
  
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  
  return { error: message };
};

// Products API
export const fetchProducts = async (filters = {}) => {
  try {
    let queryString = '';
    
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      
      queryString = `?${params.toString()}`;
    }
    
    const response = await fetch(`${API_URL}/products${queryString}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Auth API
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    // Save token to localStorage
    localStorage.setItem('token', data.token);
    
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    // Save token to localStorage
    localStorage.setItem('token', data.token);
    
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      localStorage.removeItem('token');
      return null;
    }
    
    return data.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('You must be logged in to create an order');
    }
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('You must be logged in to view orders');
    }
    
    const response = await fetch(`${API_URL}/orders/user/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchOrderById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('You must be logged in to view this order');
    }
    
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('You must be logged in to pay for an order');
    }
    
    const response = await fetch(`${API_URL}/orders/${orderId}/pay`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentResult),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

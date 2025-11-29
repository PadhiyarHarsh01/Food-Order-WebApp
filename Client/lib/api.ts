// lib/api.ts - Frontend API Configuration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface RequestConfig extends RequestInit {
  headers?: HeadersInit;
}

const request = async (endpoint: string, config: RequestConfig = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...config.headers,
  };

  const response = await fetch(url, {
    ...config,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: (data: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: any) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

// Restaurants API
export const restaurantsAPI = {
  getAll: (params?: any) => {
    const query = new URLSearchParams(params || {}).toString();
    return request(`/restaurants${query ? '?' + query : ''}`);
  },
  getById: (id: string) => request(`/restaurants/${id}`),
  create: (data: any) => request('/restaurants', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    request(`/restaurants/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request(`/restaurants/${id}`, { method: 'DELETE' }),
};

// Menu API
export const menuAPI = {
  getAll: (params?: any) => {
    const query = new URLSearchParams(params || {}).toString();
    return request(`/menu${query ? '?' + query : ''}`);
  },
  getByRestaurant: (restaurantId: string) =>
    request(`/menu/restaurant/${restaurantId}`),
  create: (data: any) => request('/menu', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    request(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request(`/menu/${id}`, { method: 'DELETE' }),
};

// Orders API
export const ordersAPI = {
  create: (data: any) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => request('/orders/user/my-orders'),
  getById: (id: string) => request(`/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    request(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  updatePayment: (id: string, paymentStatus: string) =>
    request(`/orders/${id}/payment`, {
      method: 'PATCH',
      body: JSON.stringify({ paymentStatus }),
    }),
  cancel: (id: string) => request(`/orders/${id}/cancel`, { method: 'PATCH' }),
};

// Users API
export const usersAPI = {
  getProfile: () => request('/users/profile'),
  updateProfile: (data: any) =>
    request('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  getAll: () => request('/users'),
  getById: (id: string) => request(`/users/${id}`),
  delete: (id: string) => request(`/users/${id}`, { method: 'DELETE' }),
};

// Health check
export const healthAPI = {
  check: () => request('/health'),
};

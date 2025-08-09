import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add correlation ID for request tracking
    config.headers['x-correlation-id'] = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      console.error(`API Error ${status}:`, data);
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Handle unauthorized - could redirect to login
          console.error('Unauthorized access');
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error('API error:', data.message || 'Unknown error');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    } else {
      // Other error
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Entity service
export const entityService = {
  // Get all entities with optional query parameters
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/entities', { params });
    return response.data;
  },

  // Get entity by ID
  getById: async (id) => {
    const response = await apiClient.get(`/api/entities/${id}`);
    return response.data;
  },

  // Create new entity
  create: async (entityData) => {
    const response = await apiClient.post('/api/entities', entityData);
    return response.data;
  },

  // Update entity (full update)
  update: async (id, entityData) => {
    const response = await apiClient.put(`/api/entities/${id}`, entityData);
    return response.data;
  },

  // Partial update entity
  partialUpdate: async (id, entityData) => {
    const response = await apiClient.patch(`/api/entities/${id}`, entityData);
    return response.data;
  },

  // Delete entity
  delete: async (id) => {
    const response = await apiClient.delete(`/api/entities/${id}`);
    return response.data;
  },
};

// Health service
export const healthService = {
  check: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;

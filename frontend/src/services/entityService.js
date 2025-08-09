import apiClient from './apiClient';

class EntityService {
  // Get all entities with pagination
  async getEntities(page = 1, limit = 10) {
    try {
      const response = await apiClient.get('/api/entities', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get single entity by ID
  async getEntity(id) {
    try {
      const response = await apiClient.get(`/api/entities/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create new entity
  async createEntity(entityData) {
    try {
      const response = await apiClient.post('/api/entities', entityData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update entity (full update)
  async updateEntity(id, entityData) {
    try {
      const response = await apiClient.put(`/api/entities/${id}`, entityData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Partial update entity
  async patchEntity(id, entityData) {
    try {
      const response = await apiClient.patch(`/api/entities/${id}`, entityData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete entity
  async deleteEntity(id) {
    try {
      await apiClient.delete(`/api/entities/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data.message || 'Server error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        status: 0
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1
      };
    }
  }
}

export default new EntityService();


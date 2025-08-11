import apiClient from './apiClient';

class EntityService {
  async getEntities(params = {}) {
    return await apiClient.get('/api/entities', { params });
  }

  async getEntityById(id) {
    return await apiClient.get(`/api/entities/${id}`);
  }

  async createEntity(data) {
    return await apiClient.post('/api/entities', data);
  }

  async updateEntity(id, data) {
    return await apiClient.put(`/api/entities/${id}`, data);
  }

  async partialUpdateEntity(id, data) {
    return await apiClient.patch(`/api/entities/${id}`, data);
  }

  async deleteEntity(id) {
    return await apiClient.delete(`/api/entities/${id}`);
  }

  async getHealth() {
    return await apiClient.get('/health');
  }
}

export default new EntityService();

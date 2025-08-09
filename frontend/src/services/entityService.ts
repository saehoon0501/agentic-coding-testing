import apiClient from './apiClient';

export interface Entity {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateEntityData {
  name: string;
  description?: string;
}

export const entityService = {
  async getAll(): Promise<Entity[]> {
    const response = await apiClient.get('/entities');
    return response.data;
  },

  async getById(id: string): Promise<Entity> {
    const response = await apiClient.get(`/entities/${id}`);
    return response.data;
  },

  async create(data: CreateEntityData): Promise<Entity> {
    const response = await apiClient.post('/entities', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateEntityData>): Promise<Entity> {
    const response = await apiClient.put(`/entities/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/entities/${id}`);
  }
};

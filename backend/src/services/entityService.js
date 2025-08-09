const SampleEntityRepository = require('../repositories/SampleEntityRepository');
const logger = require('../utils/logger');

class EntityService {
  constructor() {
    this.repository = new SampleEntityRepository();
  }

  async getAllEntities(options = {}) {
    try {
      logger.info('Fetching all entities', { options });
      return await this.repository.findAll(options);
    } catch (error) {
      logger.error('Error fetching entities', { error: error.message });
      throw error;
    }
  }

  async getEntityById(id) {
    try {
      logger.info(`Fetching entity by id: ${id}`);
      return await this.repository.findById(id);
    } catch (error) {
      logger.error(`Error fetching entity by id: ${id}`, { error: error.message });
      throw error;
    }
  }

  async createEntity(entityData) {
    try {
      logger.info('Creating new entity', { entityData });
      
      // Validate entity data
      const entity = new (require('../models/SampleEntity'))(entityData);
      const validation = entity.validate();
      
      if (!validation.isValid) {
        const error = new Error(`Validation failed: ${validation.errors.join(', ')}`);
        error.name = 'ValidationError';
        throw error;
      }

      return await this.repository.create(entityData);
    } catch (error) {
      logger.error('Error creating entity', { error: error.message, entityData });
      throw error;
    }
  }

  async updateEntity(id, updateData) {
    try {
      logger.info(`Updating entity: ${id}`, { updateData });
      
      // Check if entity exists
      const existingEntity = await this.repository.findById(id);
      if (!existingEntity) {
        return null;
      }

      // Validate update data
      const updatedEntityData = { ...existingEntity.toJSON(), ...updateData };
      const entity = new (require('../models/SampleEntity'))(updatedEntityData);
      const validation = entity.validate();
      
      if (!validation.isValid) {
        const error = new Error(`Validation failed: ${validation.errors.join(', ')}`);
        error.name = 'ValidationError';
        throw error;
      }

      return await this.repository.update(id, updateData);
    } catch (error) {
      logger.error(`Error updating entity: ${id}`, { error: error.message, updateData });
      throw error;
    }
  }

  async partialUpdateEntity(id, updateData) {
    try {
      logger.info(`Partially updating entity: ${id}`, { updateData });
      
      // Check if entity exists
      const existingEntity = await this.repository.findById(id);
      if (!existingEntity) {
        return null;
      }

      // For partial updates, we only validate the fields being updated
      return await this.repository.update(id, updateData);
    } catch (error) {
      logger.error(`Error partially updating entity: ${id}`, { error: error.message, updateData });
      throw error;
    }
  }

  async deleteEntity(id) {
    try {
      logger.info(`Deleting entity: ${id}`);
      
      // Check if entity exists
      const existingEntity = await this.repository.findById(id);
      if (!existingEntity) {
        return false;
      }

      return await this.repository.delete(id);
    } catch (error) {
      logger.error(`Error deleting entity: ${id}`, { error: error.message });
      throw error;
    }
  }

  async getEntitiesByStatus(status, options = {}) {
    try {
      logger.info(`Fetching entities by status: ${status}`, { options });
      return await this.repository.findByStatus(status, options);
    } catch (error) {
      logger.error(`Error fetching entities by status: ${status}`, { error: error.message });
      throw error;
    }
  }
}

module.exports = new EntityService();

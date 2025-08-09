const entityRepository = require('../repositories/EntityRepository');
const logger = require('../utils/logger');

class EntityService {
  async getAllEntities(options = {}) {
    try {
      const entities = await entityRepository.findAll(options);
      const total = await entityRepository.count();
      
      return {
        entities: entities.map(entity => entity.toJSON()),
        total
      };
    } catch (error) {
      logger.error('Error fetching entities', { error: error.message });
      throw error;
    }
  }

  async getEntityById(id) {
    try {
      const entity = await entityRepository.findById(id);
      return entity ? entity.toJSON() : null;
    } catch (error) {
      logger.error('Error fetching entity by ID', { id, error: error.message });
      throw error;
    }
  }

  async createEntity(entityData) {
    try {
      const entity = await entityRepository.create(entityData);
      logger.info('Entity created', { entityId: entity.id });
      return entity.toJSON();
    } catch (error) {
      logger.error('Error creating entity', { entityData, error: error.message });
      throw error;
    }
  }

  async updateEntity(id, entityData, partial = false) {
    try {
      let updateData = entityData;
      
      if (partial) {
        const existingEntity = await entityRepository.findById(id);
        if (!existingEntity) {
          return null;
        }
        updateData = { ...existingEntity.toJSON(), ...entityData };
      }

      const entity = await entityRepository.update(id, updateData);
      
      if (entity) {
        logger.info('Entity updated', { entityId: id });
        return entity.toJSON();
      }
      
      return null;
    } catch (error) {
      logger.error('Error updating entity', { id, entityData, error: error.message });
      throw error;
    }
  }

  async deleteEntity(id) {
    try {
      const deleted = await entityRepository.delete(id);
      
      if (deleted) {
        logger.info('Entity deleted', { entityId: id });
      }
      
      return deleted;
    } catch (error) {
      logger.error('Error deleting entity', { id, error: error.message });
      throw error;
    }
  }

  async searchEntities(searchTerm, options = {}) {
    try {
      const entities = await entityRepository.search(searchTerm, options);
      return entities.map(entity => entity.toJSON());
    } catch (error) {
      logger.error('Error searching entities', { searchTerm, error: error.message });
      throw error;
    }
  }
}

module.exports = new EntityService();


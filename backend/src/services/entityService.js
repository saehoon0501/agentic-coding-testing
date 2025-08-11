const EntityRepository = require('../repositories/EntityRepository');
const Entity = require('../models/Entity');

class EntityService {
  constructor() {
    this.entityRepository = new EntityRepository();
  }

  async getEntities(options = {}) {
    const { page = 1, limit = 10, search } = options;
    const offset = (page - 1) * limit;

    let entities;
    let total;

    if (search) {
      entities = await this.entityRepository.search(search, { limit, offset });
      // For simplicity, using the same count - in production, you'd want a separate count query
      total = entities.length;
    } else {
      entities = await this.entityRepository.findAll({ limit, offset });
      total = await this.entityRepository.count();
    }

    return {
      data: entities.map(entity => Entity.fromDatabase(entity).toJSON()),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getEntityById(id) {
    const entity = await this.entityRepository.findById(id);
    return entity ? Entity.fromDatabase(entity).toJSON() : null;
  }

  async createEntity(data) {
    const entity = new Entity(data);
    const validation = entity.validate();
    
    if (!validation.isValid) {
      const error = new Error('Validation failed');
      error.name = 'ValidationError';
      error.details = validation.errors;
      throw error;
    }

    const created = await this.entityRepository.create({
      name: entity.name,
      description: entity.description,
      status: entity.status,
      metadata: JSON.stringify(entity.metadata)
    });

    return Entity.fromDatabase(created).toJSON();
  }

  async updateEntity(id, data, partial = false) {
    const existing = await this.entityRepository.findById(id);
    if (!existing) {
      return null;
    }

    const updateData = partial ? { ...existing, ...data } : data;
    const entity = new Entity(updateData);
    const validation = entity.validate();
    
    if (!validation.isValid) {
      const error = new Error('Validation failed');
      error.name = 'ValidationError';
      error.details = validation.errors;
      throw error;
    }

    const updated = await this.entityRepository.update(id, {
      name: entity.name,
      description: entity.description,
      status: entity.status,
      metadata: JSON.stringify(entity.metadata)
    });

    return updated ? Entity.fromDatabase(updated).toJSON() : null;
  }

  async deleteEntity(id) {
    const existing = await this.entityRepository.findById(id);
    if (!existing) {
      return false;
    }

    // Implement soft delete by default
    const softDeleted = await this.entityRepository.softDelete(id);
    return !!softDeleted;
  }
}

module.exports = new EntityService();

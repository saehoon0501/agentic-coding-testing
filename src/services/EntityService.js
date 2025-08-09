const EntityRepository = require("../repositories/EntityRepository");
const { AppError } = require("../middleware/errorHandler");

class EntityService {
  async createEntity(data) {
    // Check if entity with same name already exists
    const existingEntity = await EntityRepository.findByName(data.name);
    if (existingEntity) {
      throw new AppError("Entity with this name already exists", 400);
    }

    return await EntityRepository.create(data);
  }

  async getEntityById(id) {
    const entity = await EntityRepository.findById(id);
    if (!entity) {
      throw new AppError("Entity not found", 404);
    }
    return entity;
  }

  async getAllEntities(options) {
    return await EntityRepository.findAll(options);
  }

  async updateEntity(id, data) {
    const entity = await EntityRepository.findById(id);
    if (!entity) {
      throw new AppError("Entity not found", 404);
    }

    // Check name uniqueness if name is being updated
    if (data.name && data.name !== entity.name) {
      const existingEntity = await EntityRepository.findByName(data.name);
      if (existingEntity) {
        throw new AppError("Entity with this name already exists", 400);
      }
    }

    return await EntityRepository.update(id, data);
  }

  async deleteEntity(id) {
    const entity = await EntityRepository.findById(id);
    if (!entity) {
      throw new AppError("Entity not found", 404);
    }

    await EntityRepository.delete(id);
    return { message: "Entity deleted successfully" };
  }

  async searchEntities(query, options) {
    return await EntityRepository.searchByNameOrDescription(query, options);
  }

  async bulkCreateEntities(entitiesData) {
    // Validate unique names
    const names = entitiesData.map(e => e.name);
    const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicateNames.length > 0) {
      throw new AppError(`Duplicate names found: ${duplicateNames.join(", ")}`, 400);
    }

    return await EntityRepository.bulkCreate(entitiesData);
  }

  async bulkDeleteEntities(ids) {
    return await EntityRepository.bulkDelete(ids);
  }
}

module.exports = new EntityService();

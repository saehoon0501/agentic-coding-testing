const EntityRepository = require("../repositories/entityRepository");
const { AppError } = require("../middleware/errorHandler");

class EntityService {
  constructor() {
    this.entityRepository = new EntityRepository();
  }

  async create(entityData) {
    return await this.entityRepository.create(entityData);
  }

  async getAll(options) {
    return await this.entityRepository.findAll(options);
  }

  async getById(id) {
    return await this.entityRepository.findById(id);
  }

  async update(id, updateData) {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      return null;
    }
    return await this.entityRepository.update(id, updateData);
  }

  async partialUpdate(id, updateData) {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      return null;
    }
    return await this.entityRepository.partialUpdate(id, updateData);
  }

  async delete(id) {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      return false;
    }
    return await this.entityRepository.delete(id);
  }

  async search(searchOptions) {
    return await this.entityRepository.search(searchOptions);
  }

  async bulkCreate(entitiesData) {
    return await this.entityRepository.bulkCreate(entitiesData);
  }

  async bulkDelete(ids) {
    return await this.entityRepository.bulkDelete(ids);
  }
}

module.exports = new EntityService();

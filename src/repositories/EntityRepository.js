const BaseRepository = require("./BaseRepository");
const Entity = require("../models/Entity");

class EntityRepository extends BaseRepository {
  constructor() {
    super(Entity);
  }

  async findByName(name) {
    return await this.model.findOne({ where: { name } });
  }

  async findByStatus(status, options = {}) {
    return await this.findAll({ ...options, where: { status } });
  }

  async searchByNameOrDescription(query, options = {}) {
    return await this.search(query, { 
      ...options, 
      fields: ["name", "description"] 
    });
  }
}

module.exports = new EntityRepository();

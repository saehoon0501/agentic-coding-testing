const BaseRepository = require("./baseRepository");
const Entity = require("../models/Entity");

class EntityRepository extends BaseRepository {
  constructor() {
    super(Entity);
  }

  // Custom entity-specific methods can be added here
  async findByName(name) {
    return await this.model.findOne({ where: { name } });
  }

  async findByStatus(status) {
    return await this.model.findAll({ where: { status } });
  }
}

module.exports = EntityRepository;

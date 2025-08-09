const { Op } = require("sequelize");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(options = {}) {
    const { page = 1, limit = 10, sort = "createdAt", order = "DESC" } = options;
    const offset = (page - 1) * limit;

    const result = await this.model.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order.toUpperCase()]]
    });

    return {
      entities: result.rows,
      total: result.count
    };
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    await this.model.update(data, { where: { id } });
    return await this.findById(id);
  }

  async partialUpdate(id, data) {
    await this.model.update(data, { where: { id } });
    return await this.findById(id);
  }

  async delete(id) {
    const result = await this.model.destroy({ where: { id } });
    return result > 0;
  }

  async search(options) {
    const { query, filters = {}, page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    let whereClause = {};

    // Text search
    if (query) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } }
      ];
    }

    // Apply filters
    Object.keys(filters).forEach(key => {
      whereClause[key] = filters[key];
    });

    const result = await this.model.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]]
    });

    return {
      entities: result.rows,
      total: result.count
    };
  }

  async bulkCreate(dataArray) {
    return await this.model.bulkCreate(dataArray);
  }

  async bulkDelete(ids) {
    const result = await this.model.destroy({
      where: { id: { [Op.in]: ids } }
    });
    return result;
  }
}

module.exports = BaseRepository;

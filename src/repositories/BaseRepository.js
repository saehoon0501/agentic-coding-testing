const { Op } = require("sequelize");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findAll(options = {}) {
    const { page = 1, limit = 10, where = {}, order = [["createdAt", "DESC"]] } = options;
    const offset = (page - 1) * limit;

    return await this.model.findAndCountAll({
      where,
      order,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  }

  async update(id, data) {
    const [updatedRowsCount] = await this.model.update(data, {
      where: { id },
      returning: true
    });
    
    if (updatedRowsCount === 0) {
      return null;
    }
    
    return await this.findById(id);
  }

  async delete(id, soft = true) {
    if (soft) {
      return await this.model.destroy({ where: { id } });
    } else {
      return await this.model.destroy({ where: { id }, force: true });
    }
  }

  async search(query, options = {}) {
    const { page = 1, limit = 10, fields = [] } = options;
    const offset = (page - 1) * limit;

    const whereClause = {
      [Op.or]: fields.map(field => ({
        [field]: {
          [Op.iLike]: `%${query}%`
        }
      }))
    };

    return await this.model.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]]
    });
  }

  async bulkCreate(dataArray) {
    return await this.model.bulkCreate(dataArray, { returning: true });
  }

  async bulkUpdate(updates) {
    const results = [];
    for (const update of updates) {
      const result = await this.update(update.id, update.data);
      results.push(result);
    }
    return results;
  }

  async bulkDelete(ids, soft = true) {
    if (soft) {
      return await this.model.destroy({ where: { id: ids } });
    } else {
      return await this.model.destroy({ where: { id: ids }, force: true });
    }
  }
}

module.exports = BaseRepository;

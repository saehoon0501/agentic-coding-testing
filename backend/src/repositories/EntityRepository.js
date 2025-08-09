const BaseRepository = require('./BaseRepository');
const Entity = require('../models/Entity');
const db = require('../config/database');

class EntityRepository extends BaseRepository {
  constructor() {
    super(db, 'entities');
  }

  async findAll(options = {}) {
    const rows = await super.findAll(options);
    return rows.map(row => Entity.fromRow(row));
  }

  async findById(id) {
    const row = await super.findById(id);
    return row ? Entity.fromRow(row) : null;
  }

  async create(entityData) {
    const entity = new Entity(entityData);
    const row = await super.create(entity.toRow());
    return Entity.fromRow(row);
  }

  async update(id, entityData) {
    const entity = new Entity(entityData);
    const row = await super.update(id, entity.toRow());
    return row ? Entity.fromRow(row) : null;
  }

  async findByStatus(status, options = {}) {
    const { limit = 10, offset = 0 } = options;
    
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE status = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await this.db.query(query, [status, limit, offset]);
    return result.rows.map(row => Entity.fromRow(row));
  }

  async search(searchTerm, options = {}) {
    const { limit = 10, offset = 0 } = options;
    
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE name ILIKE $1 OR description ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await this.db.query(query, [`%${searchTerm}%`, limit, offset]);
    return result.rows.map(row => Entity.fromRow(row));
  }
}

module.exports = new EntityRepository();


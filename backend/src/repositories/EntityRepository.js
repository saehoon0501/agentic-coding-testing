const BaseRepository = require('./BaseRepository');
const pool = require('../config/database');

class EntityRepository extends BaseRepository {
  constructor() {
    super(pool, 'entities');
  }

  async findByName(name) {
    const query = 'SELECT * FROM entities WHERE name = $1';
    const result = await this.pool.query(query, [name]);
    return result.rows[0] || null;
  }

  async findByStatus(status, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const query = `
      SELECT * FROM entities 
      WHERE status = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result = await this.pool.query(query, [status, limit, offset]);
    return result.rows;
  }

  async search(searchTerm, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const query = `
      SELECT * FROM entities 
      WHERE name ILIKE $1 OR description ILIKE $1
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result = await this.pool.query(query, [`%${searchTerm}%`, limit, offset]);
    return result.rows;
  }

  async softDelete(id) {
    const query = `
      UPDATE entities 
      SET status = 'inactive', updated_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

module.exports = EntityRepository;

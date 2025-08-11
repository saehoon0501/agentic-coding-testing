class BaseRepository {
  constructor(pool, tableName) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async findAll(options = {}) {
    const { limit = 10, offset = 0, orderBy = 'created_at', orderDirection = 'DESC' } = options;
    
    const query = `
      SELECT * FROM ${this.tableName}
      ORDER BY ${orderBy} ${orderDirection}
      LIMIT $1 OFFSET $2
    `;
    
    const result = await this.pool.query(query, [limit, offset]);
    return result.rows;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    
    const query = `
      INSERT INTO ${this.tableName} (${fields.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async update(id, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await this.pool.query(query, [id, ...values]);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`;
    const result = await this.pool.query(query, [id]);
    return result.rows.length > 0;
  }

  async count(conditions = {}) {
    let query = `SELECT COUNT(*) FROM ${this.tableName}`;
    const values = [];
    
    if (Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
      values.push(...Object.values(conditions));
    }
    
    const result = await this.pool.query(query, values);
    return parseInt(result.rows[0].count);
  }
}

module.exports = BaseRepository;

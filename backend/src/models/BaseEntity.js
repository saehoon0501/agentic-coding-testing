class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.createdAt = data.created_at || new Date();
    this.updatedAt = data.updated_at || new Date();
  }

  // Convert database row to entity instance
  static fromRow(row) {
    return new this(row);
  }

  // Convert entity to database format
  toRow() {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }

  // Convert entity to JSON response format
  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Update entity with new data
  update(data) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && key !== 'id' && key !== 'createdAt') {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date();
  }
}

module.exports = BaseEntity;


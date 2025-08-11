class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.createdAt = data.created_at || new Date();
    this.updatedAt = data.updated_at || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromDatabase(row) {
    return new this(row);
  }

  validate() {
    // Override in child classes
    return { isValid: true, errors: [] };
  }
}

module.exports = BaseEntity;

const BaseEntity = require('./BaseEntity');

class Entity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.description = data.description || '';
    this.status = data.status || 'active';
    this.metadata = data.metadata || {};
  }

  static fromRow(row) {
    return new Entity({
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      metadata: row.metadata,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
  }

  toRow() {
    return {
      ...super.toRow(),
      name: this.name,
      description: this.description,
      status: this.status,
      metadata: JSON.stringify(this.metadata)
    };
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      status: this.status,
      metadata: this.metadata
    };
  }

  // Validation methods
  isValid() {
    return this.name && this.name.length > 0;
  }

  isActive() {
    return this.status === 'active';
  }
}

module.exports = Entity;


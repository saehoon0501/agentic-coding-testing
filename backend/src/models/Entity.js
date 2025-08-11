const BaseEntity = require('./BaseEntity');

class Entity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.description = data.description || '';
    this.status = data.status || 'active';
    this.metadata = data.metadata || {};
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

  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (this.name && this.name.length > 255) {
      errors.push('Name must be less than 255 characters');
    }
    
    if (this.description && this.description.length > 1000) {
      errors.push('Description must be less than 1000 characters');
    }
    
    if (!['active', 'inactive'].includes(this.status)) {
      errors.push('Status must be either active or inactive');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static fromDatabase(row) {
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
}

module.exports = Entity;

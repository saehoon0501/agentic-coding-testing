const BaseEntity = require('./BaseEntity');

class SampleEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.description = data.description || '';
    this.status = data.status || 'active';
    this.metadata = data.metadata || {};
  }

  // Override validation
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

  // Override toJSON to include all fields
  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      status: this.status,
      metadata: this.metadata
    };
  }

  // Static method to create from database row
  static fromRow(row) {
    return new SampleEntity({
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      metadata: typeof row.metadata === 'string' ? JSON.parse(row.metadata) : row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }
}

module.exports = SampleEntity;

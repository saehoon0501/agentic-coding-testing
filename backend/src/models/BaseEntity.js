class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Update the updatedAt timestamp
  touch() {
    this.updatedAt = new Date();
  }

  // Convert to JSON representation
  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Validate entity data
  validate() {
    // Override in child classes
    return { isValid: true, errors: [] };
  }
}

module.exports = BaseEntity;

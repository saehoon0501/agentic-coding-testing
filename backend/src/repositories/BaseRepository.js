class BaseRepository {
  constructor() {
    // In a real implementation, this would connect to a database
    this.data = new Map();
    this.nextId = 1;
  }

  // Generate next ID
  generateId() {
    return this.nextId++;
  }

  // Create a new record
  async create(entityData) {
    const id = this.generateId();
    const entity = {
      ...entityData,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.data.set(id, entity);
    return entity;
  }

  // Find by ID
  async findById(id) {
    return this.data.get(parseInt(id)) || null;
  }

  // Find all with pagination and filtering
  async findAll(options = {}) {
    const { page = 1, limit = 10, search } = options;
    let entities = Array.from(this.data.values());

    // Apply search filter if provided
    if (search) {
      entities = entities.filter(entity => 
        entity.name && entity.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calculate pagination
    const total = entities.length;
    const offset = (page - 1) * limit;
    const paginatedEntities = entities.slice(offset, offset + limit);

    return {
      data: paginatedEntities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // Update by ID
  async update(id, updateData) {
    const entity = this.data.get(parseInt(id));
    if (!entity) {
      return null;
    }

    const updatedEntity = {
      ...entity,
      ...updateData,
      id: entity.id, // Preserve ID
      createdAt: entity.createdAt, // Preserve creation date
      updatedAt: new Date()
    };

    this.data.set(parseInt(id), updatedEntity);
    return updatedEntity;
  }

  // Delete by ID
  async delete(id) {
    const entity = this.data.get(parseInt(id));
    if (!entity) {
      return false;
    }

    this.data.delete(parseInt(id));
    return true;
  }

  // Check if entity exists
  async exists(id) {
    return this.data.has(parseInt(id));
  }
}

module.exports = BaseRepository;

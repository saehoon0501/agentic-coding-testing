const BaseRepository = require('./BaseRepository');
const SampleEntity = require('../models/SampleEntity');

class SampleEntityRepository extends BaseRepository {
  constructor() {
    super();
    // Initialize with some sample data
    this.seedData();
  }

  // Seed initial data
  async seedData() {
    await this.create({
      name: 'Sample Entity 1',
      description: 'This is a sample entity for demonstration',
      status: 'active',
      metadata: { category: 'demo', priority: 'high' }
    });

    await this.create({
      name: 'Sample Entity 2',
      description: 'Another sample entity',
      status: 'inactive',
      metadata: { category: 'test', priority: 'low' }
    });
  }

  // Override create to return SampleEntity instance
  async create(entityData) {
    const rawEntity = await super.create(entityData);
    return SampleEntity.fromRow({
      ...rawEntity,
      created_at: rawEntity.createdAt,
      updated_at: rawEntity.updatedAt
    });
  }

  // Override findById to return SampleEntity instance
  async findById(id) {
    const rawEntity = await super.findById(id);
    if (!rawEntity) return null;
    
    return SampleEntity.fromRow({
      ...rawEntity,
      created_at: rawEntity.createdAt,
      updated_at: rawEntity.updatedAt
    });
  }

  // Override findAll to return SampleEntity instances
  async findAll(options = {}) {
    const result = await super.findAll(options);
    
    return {
      ...result,
      data: result.data.map(rawEntity => 
        SampleEntity.fromRow({
          ...rawEntity,
          created_at: rawEntity.createdAt,
          updated_at: rawEntity.updatedAt
        })
      )
    };
  }

  // Override update to return SampleEntity instance
  async update(id, updateData) {
    const rawEntity = await super.update(id, updateData);
    if (!rawEntity) return null;
    
    return SampleEntity.fromRow({
      ...rawEntity,
      created_at: rawEntity.createdAt,
      updated_at: rawEntity.updatedAt
    });
  }

  // Find by status
  async findByStatus(status, options = {}) {
    const allEntities = await this.findAll({ ...options, limit: 1000 });
    const filteredData = allEntities.data.filter(entity => entity.status === status);
    
    const { page = 1, limit = 10 } = options;
    const total = filteredData.length;
    const offset = (page - 1) * limit;
    const paginatedData = filteredData.slice(offset, offset + limit);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = SampleEntityRepository;

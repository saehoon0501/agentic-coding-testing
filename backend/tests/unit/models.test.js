const SampleEntity = require('../../src/models/SampleEntity');

describe('SampleEntity Model', () => {
  test('should create entity with default values', () => {
    const entity = new SampleEntity();
    
    expect(entity.name).toBe('');
    expect(entity.description).toBe('');
    expect(entity.status).toBe('active');
    expect(entity.metadata).toEqual({});
    expect(entity.id).toBeNull();
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  test('should create entity with provided data', () => {
    const data = {
      id: 1,
      name: 'Test Entity',
      description: 'Test description',
      status: 'inactive',
      metadata: { key: 'value' },
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02')
    };

    const entity = new SampleEntity(data);
    
    expect(entity.id).toBe(1);
    expect(entity.name).toBe('Test Entity');
    expect(entity.description).toBe('Test description');
    expect(entity.status).toBe('inactive');
    expect(entity.metadata).toEqual({ key: 'value' });
    expect(entity.createdAt).toEqual(new Date('2023-01-01'));
    expect(entity.updatedAt).toEqual(new Date('2023-01-02'));
  });

  test('should validate entity correctly', () => {
    const validEntity = new SampleEntity({
      name: 'Valid Entity',
      description: 'Valid description',
      status: 'active'
    });

    const validation = validEntity.validate();
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toEqual([]);
  });

  test('should return validation errors for invalid entity', () => {
    const invalidEntity = new SampleEntity({
      name: '', // Empty name
      description: 'a'.repeat(1001), // Too long description
      status: 'invalid_status' // Invalid status
    });

    const validation = invalidEntity.validate();
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('Name is required');
    expect(validation.errors).toContain('Description must be less than 1000 characters');
    expect(validation.errors).toContain('Status must be either active or inactive');
  });

  test('should convert to JSON correctly', () => {
    const entity = new SampleEntity({
      id: 1,
      name: 'Test Entity',
      description: 'Test description',
      status: 'active',
      metadata: { key: 'value' },
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02')
    });

    const json = entity.toJSON();
    
    expect(json).toEqual({
      id: 1,
      name: 'Test Entity',
      description: 'Test description',
      status: 'active',
      metadata: { key: 'value' },
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02')
    });
  });

  test('should create from database row', () => {
    const row = {
      id: 1,
      name: 'Test Entity',
      description: 'Test description',
      status: 'active',
      metadata: JSON.stringify({ key: 'value' }),
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-02')
    };

    const entity = SampleEntity.fromRow(row);
    
    expect(entity.id).toBe(1);
    expect(entity.name).toBe('Test Entity');
    expect(entity.description).toBe('Test description');
    expect(entity.status).toBe('active');
    expect(entity.metadata).toEqual({ key: 'value' });
    expect(entity.createdAt).toEqual(new Date('2023-01-01'));
    expect(entity.updatedAt).toEqual(new Date('2023-01-02'));
  });

  test('should update timestamp when touched', () => {
    const entity = new SampleEntity();
    const originalUpdatedAt = entity.updatedAt;
    
    // Wait a bit to ensure timestamp difference
    setTimeout(() => {
      entity.touch();
      expect(entity.updatedAt).not.toEqual(originalUpdatedAt);
      expect(entity.updatedAt).toBeInstanceOf(Date);
    }, 10);
  });
});

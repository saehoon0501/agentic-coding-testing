const Entity = require('../../src/models/Entity');

describe('Entity Model', () => {
  test('should create entity with default values', () => {
    const entity = new Entity();
    
    expect(entity.name).toBe('');
    expect(entity.status).toBe('active');
    expect(entity.metadata).toEqual({});
  });

  test('should create entity with provided data', () => {
    const data = {
      name: 'Test Entity',
      description: 'Test Description',
      status: 'inactive',
      metadata: { key: 'value' }
    };
    
    const entity = new Entity(data);
    
    expect(entity.name).toBe('Test Entity');
    expect(entity.description).toBe('Test Description');
    expect(entity.status).toBe('inactive');
    expect(entity.metadata).toEqual({ key: 'value' });
  });

  test('should validate entity correctly', () => {
    const validEntity = new Entity({ name: 'Valid Entity' });
    const invalidEntity = new Entity({ name: '' });
    
    expect(validEntity.isValid()).toBe(true);
    expect(invalidEntity.isValid()).toBe(false);
  });

  test('should check if entity is active', () => {
    const activeEntity = new Entity({ status: 'active' });
    const inactiveEntity = new Entity({ status: 'inactive' });
    
    expect(activeEntity.isActive()).toBe(true);
    expect(inactiveEntity.isActive()).toBe(false);
  });

  test('should convert to JSON correctly', () => {
    const entity = new Entity({
      id: 1,
      name: 'Test Entity',
      description: 'Test Description'
    });
    
    const json = entity.toJSON();
    
    expect(json).toHaveProperty('id', 1);
    expect(json).toHaveProperty('name', 'Test Entity');
    expect(json).toHaveProperty('description', 'Test Description');
    expect(json).toHaveProperty('createdAt');
    expect(json).toHaveProperty('updatedAt');
  });
});


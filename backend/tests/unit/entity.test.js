const Entity = require('../../src/models/Entity');

describe('Entity Model', () => {
  test('should create entity with valid data', () => {
    const entityData = {
      name: 'Test Entity',
      description: 'Test Description',
      status: 'active',
      metadata: { key: 'value' }
    };

    const entity = new Entity(entityData);
    
    expect(entity.name).toBe('Test Entity');
    expect(entity.description).toBe('Test Description');
    expect(entity.status).toBe('active');
    expect(entity.metadata).toEqual({ key: 'value' });
  });

  test('should validate required fields', () => {
    const entity = new Entity({});
    const validation = entity.validate();
    
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('Name is required');
  });

  test('should validate status field', () => {
    const entity = new Entity({
      name: 'Test',
      status: 'invalid_status'
    });
    const validation = entity.validate();
    
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('Status must be either active or inactive');
  });
});

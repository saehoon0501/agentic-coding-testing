const request = require('supertest');
const app = require('../../src/app');

describe('Entity API', () => {
  describe('GET /api/entities', () => {
    test('should return paginated list of entities', async () => {
      const response = await request(app)
        .get('/api/entities')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.pagination).toHaveProperty('page');
      expect(response.body.pagination).toHaveProperty('limit');
      expect(response.body.pagination).toHaveProperty('total');
      expect(response.body.pagination).toHaveProperty('totalPages');
    });

    test('should support pagination parameters', async () => {
      const response = await request(app)
        .get('/api/entities?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
    });

    test('should support search parameter', async () => {
      const response = await request(app)
        .get('/api/entities?search=sample')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      // All returned entities should match the search term
      response.body.data.forEach(entity => {
        expect(entity.name.toLowerCase()).toContain('sample');
      });
    });
  });

  describe('POST /api/entities', () => {
    test('should create new entity with valid data', async () => {
      const newEntity = {
        name: 'Test Entity',
        description: 'Test description',
        status: 'active'
      };

      const response = await request(app)
        .post('/api/entities')
        .send(newEntity)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newEntity.name);
      expect(response.body.description).toBe(newEntity.description);
      expect(response.body.status).toBe(newEntity.status);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    test('should return 400 for invalid data', async () => {
      const invalidEntity = {
        // Missing required name field
        description: 'Test description'
      };

      const response = await request(app)
        .post('/api/entities')
        .send(invalidEntity)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation Error');
    });
  });

  describe('GET /api/entities/:id', () => {
    test('should return entity by id', async () => {
      // First create an entity
      const newEntity = {
        name: 'Test Entity for Get',
        description: 'Test description',
        status: 'active'
      };

      const createResponse = await request(app)
        .post('/api/entities')
        .send(newEntity)
        .expect(201);

      const entityId = createResponse.body.id;

      // Then get it by id
      const response = await request(app)
        .get(`/api/entities/${entityId}`)
        .expect(200);

      expect(response.body.id).toBe(entityId);
      expect(response.body.name).toBe(newEntity.name);
    });

    test('should return 404 for non-existent entity', async () => {
      const response = await request(app)
        .get('/api/entities/999999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });

  describe('PUT /api/entities/:id', () => {
    test('should update existing entity', async () => {
      // First create an entity
      const newEntity = {
        name: 'Test Entity for Update',
        description: 'Original description',
        status: 'active'
      };

      const createResponse = await request(app)
        .post('/api/entities')
        .send(newEntity)
        .expect(201);

      const entityId = createResponse.body.id;

      // Then update it
      const updateData = {
        name: 'Updated Entity Name',
        description: 'Updated description',
        status: 'inactive'
      };

      const response = await request(app)
        .put(`/api/entities/${entityId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.id).toBe(entityId);
      expect(response.body.name).toBe(updateData.name);
      expect(response.body.description).toBe(updateData.description);
      expect(response.body.status).toBe(updateData.status);
    });

    test('should return 404 for non-existent entity', async () => {
      const updateData = {
        name: 'Updated Name',
        description: 'Updated description'
      };

      const response = await request(app)
        .put('/api/entities/999999')
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });

  describe('DELETE /api/entities/:id', () => {
    test('should delete existing entity', async () => {
      // First create an entity
      const newEntity = {
        name: 'Test Entity for Delete',
        description: 'Test description',
        status: 'active'
      };

      const createResponse = await request(app)
        .post('/api/entities')
        .send(newEntity)
        .expect(201);

      const entityId = createResponse.body.id;

      // Then delete it
      await request(app)
        .delete(`/api/entities/${entityId}`)
        .expect(204);

      // Verify it's gone
      await request(app)
        .get(`/api/entities/${entityId}`)
        .expect(404);
    });

    test('should return 404 for non-existent entity', async () => {
      const response = await request(app)
        .delete('/api/entities/999999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});

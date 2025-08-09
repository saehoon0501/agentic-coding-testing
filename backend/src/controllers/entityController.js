const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');
const { validateEntity, validateEntityUpdate } = require('../middleware/validation');

// GET /api/entities - List all entities with pagination
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await entityService.getAllEntities({ limit, offset });
    
    res.json({
      data: result.entities,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/entities/:id - Get single entity
router.get('/:id', async (req, res, next) => {
  try {
    const entity = await entityService.getEntityById(req.params.id);
    
    if (!entity) {
      const error = new Error('Entity not found');
      error.name = 'NotFoundError';
      throw error;
    }

    res.json({
      data: entity,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/entities - Create new entity
router.post('/', validateEntity, async (req, res, next) => {
  try {
    const entity = await entityService.createEntity(req.body);
    
    res.status(201).json({
      data: entity,
      message: 'Entity created successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/entities/:id - Update entity (full)
router.put('/:id', validateEntity, async (req, res, next) => {
  try {
    const entity = await entityService.updateEntity(req.params.id, req.body);
    
    if (!entity) {
      const error = new Error('Entity not found');
      error.name = 'NotFoundError';
      throw error;
    }

    res.json({
      data: entity,
      message: 'Entity updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/entities/:id - Update entity (partial)
router.patch('/:id', validateEntityUpdate, async (req, res, next) => {
  try {
    const entity = await entityService.updateEntity(req.params.id, req.body, true);
    
    if (!entity) {
      const error = new Error('Entity not found');
      error.name = 'NotFoundError';
      throw error;
    }

    res.json({
      data: entity,
      message: 'Entity updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/entities/:id - Delete entity
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await entityService.deleteEntity(req.params.id);
    
    if (!deleted) {
      const error = new Error('Entity not found');
      error.name = 'NotFoundError';
      throw error;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;


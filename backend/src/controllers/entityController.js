const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');
const { validateEntity, validateEntityUpdate } = require('../middleware/validation');

// GET /api/entities - List all entities with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const entities = await entityService.getEntities({
      page: parseInt(page),
      limit: parseInt(limit),
      search
    });
    res.json(entities);
  } catch (error) {
    next(error);
  }
});

// GET /api/entities/:id - Get single entity
router.get('/:id', async (req, res, next) => {
  try {
    const entity = await entityService.getEntityById(req.params.id);
    if (!entity) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Entity not found',
        timestamp: new Date().toISOString()
      });
    }
    res.json(entity);
  } catch (error) {
    next(error);
  }
});

// POST /api/entities - Create new entity
router.post('/', validateEntity, async (req, res, next) => {
  try {
    const entity = await entityService.createEntity(req.body);
    res.status(201).json(entity);
  } catch (error) {
    next(error);
  }
});

// PUT /api/entities/:id - Update entire entity
router.put('/:id', validateEntity, async (req, res, next) => {
  try {
    const entity = await entityService.updateEntity(req.params.id, req.body);
    if (!entity) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Entity not found',
        timestamp: new Date().toISOString()
      });
    }
    res.json(entity);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/entities/:id - Partial entity update
router.patch('/:id', validateEntityUpdate, async (req, res, next) => {
  try {
    const entity = await entityService.updateEntity(req.params.id, req.body, true);
    if (!entity) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Entity not found',
        timestamp: new Date().toISOString()
      });
    }
    res.json(entity);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/entities/:id - Delete entity
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await entityService.deleteEntity(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Entity not found',
        timestamp: new Date().toISOString()
      });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

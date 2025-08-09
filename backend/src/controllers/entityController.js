const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');
const { validateEntity, validateEntityUpdate } = require('../middleware/validation');
const logger = require('../utils/logger');

// GET /api/entities - List all entities with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      search
    };

    const result = await entityService.getAllEntities(options);
    res.json(result);
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
        message: `Entity with id ${req.params.id} not found`
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
    logger.info(`Entity created with id: ${entity.id}`);
    res.status(201).json(entity);
  } catch (error) {
    next(error);
  }
});

// PUT /api/entities/:id - Update entity (full update)
router.put('/:id', validateEntityUpdate, async (req, res, next) => {
  try {
    const entity = await entityService.updateEntity(req.params.id, req.body);
    if (!entity) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Entity with id ${req.params.id} not found`
      });
    }
    logger.info(`Entity updated with id: ${req.params.id}`);
    res.json(entity);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/entities/:id - Partial update
router.patch('/:id', async (req, res, next) => {
  try {
    const entity = await entityService.partialUpdateEntity(req.params.id, req.body);
    if (!entity) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Entity with id ${req.params.id} not found`
      });
    }
    logger.info(`Entity partially updated with id: ${req.params.id}`);
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
        message: `Entity with id ${req.params.id} not found`
      });
    }
    logger.info(`Entity deleted with id: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const entityService = require("../services/entityService");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class EntityController {
  // Create entity - G3-S4
  async create(req, res, next) {
    try {
      const entity = await entityService.create(req.body);
      logger.info(`Entity created with ID: ${entity.id}`);
      res.status(201).json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all entities with pagination - G3-S5
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;
      const result = await entityService.getAll({
        page: parseInt(page),
        limit: parseInt(limit),
        sort,
        order
      });
      
      res.status(200).json({
        success: true,
        data: result.entities,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: result.total,
          pages: Math.ceil(result.total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get entity by ID - G3-S5
  async getById(req, res, next) {
    try {
      const entity = await entityService.getById(req.params.id);
      if (!entity) {
        throw new AppError("Entity not found", 404);
      }
      
      res.status(200).json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  // Update entity - G3-S6
  async update(req, res, next) {
    try {
      const entity = await entityService.update(req.params.id, req.body);
      if (!entity) {
        throw new AppError("Entity not found", 404);
      }
      
      res.status(200).json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  // Partial update - G3-S6
  async partialUpdate(req, res, next) {
    try {
      const entity = await entityService.partialUpdate(req.params.id, req.body);
      if (!entity) {
        throw new AppError("Entity not found", 404);
      }
      
      res.status(200).json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete entity - G3-S7
  async delete(req, res, next) {
    try {
      const deleted = await entityService.delete(req.params.id);
      if (!deleted) {
        throw new AppError("Entity not found", 404);
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // Search entities - G3-S8
  async search(req, res, next) {
    try {
      const { q, filters, page = 1, limit = 10 } = req.query;
      const result = await entityService.search({
        query: q,
        filters: filters ? JSON.parse(filters) : {},
        page: parseInt(page),
        limit: parseInt(limit)
      });
      
      res.status(200).json({
        success: true,
        data: result.entities,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: result.total,
          pages: Math.ceil(result.total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Bulk create - G3-S9
  async bulkCreate(req, res, next) {
    try {
      const entities = await entityService.bulkCreate(req.body.entities);
      res.status(200).json({
        success: true,
        data: entities,
        count: entities.length
      });
    } catch (error) {
      next(error);
    }
  }

  // Bulk delete - G3-S9
  async bulkDelete(req, res, next) {
    try {
      const { ids } = req.body;
      const deletedCount = await entityService.bulkDelete(ids);
      res.status(200).json({
        success: true,
        deletedCount
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EntityController();

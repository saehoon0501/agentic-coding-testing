const EntityService = require("../services/EntityService");
const { AppError } = require("../middleware/errorHandler");

class EntityController {
  async createEntity(req, res, next) {
    try {
      const entity = await EntityService.createEntity(req.body);
      res.status(201).json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  async getEntity(req, res, next) {
    try {
      const entity = await EntityService.getEntityById(req.params.id);
      res.json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllEntities(req, res, next) {
    try {
      const { page, limit, status, sortBy, sortOrder } = req.query;
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        ...(status && { where: { status } }),
        ...(sortBy && { order: [[sortBy, sortOrder || "ASC"]] })
      };

      const result = await EntityService.getAllEntities(options);
      
      res.json({
        success: true,
        data: result.rows,
        pagination: {
          total: result.count,
          page: options.page,
          limit: options.limit,
          totalPages: Math.ceil(result.count / options.limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEntity(req, res, next) {
    try {
      const entity = await EntityService.updateEntity(req.params.id, req.body);
      res.json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEntity(req, res, next) {
    try {
      const result = await EntityService.deleteEntity(req.params.id);
      res.status(204).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async searchEntities(req, res, next) {
    try {
      const { q, page, limit } = req.query;
      if (!q) {
        return next(new AppError("Search query is required", 400));
      }

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10
      };

      const result = await EntityService.searchEntities(q, options);
      
      res.json({
        success: true,
        data: result.rows,
        pagination: {
          total: result.count,
          page: options.page,
          limit: options.limit,
          totalPages: Math.ceil(result.count / options.limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async bulkCreateEntities(req, res, next) {
    try {
      const entities = await EntityService.bulkCreateEntities(req.body);
      res.status(201).json({
        success: true,
        data: entities
      });
    } catch (error) {
      next(error);
    }
  }

  async bulkDeleteEntities(req, res, next) {
    try {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids)) {
        return next(new AppError("Array of IDs is required", 400));
      }

      const result = await EntityService.bulkDeleteEntities(ids);
      res.json({
        success: true,
        data: { deletedCount: result }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EntityController();

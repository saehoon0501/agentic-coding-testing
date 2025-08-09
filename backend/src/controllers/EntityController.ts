import { Request, Response, NextFunction } from 'express';
import { EntityService } from '../services/EntityService';

export class EntityController {
  private entityService: EntityService;

  constructor() {
    this.entityService = new EntityService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await this.entityService.create(req.body);
      res.status(201).json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entities = await this.entityService.getAll();
      res.json({
        success: true,
        data: entities
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await this.entityService.getById(req.params.id);
      if (!entity) {
        return res.status(404).json({
          success: false,
          error: { message: 'Entity not found' }
        });
      }
      res.json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await this.entityService.update(req.params.id, req.body);
      if (!entity) {
        return res.status(404).json({
          success: false,
          error: { message: 'Entity not found' }
        });
      }
      res.json({
        success: true,
        data: entity
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.entityService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: { message: 'Entity not found' }
        });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

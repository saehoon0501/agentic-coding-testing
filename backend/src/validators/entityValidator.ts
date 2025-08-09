import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const entitySchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().optional().max(1000)
});

export const validateEntity = (req: Request, res: Response, next: NextFunction) => {
  const { error } = entitySchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      }
    });
  }
  
  next();
};

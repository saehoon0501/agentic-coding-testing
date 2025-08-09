const Joi = require('joi');

const entitySchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000).optional(),
  status: Joi.string().valid('active', 'inactive').default('active'),
  metadata: Joi.object().optional()
});

const entityUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(1000).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
  metadata: Joi.object().optional()
});

const validateEntity = (req, res, next) => {
  const { error, value } = entitySchema.validate(req.body);
  
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.name = 'ValidationError';
    return next(validationError);
  }
  
  req.body = value;
  next();
};

const validateEntityUpdate = (req, res, next) => {
  const { error, value } = entityUpdateSchema.validate(req.body);
  
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.name = 'ValidationError';
    return next(validationError);
  }
  
  req.body = value;
  next();
};

module.exports = {
  validateEntity,
  validateEntityUpdate
};


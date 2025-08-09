const Joi = require('joi');

const entitySchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().optional().max(1000),
  status: Joi.string().valid('active', 'inactive').default('active'),
  metadata: Joi.object().optional()
});

const entityUpdateSchema = Joi.object({
  name: Joi.string().optional().min(1).max(255),
  description: Joi.string().optional().max(1000),
  status: Joi.string().valid('active', 'inactive').optional(),
  metadata: Joi.object().optional()
});

const validateEntity = (req, res, next) => {
  const { error, value } = entitySchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      message: error.details[0].message,
      details: error.details
    });
  }
  
  req.body = value;
  next();
};

const validateEntityUpdate = (req, res, next) => {
  const { error, value } = entityUpdateSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      message: error.details[0].message,
      details: error.details
    });
  }
  
  req.body = value;
  next();
};

module.exports = {
  validateEntity,
  validateEntityUpdate
};

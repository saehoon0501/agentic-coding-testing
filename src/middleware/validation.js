const Joi = require("joi");

const entitySchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid("active", "inactive", "pending").default("active"),
  metadata: Joi.object().default({})
});

const validateEntity = (req, res, next) => {
  const { error, value } = entitySchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: error.details.map(detail => ({
        field: detail.path.join("."),
        message: detail.message
      }))
    });
  }
  
  req.body = value;
  next();
};

module.exports = { validateEntity, entitySchema };

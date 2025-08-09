const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const correlationId = req.correlationId || 'unknown';
  
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    correlationId,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource Not Found';
  }

  res.status(statusCode).json({
    error: message,
    message: err.message,
    correlationId,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;


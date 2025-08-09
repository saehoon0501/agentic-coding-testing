const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Generate correlation ID for error tracking
  const correlationId = req.headers['x-correlation-id'] || `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Log error with correlation ID
  logger.error('Error occurred', {
    correlationId,
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
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
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Not Found';
  } else if (err.name === 'ConflictError') {
    statusCode = 409;
    message = 'Conflict';
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
    message: err.message || message,
    correlationId,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;

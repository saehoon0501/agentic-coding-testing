const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  req.correlationId = uuidv4();

  // Log request
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    correlationId: req.correlationId,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      correlationId: req.correlationId
    });
  });

  next();
};

module.exports = requestLogger;


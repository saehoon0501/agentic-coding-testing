const logger = require('../utils/logger');

const getHealth = (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  };

  logger.info('Health check requested', healthData);
  res.status(200).json(healthData);
};

module.exports = {
  getHealth
};

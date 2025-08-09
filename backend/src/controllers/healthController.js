const getHealth = (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    memory: process.memoryUsage(),
    responseTime: Date.now() - req.startTime
  };

  res.status(200).json(healthData);
};

module.exports = {
  getHealth
};

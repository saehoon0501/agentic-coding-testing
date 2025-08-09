const express = require("express");
const router = express.Router();

// Health check endpoint - G1-S3
router.get("/", (req, res) => {
  const healthCheck = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "0.1.0",
    environment: process.env.NODE_ENV || "development",
    memory: process.memoryUsage(),
    pid: process.pid
  };

  res.status(200).json(healthCheck);
});

module.exports = router;

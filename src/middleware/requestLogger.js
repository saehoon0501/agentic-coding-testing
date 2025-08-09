const { v4: uuidv4 } = require("uuid");

const requestLogger = (req, res, next) => {
  req.correlationId = uuidv4();
  req.startTime = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - req.startTime;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms [${req.correlationId}]`);
  });
  
  next();
};

module.exports = requestLogger;

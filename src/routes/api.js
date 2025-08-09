const express = require("express");
const router = express.Router();

// Import route modules
const entityRoutes = require("./entities");

// API versioning
router.use("/v1/entities", entityRoutes);

// API documentation route
router.get("/docs", (req, res) => {
  res.json({
    message: "API Documentation",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      entities: {
        create: "POST /api/v1/entities",
        list: "GET /api/v1/entities",
        get: "GET /api/v1/entities/:id",
        update: "PUT /api/v1/entities/:id",
        patch: "PATCH /api/v1/entities/:id",
        delete: "DELETE /api/v1/entities/:id",
        search: "GET /api/v1/entities/search",
        bulk: "POST /api/v1/entities/bulk"
      }
    }
  });
});

module.exports = router;

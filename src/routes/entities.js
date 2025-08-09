const express = require("express");
const router = express.Router();
const entityController = require("../controllers/entityController");
const { validateEntity } = require("../middleware/validation");

// CRUD Operations - G3 Implementation

// Create entity - G3-S4
router.post("/", validateEntity, entityController.create);

// Read operations - G3-S5
router.get("/", entityController.getAll);
router.get("/:id", entityController.getById);

// Update operations - G3-S6
router.put("/:id", validateEntity, entityController.update);
router.patch("/:id", entityController.partialUpdate);

// Delete operation - G3-S7
router.delete("/:id", entityController.delete);

// Search and filter - G3-S8
router.get("/search", entityController.search);

// Bulk operations - G3-S9
router.post("/bulk", entityController.bulkCreate);
router.delete("/bulk", entityController.bulkDelete);

module.exports = router;

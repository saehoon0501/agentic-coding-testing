const express = require("express");
const router = express.Router();
const EntityController = require("../controllers/EntityController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Entities
 *   description: Entity management endpoints
 */

/**
 * @swagger
 * /api/entities:
 *   post:
 *     summary: Create a new entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Entity"
 *     responses:
 *       201:
 *         description: Entity created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, EntityController.createEntity);

/**
 * @swagger
 * /api/entities:
 *   get:
 *     summary: Get all entities with pagination
 *     tags: [Entities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, pending]
 *     responses:
 *       200:
 *         description: List of entities
 */
router.get("/", EntityController.getAllEntities);

/**
 * @swagger
 * /api/entities/search:
 *   get:
 *     summary: Search entities by name or description
 *     tags: [Entities]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Search query required
 */
router.get("/search", EntityController.searchEntities);

/**
 * @swagger
 * /api/entities/bulk:
 *   post:
 *     summary: Create multiple entities
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/Entity"
 *     responses:
 *       201:
 *         description: Entities created successfully
 */
router.post("/bulk", auth, EntityController.bulkCreateEntities);

/**
 * @swagger
 * /api/entities/bulk:
 *   delete:
 *     summary: Delete multiple entities
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Entities deleted successfully
 */
router.delete("/bulk", auth, EntityController.bulkDeleteEntities);

/**
 * @swagger
 * /api/entities/{id}:
 *   get:
 *     summary: Get entity by ID
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Entity details
 *       404:
 *         description: Entity not found
 */
router.get("/:id", EntityController.getEntity);

/**
 * @swagger
 * /api/entities/{id}:
 *   put:
 *     summary: Update entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Entity"
 *     responses:
 *       200:
 *         description: Entity updated successfully
 *       404:
 *         description: Entity not found
 */
router.put("/:id", auth, EntityController.updateEntity);

/**
 * @swagger
 * /api/entities/{id}:
 *   patch:
 *     summary: Partially update entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Entity"
 *     responses:
 *       200:
 *         description: Entity updated successfully
 *       404:
 *         description: Entity not found
 */
router.patch("/:id", auth, EntityController.updateEntity);

/**
 * @swagger
 * /api/entities/{id}:
 *   delete:
 *     summary: Delete entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Entity deleted successfully
 *       404:
 *         description: Entity not found
 */
router.delete("/:id", auth, EntityController.deleteEntity);

module.exports = router;

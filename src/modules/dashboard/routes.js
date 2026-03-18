const express = require("express");
const router = express.Router();
const dC = require("./controller");

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", dC.getDashboard);

module.exports = router;

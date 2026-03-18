const express = require("express")
const router = express.Router()

const aC = require("./controller")
const aV = require("./validator/validator")
const validate = require("../../../middleware/validate")

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register", aV.regisValidator, validate, aC.regisCred)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login success
 */
router.post("/login", aV.loginValidator, aC.loginCred)

module.exports = router
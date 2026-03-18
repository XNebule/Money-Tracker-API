const express = require("express")
const router = express.Router()
const cC = require("./controller")
const cV = require("./validator/validator")

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', cV.createValidator, cC.createCat)

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', cC.getCats)

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', cV.updateValidator, cC.updateCat)

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', cC.deleteCat)

module.exports = router
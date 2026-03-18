const express = require('express')
const router = express.Router()
const aC = require("./controller")

/**
 * @swagger
 * /analytic/cashflow:
 *   get:
 *     summary: Get total revenue vs expense
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
router.get('/cashflow', aC.getCashflow)

/**
 * @swagger
 * /analytic/monthly-expenses:
 *   get:
 *     summary: Monthly expense trend
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
router.get('/monthly-expense', aC.getMonthExpenses)

/**
 * @swagger
 * /analytic/category-breakdown:
 *   get:
 *     summary: Expense breakdown by category
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
router.get('/category-breakdown', aC.getCatBreakdown)

/**
 * @swagger
 * /analytic/insights:
 *   get:
 *     summary: Financial insights
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
router.get('/insight', aC.getInsights)

module.exports = router
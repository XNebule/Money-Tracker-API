const express = require('express')
const router = express.Router()
const aC = require("./controller")

router.get('/cashflow', aC.getCashflow)
router.get('/monthly-expense', aC.getMonthExpenses)
router.get('/category-breakdown', aC.getCatBreakdown)
router.get('/insight', aC.getInsights)

module.exports = router
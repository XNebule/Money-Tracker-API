const express = require("express")
const router = express.Router()
const tC = require("./controller")
const tV = require("./validator/validator")

router.post("/", tV.createTransactionValidator, tC.createTransaction)
router.get("/", tC.getTransactions)
router.put("/:id", tC.updateTransaction)
router.delete("/:id", tC.deleteTransaction)

module.exports = router
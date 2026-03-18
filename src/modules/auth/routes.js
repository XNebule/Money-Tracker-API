const express = require("express")
const router = express.Router()

const aC = require("./controller")
const aV = require("./validator/validator")
const validate = require("../../../middleware/validate")

router.post("/register", aV.regisValidator, validate, aC.regisCred)
router.post("/login", aV.loginValidator, aC.loginCred)

module.exports = router
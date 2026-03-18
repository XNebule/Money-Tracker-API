const express = require("express")
const router = express.Router()
const cC = require("./controller")
const cV = require("./validator/validator")

router.post('/', cV.createValidator, cC.createCat)
router.get('/', cC.getCats)
router.put('/:id', cV.updateValidator, cC.updateCat)
router.delete('/:id', cC.deleteCat)

module.exports = router
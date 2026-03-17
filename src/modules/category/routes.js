const express = require("express")
const router = express.Router()
const cC = require("./controller")

router.post('/', cC.createCat)
router.get('/', cC.getCats)
router.put('/:id', cC.updateCat)
router.delete('/:id', cC.deleteCat)

module.exports = router
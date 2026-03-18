const { body } = require("express-validator")

const aV = [
    body("email").isEmail().withMessage("Invalid email format!"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
]

exports.regisValidator = aV
exports.loginValidator = aV
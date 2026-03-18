const { body } = require("express-validator");

const cV = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be at least 2 characters"),
];

exports.createValidator = cV
exports.updateValidator = cV

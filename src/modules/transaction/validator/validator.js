const { body } = require("express-validator");

const tV = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("amount")
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive integer"),

  body("type")
    .isIn(["expense", "revenue"])
    .withMessage("Type must be expense or revenue"),

  body("categoryId")
    .optional()
    .isInt()
    .withMessage("Category must be a valid ID"),

  body("date").optional().isISO8601().withMessage("Invalid date format"),
];

exports.createTransactionValidator = tV;
exports.updateTransactionValidator = tV;

const { query } = require("express-validator");

const validateQueryId = [
  query("id")
    .exists()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("ID must be a valid MongoDB ObjectId"),
];
module.exports = { validateQueryId };

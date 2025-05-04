const { check } = require("express-validator");
const proposalSubmitValidator = [
  check("proposalText")
    .not()
    .isEmpty()
    .withMessage("Proposal text is required"),
  check("proposalfile")
    .not()
    .isEmpty()
    .withMessage("Proposal file is required"),
  check("uploadFile").not().isEmpty().withMessage("Upload file is required"),
  check("testing").not().isEmpty().withMessage("Testing is required"),
  check("financialProposal")
    .not()
    .isEmpty()
    .withMessage("Financial proposal is required"),
];
module.exports = { proposalSubmitValidator };

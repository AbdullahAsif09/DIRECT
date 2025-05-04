const express = require("express");
const USER = require("../controllers/user");
const router = express.Router();
const userAgencyController = new USER();
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { InvalidRoute } = require("../helper/InvalidRoute");

router
  .route("/uploadusr")
  .post(checkIfAuthenticated, userAgencyController.uploadusr)
  .all(InvalidRoute);
router
  .route("/getfiles")
  .get(checkIfAuthenticated, userAgencyController.getfiles)
  .all(InvalidRoute);
router
  .route("/getProjects")
  .get(checkIfAuthenticated, userAgencyController.getProjects)
  .all(InvalidRoute);
router
  .route("/getProject")
  .get(checkIfAuthenticated, userAgencyController.getProject)
  .all(InvalidRoute);
router
  .route("/getProjectProposals")
  .get(checkIfAuthenticated, userAgencyController.getProjectProposals)
  .all(InvalidRoute);
router
  .route("/getProposalsForAgency")
  .post(userAgencyController.getProposalsForAgency)
  .all(InvalidRoute);

exports.routes = router;

const path = require("path");
const express = require("express");
const JWT = require("jsonwebtoken");
const { sendOTP } = require("../common/email");
const proposal = require("../modals/proposal");
const projects = require("../modals/projects");
const feedback = require("../modals/feedback");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const fundingAgency = require("../modals/fundingAgency");
const FundingAgencyController = require("../controllers/fundingAgency");
const router = express.Router();
const fundingAgencyController = new FundingAgencyController(
  proposal,
  projects,
  feedback,
  fundingAgency,
  path,
  JWT,
  JWT_SECRET_KEY
);

router.post(
  "/create",
  fundingAgencyController.createFundingAgency.bind(fundingAgencyController)
);
router.get(
  "/verify",
  fundingAgencyController.verify.bind(fundingAgencyController)
);
router.post(
  "/login",
  fundingAgencyController.login.bind(fundingAgencyController)
);
router.get(
  "/getAllUsers",
  fundingAgencyController.getAllUsers.bind(fundingAgencyController)
);
router.post(
  "/getProjects",
  fundingAgencyController.getProjects.bind(fundingAgencyController)
);
router.post(
  "/getProject",
  fundingAgencyController.getProject.bind(fundingAgencyController)
);
// router.all("*", (req, res) =>
//   res.status(404).json({ type: "failure", result: "Invalid Route" })
// );

exports.routes = router;

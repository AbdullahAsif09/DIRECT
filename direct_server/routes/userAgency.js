const path = require("path");
const express = require("express");
const JWT = require("jsonwebtoken");
const { sendOTP } = require("../common/email");
const proposal = require("../modals/proposal");
const projects = require("../modals/projects");
const feedback = require("../modals/feedback");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userAgency = require("../modals/userAgency");
const UserAgencyController = require("../controllers/userAgency");
const router = express.Router();
const userAgencyController = new UserAgencyController(
  proposal,
  projects,
  feedback,
  userAgency,
  path,
  JWT,
  JWT_SECRET_KEY
);

router.post(
  "/create",
  userAgencyController.createUserAgency.bind(userAgencyController)
);
router.get("/verify", userAgencyController.verify.bind(userAgencyController));
router.post(
  "/login",
  userAgencyController.getUserAgency.bind(userAgencyController)
);
router.get(
  "/getAllUsers",
  userAgencyController.getAllUsers.bind(userAgencyController)
);
router.post(
  "/uploadusr",
  userAgencyController.uploadusr.bind(userAgencyController)
);
router.post(
  "/getProjects",
  userAgencyController.getProjects.bind(userAgencyController)
);
router.post(
  "/getProject",
  userAgencyController.getProject.bind(userAgencyController)
);
// router
//   .route("/uploadusr")
//   .post(checkIfAuthenticated, userAgencyController.uploadusr);
exports.routes = router;

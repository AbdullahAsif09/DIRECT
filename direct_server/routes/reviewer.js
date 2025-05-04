const express = require("express");
const admin = require("../modals/admin/admin");
const fundingAgency = require("../modals/fundingAgency");
const userAgency = require("../modals/userAgency");
const project = require("../modals/projects");
const { industry, academia } = require("../modals");
const proposal = require("../modals/proposal");
const reviewer = require("../modals/reviewer");
const mongoose = require("mongoose");
const { ReviewerController } = require("../controllers/reviewer");
const router = express.Router();
const reviewerController = new ReviewerController(
  admin,
  industry,
  academia,
  proposal,
  project,
  reviewer,
  mongoose,
  userAgency,
  fundingAgency
);

router.get("/findAll", reviewerController.findAll.bind(reviewerController));
router.post(
  "/findAllProposals",
  reviewerController.findAllProposals.bind(reviewerController)
);
router.post(
  "/findProjectProposals",
  reviewerController.findProjectProposals.bind(reviewerController)
);
router.post(
  "/verifyUser",
  reviewerController.verifyReviewer.bind(reviewerController)
);
// router.get("/findAll", findAll);

exports.routes = router;

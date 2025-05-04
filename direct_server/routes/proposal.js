const express = require("express");
const mongoose = require("mongoose");
const projects = require("../modals/projects");
const proposal = require("../modals/proposal");
const milesstones = require("../modals/milestones");
const fs = require("fs");
const ProposalController = require("../controllers/proposal");
const proposalMulter = require("../middlewares/proposalMulter");
const { validateQueryId } = require("../helper/validdateQueryId");
const validationHandler = require("../helper/validationHandler");
const proposalAssignment = require("../modals/proposalAssignment");
const {
  proposalSubmitValidator,
} = require("../helper/proposalSubmitValidator");
const { setPropsoalId } = require("../controllers/SetProposalId");
const { getProjectId } = require("../controllers/getProjectId");
const {
  uploadAwardedContract,
  uploadFinalContract,
} = require("../middlewares/projectMulter");
const router = express.Router();
const proposalController = new ProposalController(
  proposal,
  projects,
  proposalAssignment,
  mongoose,
  fs,
  milesstones
);

router.post("/addProposal", proposalController.create.bind(proposalController));
router.post(
  "/getProposal",
  proposalController.getProposal.bind(proposalController)
);
router.post(
  "/getProposalForFeedback",
  proposalController.getProposalForFeedback.bind(proposalController)
);
router.get(
  "/getProposalValues",
  validateQueryId,
  validationHandler,
  proposalController.getProposalValues.bind(proposalController)
);
router.get(
  "/getProposalInfo",
  validateQueryId,
  validationHandler,
  proposalController.getProposalInfo.bind(proposalController)
);
router.post(
  "/submitProposal",
  setPropsoalId.bind(setPropsoalId),
  proposalMulter.uploadMultiDocs.fields([{ name: "document" }]),
  proposalController.submitProposal.bind(proposalController)
);
router.patch(
  "/reSubmitProposal",
  proposalController.reSubmitProposal.bind(proposalController)
);
router.post(
  "/getProposalForReview",
  proposalController.getProposalForReview.bind(proposalController)
);
router.post(
  "/assignProposalToReviewer",
  proposalController.assignProposalToReviewer.bind(proposalController)
);
router.get(
  "/getProjectInfoForReviewer",
  proposalController.getProjectInfoForReviewer.bind(proposalController)
);
router.post(
  "/findAllProposalsForReviewer",
  proposalController.findAllProposalsForReviewer.bind(proposalController)
);
router.patch(
  "/sendToAgency",
  proposalController.sendToAgency.bind(proposalController)
);
router.post(
  "/findAcceptedProposalsForAcademiaIndusrty",
  proposalController.findAcceptedProposalsForAcademiaIndusrty.bind(
    proposalController
  )
);
router.patch(
  "/uploadAwardedContract",
  getProjectId,
  uploadAwardedContract.single("document"),
  proposalController.uploadAwardedContract.bind(proposalController)
);
router.patch(
  "/uploadFinalContract",
  getProjectId,
  uploadFinalContract.single("document"),
  proposalController.uploadFinalContract.bind(proposalController)
);

exports.routes = router;

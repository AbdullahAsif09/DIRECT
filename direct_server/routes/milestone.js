const express = require("express");
const mongoose = require("mongoose");
const projects = require("../modals/projects");
const proposal = require("../modals/proposal");
const milesstones = require("../modals/milestones");
const fs = require("fs");
const MilestoneController = require("../controllers/milestone");
const proposalAssignment = require("../modals/proposalAssignment");
const { milestonemulter } = require("../middlewares/multermilestone");
const router = express.Router();

const milestoneController = new MilestoneController(
  proposal,
  projects,
  proposalAssignment,
  mongoose,
  fs,
  milesstones
);

router.post(
  "/getMilestone",
  milestoneController.getMilestone.bind(milestoneController)
);
router.patch(
  "/updateSingleMilestone",
  milestonemulter.array("files"),
  milestoneController.updateSingleMilestone.bind(milestoneController)
);
router.post(
  "/acceptChangesInSingleMilestone",
  milestoneController.acceptChangesInSingleMilestone.bind(milestoneController)
);
router.post(
  "/rejectChangesInSingleMilestone",
  milestoneController.rejectChangesInSingleMilestone.bind(milestoneController)
);
router.post(
  "/getSingleMilestone",
  milestoneController.getSingleMilestone.bind(milestoneController)
);
router.post(
  "/getFilesofSingleMilestone",
  milestoneController.getFilesofSingleMilestone.bind(milestoneController)
);

exports.routes = router;

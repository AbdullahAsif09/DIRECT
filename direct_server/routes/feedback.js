const express = require("express");
const FeedBackController = require("../controllers/feedback");
const proposal = require("../modals/proposal");
const projects = require("../modals/projects");
const feedback = require("../modals/feedback");
const feedbackDetail = require("../modals/feedbackDetail");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const feedBackController = new FeedBackController(
  proposal,
  projects,
  feedback,
  feedbackDetail,
  mongoose
);

router.post(
  "/submitFeedbackDetails",
  feedBackController.createFeedbackDetails.bind(feedBackController)
);
router.post(
  "/createFeedback",
  feedBackController.createFeedback.bind(feedBackController)
);
router.post(
  "/getFeedback",
  feedBackController.getFeedback.bind(feedBackController)
);
 
exports.routes = router;

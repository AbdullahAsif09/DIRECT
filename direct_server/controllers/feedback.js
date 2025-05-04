class feedBackController {
  constructor(proposal, projects, feedback, feedbackDetail, mongoose) {
    this.proposalModel = proposal;
    this.projectsModel = projects;
    this.feedbackModel = feedback;
    this.feedbackDetailModel = feedbackDetail;
    this.mongooseModel = mongoose;
  }

  async createFeedbackDetails(req, res) {
    try {
      const {
        feedbackText,
        feedbackFiles,
        feedbackMilestone,
        feedbackBy,
        // proposalFile,
        // uploadFile,
        // financialProposal,
        // testing,
        // feedbackBy,
      } = req.body;

      if (!feedbackBy) {
        return res.status(400).json({ message: "Invalid data" });
      }
      const feedbackCreated = await this.feedbackDetailModel.create({
        feedbackText: JSON.parse(feedbackText),
        feedbackFiles: JSON.parse(feedbackFiles),
        feedbackMilestone: {
          milestone: JSON.parse(feedbackMilestone?.milestone),
          milestoneFeedback: JSON.parse(feedbackMilestone?.milestoneFeedback),
        },
        feedbackBy,
      });
      res.status(200).json({
        message: "success",
        result: feedbackCreated?._id,
        type: "success",
      });
    } catch (error) {
      return res.json({
        message: "Failed to create feedback details",
        type: "error",
      });
      console.log(error);
    }
  }
  async createFeedback(req, res) {
    try {
      const {
        feedbackDetails,
        feedbackSentTo,
        feedbackBy,
        proposalID,
        summary,
        rating,
        inDraft,
      } = req.body;
      console.log(req.body);
      if (!feedbackBy || !proposalID || !summary || !rating) {
        return res.status(400).json({ message: "Invalid data in ID" });
      }
      const feedbackCreated = await this.feedbackModel.create({
        feedbackDetails,
        feedbackSentTo,
        proposalID,
        feedbackBy,
        summary,
        rating,
        inDraft,
      });
      if (!feedbackCreated) {
        return res.status(400).json({ message: "Invalid data" });
      }
      if (feedbackCreated?._id) {
        console.log(feedbackCreated?._id);
        const updatedProposal = await this.proposalModel.findOneAndUpdate(
          { _id: proposalID, "assignedTo.reviewerID.id": feedbackBy?.id },
          {
            $set: {
              reviewByReviewer: true,
              "assignedTo.$.feedBackId": feedbackCreated?._id,
            },
          },
          { new: true }
        );
        if (!updatedProposal) {
          return res.status(400).json({ message: "Invalid data" });
        }
        return res.status(200).json({
          message: "success",
          result: updatedProposal,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getFeedback(req, res) {
    try {
      const { feedbackID } = req.body;
      if (!feedbackID) {
        return res.status(400).json({ message: "Invalid data" });
      }
      const feedback = await this.feedbackModel
        .findById(feedbackID)
        .populate("proposalID", "projectID proposalfile")
        .populate("feedbackDetails");
      if (!feedback) {
        return res.status(400).json({ message: "Invalid data" });
      }
      return res.status(200).json({ message: "success", result: feedback });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = feedBackController;

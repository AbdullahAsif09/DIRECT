const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FeedbackDetailSchema = new Schema(
  {
    feedbackText: { type: Object, trim: true },
    feedbackFiles: { type: Object, trim: true },
    feedbackMilestone: { type: Object, trim: true },
    uploadFile: { type: Object, trim: true },
    financialProposal: { type: Object, trim: true },
    testing: { type: Object, trim: true },
    feedbackBy: { type: Schema.Types.ObjectId, ref: "reviewer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedbackDetail", FeedbackDetailSchema);

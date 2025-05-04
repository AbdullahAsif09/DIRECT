const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema(
  {
    feedbackDetails: { type: Schema.Types.ObjectId, ref: "feedbackDetail" },
    feedbackBy: {
      id: {
        type: Schema.Types.ObjectId,
        refPath: "feedbackBy.model",
      },
      model: {
        type: String,
        required: true,
        enum: ["industry", "academia", "admin", "fundingagency", "useragency"],
      },
    },
    proposalID: { type: Schema.Types.ObjectId, ref: "proposal" },
    projectID: { type: Schema.Types.ObjectId, ref: "projects" },
    feedbackSentTo: {
      type: String,
      enum: ["admin", "users", "both", "none"],
      default: "none",
    },
    summary: String,
    rating: Number,
    inDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);

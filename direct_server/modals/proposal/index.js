const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProposalSchema = new Schema(
  {
    id: { type: String },
    projectID: { type: Schema.Types.ObjectId, ref: "projects" },
    submittedBy: {
      id: {
        type: Schema.Types.ObjectId,
        refPath: "submittedBy.model",
      },
      model: {
        type: String,
        required: true,
        enum: ["industry", "academia"],
      },
    },
    assignedTo: [
      {
        reviewerID: {
          id: {
            type: Schema.Types.ObjectId,
            refPath: "assignedTo.reviewerID.model",
          },
          model: {
            type: String,
            enum: [
              "industry",
              "academia",
              "admin",
              "users",
              "userAgency",
              "fundingAgency",
            ],
          },
        },
        submissionDate: {
          type: Date,
        },
        feedBackId: {
          type: Schema.Types.ObjectId,
          ref: "feedback",
        },
      },
    ],
    proposalText: Object,
    oldProposalText: Object,
    proposalfile: Object,
    oldProposalfile: Object,
    uploadFile: Object,
    testing: Object,
    financialProposal: Array,
    Rating: Number,
    totalAmount: Number,
    review: String,
    sendToAgency: { type: Boolean, default: false },
    chosenByAgency: { type: Boolean, default: false },
    awardedDocs: { type: Object },
    contractedDocs: { type: Object },
    reviewByReviewer: { type: Boolean, default: false },
    resendToSubmittor: { type: Boolean, default: false },
    reqChangesRemarks: String,
    feedback: { type: Schema.Types.ObjectId, ref: "feedback" },
    usrBy: { type: Schema.Types.ObjectId, ref: "users" },
    milestones: { type: Schema.Types.ObjectId, ref: "milestones" },
    oldMilestones: { type: Schema.Types.ObjectId, ref: "milestones" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("proposal", ProposalSchema);

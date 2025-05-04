const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
    },
    proposalId: {
      type: Schema.Types.ObjectId,
      ref: "proposal",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
    submissionDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("proposalAssignment", assignmentSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const milestoneSchema = new Schema(
  {
    details: [
      {
        title: String,
        duration: Number,
        cost: Number,
        progress: { type: Number, default: 0 },
        description: String,
        files: [Object],
      },
    ],
    newDetails: [
      {
        title: String,
        duration: Number,
        milestoneIndex: Number,
        cost: Number,
        progress: { type: Number, default: 0 },
        description: String,
        inReview: { type: Boolean, default: true },
        rejectionReason: { type: String },
        files: [Object],
      },
    ],
    startDate: Date,
    endDate: Date,
    progress: { type: Number, default: 0 },
    totalBudget: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("milestones", milestoneSchema);

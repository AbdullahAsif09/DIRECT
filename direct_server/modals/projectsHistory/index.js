const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectsHistorySchema = new Schema(
  {
    projectID: { type: Schema.Types.ObjectId, ref: "projects" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "subAdmin" },
    changes: Object,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projectsHistory", ProjectsHistorySchema);
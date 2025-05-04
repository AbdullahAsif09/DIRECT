const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectsSchema = new Schema(
  {
    id: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    image: Array,
    testing: Array,
    uploadFile: Array,
    proposalText: Array,
    proposalfile: Array,
    financialProposal: Array,
    fieldsForProposalDocs: Array,
    category: String,
    fireHazard: String,
    objectives: String,
    description: String,
    references: String,
    department: { type: Schema.Types.ObjectId, ref: "departments" },
    organization: { type: Schema.Types.ObjectId, ref: "organizations" },
    methodology: String,
    deliverables: String,
    specOfProduct: String,
    fundingScheme: String,
    physicalAspect: String,
    logisticAspect: String,
    initiatorDetails: String,
    applicationField: String,
    researchSubDomain: String,
    performanceAspect: String,
    enviromentalAspect: String,
    compatibilityAspect: String,
    visibleToUserIds: [
      {
        id: {
          type: Schema.Types.ObjectId,
          refPath: "visibleToUserIds.model",
          required: true,
        },
        model: {
          type: String,
          required: true,
          enum: ["industry", "academia"],
        },
        submissionDate: Date,
      },
    ],
    finalProposalsChosenByAgency: [
      {
        type: Schema.Types.ObjectId,
        ref: "proposal",
      },
    ],
    initialProposalsChosenByAgency: [
      {
        type: Schema.Types.ObjectId,
        ref: "proposal",
      },
    ],
    projectAssignedTo: { type: Schema.Types.ObjectId, ref: "proposal" },
    ongoing: {
      type: Schema.Types.Mixed,
      default: false,
    },
    proposalsAmount: {
      type: Number,
      default: 0,
    },
    availableForProposals: {
      type: Boolean,
      default: false,
    },
    inDraft: {
      type: Boolean,
      default: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    classified: {
      type: Boolean,
      default: true,
    },
    upDatedBy: Array,
    history: { type: Schema.Types.ObjectId, ref: "projectsHistory" },
    milestones: [{ type: Schema.Types.ObjectId, ref: "milestones" }],
    userAgency: [{ type: Schema.Types.ObjectId, ref: "userAgency" }],
    usrBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
    fundingAgency: [{ type: Schema.Types.ObjectId, ref: "fundingAgency" }],
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "admin" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", ProjectsSchema);

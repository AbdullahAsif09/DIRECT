const mongoose = require("mongoose");
const { roles } = require("../../constants/rooms");

const Schema = mongoose.Schema;

const AcademiaSchema = new Schema(
  {
    category: [String],
    role: [{ type: String, default: roles.academia[0] }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    profileComplete: false,
    name: { type: String },
    description: { type: String },
    telephone: { type: String },
    currentUniversity: { type: String },
    designation: { type: String },
    image: { type: String },
    department: { type: String },
    categories: { type: Array },

    // arrays
    qualificationSection: { type: Array },
    experienceSection: { type: Array },
    university: { type: Array },
    awardsSection: { type: Array },
    scopusSection: { type: Array },
    socialMediaSection: { type: Array },
    membershipSection: { type: Array },
    researchProjectsSection: { type: Array },
    industrialProjectsSection: { type: Array },
    researchArticlesSection: { type: Array },
    conferenceSection: { type: Array },
    bookChapSection: { type: Array },
    bookSection: { type: Array },
    editorialSection: { type: Array },
    patentsSection: { type: Array },
    copyRightsSection: { type: Array },
    industrialDesignsSection: { type: Array },
    technologyTransferedSection: { type: Array },
    attendedSection: { type: Array },
    organizedSection: { type: Array },
    phdSection: { type: Array },
    mastersSection: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("academia", AcademiaSchema);

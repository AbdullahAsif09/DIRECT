const mongoose = require("mongoose");
const { roles } = require("../../constants/rooms");

const Schema = mongoose.Schema;

const IndustrySchema = new Schema(
  {
    role: [{ type: String, default: roles.industry[0] }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    categories: { type: Array },
    profileComplete: false,
    name: { type: String },
    registrationNo: { type: String },
    registrationDate: { type: String },
    taxId: { type: String },
    image: { type: String },
    businessType: { type: String },
    industryType: { type: String },
    address: { type: String },
    industrySpecialization: { type: String },
    description: { type: String },
    buissnessType: { type: String },
    partnerFirm: { type: Array },
    localBank: { type: Array },
    foreignBank: { type: Array },
    registerWithGov: { type: Array },
    pastContract: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("industry", IndustrySchema);

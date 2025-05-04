const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { roles } = require("../../constants/rooms");
const FundingAgencySchema = new Schema(
  {
    otp: { type: String },
    type: { type: String },
    expireTime: { type: Date },
    verify: { type: Boolean, default: false },
    password: { type: String, required: true },
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "projects" }],
    role: [{ type: String, default: roles.fundingagency[0] }],
    image: { type: String },
  },
  { timestamps: true }
);
FundingAgencySchema.statics.CreateHash = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

FundingAgencySchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};
module.exports = mongoose.model("fundingAgency", FundingAgencySchema);

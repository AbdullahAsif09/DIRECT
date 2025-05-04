const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { roles } = require("../../constants/rooms");
const { accessRoles } = require("../../constants/roles");

const ExectiveSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true, required: true },
    password: { type: String },
    temporarycodeOTP: {
      code: { type: String },
      expireTime: { type: Date },
      attempts: { type: Number },
    },
    verification: {
      verified: { type: Boolean, default: false },
      tokenUsed: { type: Boolean, default: false },
      token: { type: String },
    },
    organization: { type: Schema.Types.ObjectId, ref: "organizations" },
    department: { type: Schema.Types.ObjectId, ref: "departments" },
    role: {
      type: [
        {
          type: String,
          enum: roles.executive,
        },
      ],
      default: [accessRoles.executive.executive],
    },
    image: { type: String },
  },
  { timestamps: true }
);

ExectiveSchema.statics.CreateHash = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

ExectiveSchema.statics.isPasswordEqual = async (password, passwordFromDatabase) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("executive", ExectiveSchema);

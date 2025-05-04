const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const enums = [
  "industry",
  "academia",
  "userAgency",
  "fundingAgency",
  "admin",
  "users",
  "departmentMembers",
  "organizationAdmin",
];
const memberSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "model", // Reference path for dynamic population
    },
    model: {
      type: String,
      required: true,
      enum: enums,
    },
    chatId: {
      type: Types.ObjectId,
      required: true,
      ref: "chat",
    },
    status: {
      type: String,
      required: true,
      enum: ["joined", "request"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Member || model("Member", memberSchema);

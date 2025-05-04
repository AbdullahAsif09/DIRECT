const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RolesSchema = new Schema(
  {
    roleName: { type: String },
    adminRole: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roles", RolesSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const baseAccount = require("../baseuser");

const UserSchema = new Schema(
  {
    account: baseAccount,
    role: { type: [String], default: ["users"] },
    industry: { type: Schema.Types.ObjectId, ref: "industry" },
    academia: { type: Schema.Types.ObjectId, ref: "academia" },
    image: { type: String },
  },
  { timestamps: true }
);

// Static method to compare passwords
UserSchema.statics.comparePassword = async function (
  password,
  passwordFromDatabase
) {
  return await bcrypt.compare(password, passwordFromDatabase);
};

// Pre-save middleware to hash the password
UserSchema.pre("save", async function (next) {
  if (this.isModified("account.password") || this.isNew) {
    this.account.password = await bcrypt.hash(this.account.password, 10);
  }
  next();
});

module.exports = mongoose.model("users", UserSchema);

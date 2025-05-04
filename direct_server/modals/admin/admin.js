const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { roles } = require("../../constants/rooms");

const AdminSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    firstName: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    password: { type: String },
    verify: { type: Boolean, default: false },
    otp: { type: String },
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
    expireTime: { type: Date },
    profileComplete: false,
    role: {
      type: [
        {
          type: String,
          enum: roles.admin,
        },
      ],
      default: ["subadmin"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

AdminSchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("admin", AdminSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const token = {
  tokenUsed: { type: Boolean, default: false },
  token: { type: String },
};

const OTPSchema = {
  number: { type: Number },
  expiry: { type: Date },
  token: token,
};

const baseAccount = new Schema(
  {
    otp: OTPSchema,
    temporaryOTP: OTPSchema,
    token: { type: String },
    verification: {
      verified: { type: Boolean, default: false },
      tokenUsed: { type: Boolean, default: false },
      token: { type: String },
    },
    password: { type: String, required: true },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = baseAccount;

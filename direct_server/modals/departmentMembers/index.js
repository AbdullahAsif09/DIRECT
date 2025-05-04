const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { roles } = require("../../constants/rooms");

const departmentMembersSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    image: { type: String },
    verification: {
      token: { type: String },
      verified: { type: Boolean, default: false },
      tokenUsed: { type: Boolean, default: false },
      verifiedAt: { type: Date },
    },
    temporarycodeOTP: {
      code: { type: String },
      expireTime: { type: Date },
      attempts: { type: Number },
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },

    role: {
      type: [
        {
          type: String,
          enum: roles.department,
        },
      ],
    },
  },
  { timestamps: true }
);

departmentMembersSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

departmentMembersSchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("departmentMembers", departmentMembersSchema);

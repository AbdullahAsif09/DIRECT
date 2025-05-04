const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const OrganizationSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String },
    image: { type: String },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "organizationAdmin",
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

OrganizationSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

OrganizationSchema.statics.isPasswordEqual = async (
  password,
  passwordFromDatabase
) => {
  return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("organizations", OrganizationSchema);

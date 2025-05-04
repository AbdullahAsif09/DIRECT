const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String },
    image: [{ type: String }],
    organizationID: {
      type: Schema.Types.ObjectId,
      ref: "organizations",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "departmentAdmin",
    },

    creator: {
      id: {
        type: Schema.Types.ObjectId,
        refPath: "creator.model",
        required: true,
      },
      model: {
        type: String,
        required: true,
        enum: ["admin", "organizationAdmin"],
      },
    },

    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("departments", DepartmentSchema);

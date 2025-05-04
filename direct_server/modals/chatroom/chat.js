const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const schema = new Schema(
  {
    project: {
      type: Types.ObjectId,
      ref: "projects",
    },
    milestone: {
      type: Types.ObjectId,
      ref: "milestones",
    },
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["restricted", "unrestricted"],
    },
    category: {
      type: String,
      required: true,
      default: "milestone",
      enum: ["milestone", "project", "general"],
    },
    department: { type: Schema.Types.ObjectId, ref: "departments" },
    organization: { type: Schema.Types.ObjectId, ref: "organizations" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Chat || model("chat", schema);

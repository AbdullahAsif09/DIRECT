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
const schema = new Schema(
  {
    content: { type: String, required: true },
    type: { type: String },
    attachments: [],
    sender: {
      id: {
        type: Types.ObjectId,
        refPath: "sender.model",
      },
      model: {
        type: String,
        enum: enums,
      },
    },
    chat: {
      type: Types.ObjectId,
      ref: "chat",
      required: true,
    },
    tagged: [
      {
        id: {
          type: Schema.Types.ObjectId,
          refPath: "tagged.model",
        },
        model: {
          type: String,
          enum: enums,
        },
      },
    ],
    readBy: [
      {
        id: {
          type: Types.ObjectId,
          refPath: "readBy.model",
        },
        model: {
          type: String,
          enum: enums,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("message", schema);

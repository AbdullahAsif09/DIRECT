const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;
const enums = ["admin", "executive"];
const schema = new Schema(
  {
    content: { type: String, required: true },
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
    project: {
      type: Types.ObjectId,
      ref: "projects",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("projectComments", schema);

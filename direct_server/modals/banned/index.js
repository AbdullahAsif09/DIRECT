const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bannedSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["chat", "login"],
      required: true,
    },
    bannedBy: {
      id: {
        type: Schema.Types.ObjectId,
        refPath: "bannedBy.model",
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
    user: {
      id: {
        type: Schema.Types.ObjectId,
        refPath: "user.model",
        required: true,
      },
      model: {
        type: String,
        required: true,
        enum: [
          "industry",
          "academia",
          "userAgency",
          "fundingAgency",
          "admin",
          "users",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Banned || model("Banned", bannedSchema);

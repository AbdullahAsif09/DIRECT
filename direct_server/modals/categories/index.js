const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Categories || model("Categories", categoriesSchema);

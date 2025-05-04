const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UseUSRSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    files: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("usr", UseUSRSchema);

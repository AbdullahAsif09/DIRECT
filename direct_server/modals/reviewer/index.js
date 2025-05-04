const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewerSchema = new Schema(
  {
    userID: {
      id: {
        type: Schema.Types.ObjectId,
        refPath: "userID.model",
      },
      model: {
        type: String,
        required: true,
        enum: ["industry", "academia", "admin", "fundingagency", "useragency"],
      },
    }, 
    email: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    type: { type: String, required: true },
    phone: { type: String, trim: true },
    category: { type: [String] },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviewer", ReviewerSchema);

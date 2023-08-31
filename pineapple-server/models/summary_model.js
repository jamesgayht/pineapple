const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summarySchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    title: { type: String, required: true },
    episode: { type: String, required: true },
    summary: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;

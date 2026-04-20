const mongoose = require("mongoose");

// A "Schema" describes what a Note looks like in MongoDB
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    // This automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);


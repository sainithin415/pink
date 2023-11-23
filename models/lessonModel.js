const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 350,
      trim: true,
    },
    slug: { type: String, required: true },
    content: {
      type: String,
      minlength: 200,
    },
    video: {
      type: String,
    },
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qnacomment",
      },
    ],
    voteCount: {
      type: Number,
      default: 0,
    },
    upVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
    downVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
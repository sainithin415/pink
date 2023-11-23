const Question = require("../../models/qna/quesModel");
const Qna = require("../../models/qna/qnaModel");
const Answer = require("../../models/qna/ansModel");
const Qnatag = require("../../models/qna/tagModel");
const Qnacomment = require("../../models/qna/qnacomment");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../config/validateMongoDbId");
const { default: slugify } = require("slugify");
const { getOne, getAll, updateOne } = require("../customCtrl");

const createPost = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tags) {
      req.body.tags.forEach(async (element) => {
        const updateTagCount = await Qnatag.findByIdAndUpdate(
          element,
          {
            $inc: { totalques: +1 },
          },
          { new: true }
        );
        console.log(updateTagCount);
      });
    }
    const newQues = await Question.create(req.body);
    const post = await Qna.create({
      user: id,
      question: newQues?._id,
      slug: req.body.slug,
    });
    res.status(200).json({ status: true, message: "Create Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

const createAnswer = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const data = {
      user: id,
      ...req.body,
    };
    const answer = await Answer.create(data);
    const post = await Qna.findByIdAndUpdate(
      postId,
      {
        answer: answer?._id,
      },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Updated Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

const updateQues = updateOne(Question);
const updateAns = updateOne(Answer);

const getQuestion = getOne(Qna, "question answer");

const getAllQuestion = getAll(Qna, "question answer");
const deleteAQuestion = asyncHandler(async (req, res) => {
  const { postId, quesId, ansId } = req.params;
  console.log(postId, quesId, ansId);
  validateMongodbId(postId);
  validateMongodbId(quesId);
  if (ansId && ansId !== "null") validateMongodbId(ansId);
  try {
    const deletePost = await Qna.findByIdAndDelete(postId);
    const deleteQues = await Question.findByIdAndDelete(quesId);
    if (ansId && ansId !== "null") await Answer.findByIdAndDelete(ansId);
    res.status(200).json({ status: true, message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const addComment = asyncHandler(async (req, res) => {
  const { quesId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(quesId);
  try {
    const createComment = await Qnacomment.create({
      user: id,
      comment: req.body.comment,
    });
    const findQuestion = await Question.findByIdAndUpdate(
      quesId,
      { $push: { comments: createComment._id } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Comment Posted!" });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { quesId, commentId } = req.params;
  console.log(quesId, commentId);
  validateMongodbId(quesId);

  validateMongodbId(commentId);
  try {
    const delComment = await Qnacomment.findByIdAndDelete(commentId);
    const findQuestion = await Question.findByIdAndUpdate(
      quesId,
      { $pull: { comments: commentId } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Comment Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPost,
  getQuestion,
  getAllQuestion,
  deleteAQuestion,
  updateQues,
  updateAns,
  createAnswer,
  addComment,
  deleteComment,
};
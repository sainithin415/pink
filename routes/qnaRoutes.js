const qnaRouter = require("express").Router();
const {
  createPost,
  getQuestion,
  getAllQuestion,
  deleteAQuestion,
  updateQues,
  createAnswer,
  updateAns,
  addComment,
  deleteComment,
} = require("../controllers/qna/qnaCtrl");
const {
  postTag,
  updateTag,
  deleteTag,
  getAllTag,
  getTag,
} = require("../controllers/qna/qnaTagCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
qnaRouter.post("/tag", authMiddleware, restrictTo("admin"), postTag);
qnaRouter.post("/post", authMiddleware, createPost);
qnaRouter.get("/post/:slug", getQuestion);
qnaRouter.get("/tag/:slug", getTag);
qnaRouter.get("/post", getAllQuestion);
qnaRouter.get("/tag", getAllTag);

qnaRouter.post("/post/answer/:postId", authMiddleware, createAnswer);

/* delete */

qnaRouter.delete(
  "/post/:postId/:quesId/:ansId",
  authMiddleware,
  deleteAQuestion
);

qnaRouter.delete("/tag/:id", authMiddleware, restrictTo("admin"), deleteTag);

qnaRouter.put("/post/:id", authMiddleware, updateQues);
qnaRouter.put(
  "/tag/:id",
  authMiddleware,
  restrictTo("admin", "user"),
  updateTag
);

qnaRouter.put("/post/answer/:id", authMiddleware, updateAns);

qnaRouter.post("/post/comment/:quesId", authMiddleware, addComment);
qnaRouter.delete(
  "/post/comment/delete/:quesId/:commentId",
  authMiddleware,
  deleteComment
);

module.exports = qnaRouter;
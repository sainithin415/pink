const reviewRouter = require("express").Router();

const {
  createReview,
  getAllReviews,
  deleteAReview,
  getAReview,
  updateReviewStatus,
} = require("../controllers/reviewCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
reviewRouter.post("/", authMiddleware, createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", authMiddleware, restrictTo("admin"), getAReview);
reviewRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteAReview);
reviewRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  updateReviewStatus
);

module.exports = reviewRouter;
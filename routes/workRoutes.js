const workRouter = require("express").Router();
const {
  postDetails,
  updateDetail,
  deleteDetail,
  getDetail,
  getAllDetail,
} = require("../controllers/workCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

workRouter.post("/", postDetails);
workRouter.put("/:id", authMiddleware, restrictTo("admin"), updateDetail);
workRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteDetail);
workRouter.get("/:id", authMiddleware, restrictTo("admin"), getDetail);
workRouter.get("/", authMiddleware, restrictTo("admin"), getAllDetail);

module.exports = workRouter;
const blogRouter = require("express").Router();
const {
  postblog,
  getblog,
  getallblogs,
  deleteblog,
  updateblog,
} = require("../controllers/blogCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

blogRouter.post("/", authMiddleware, restrictTo("admin"), postblog);
blogRouter.get("/:slug", getblog);
blogRouter.get("/", getallblogs);
blogRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteblog);
blogRouter.put("/:id", authMiddleware, restrictTo("admin"), updateblog);
module.exports = blogRouter;
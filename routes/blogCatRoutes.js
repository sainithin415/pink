const {
    postBlogCategory,
    getAllBlogCategories,
    getABlogCat,
    updateABlogCat,
    deleteABlogCat,
  } = require("../controllers/blogCatCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const blogCatRouter = require("express").Router();
  blogCatRouter.get("/all", getAllBlogCategories);
  
  blogCatRouter.post("/", authMiddleware, restrictTo("admin"), postBlogCategory);
  blogCatRouter.get("/:slug", authMiddleware, restrictTo("admin"), getABlogCat);
  blogCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateABlogCat);
  blogCatRouter.delete(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    deleteABlogCat
  );
  
  module.exports = blogCatRouter;
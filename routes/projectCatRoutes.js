const {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory,
  } = require("../controllers/projectCatCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const projectCatRouter = require("express").Router();
  projectCatRouter.get("/all", getAllCategory);
  
  projectCatRouter.post("/", authMiddleware, restrictTo("admin"), postCategory);
  projectCatRouter.get(
    "/:slug",
    authMiddleware,
    restrictTo("admin"),
    getCategory
  );
  projectCatRouter.put(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    updateCategory
  );
  projectCatRouter.delete(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    deleteCategory
  );
  
  module.exports = projectCatRouter;
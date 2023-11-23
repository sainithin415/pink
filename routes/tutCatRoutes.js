const {
    postTutorialCategory,
    getAllTutCategories,
    getATutCat,
    updateATutCat,
    deleteATutCat,
  } = require("../controllers/tutCatCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const tutCatRouter = require("express").Router();
  
  tutCatRouter.post(
    "/post",
    authMiddleware,
    restrictTo("admin"),
    postTutorialCategory
  );
  tutCatRouter.get("/", getAllTutCategories);
  tutCatRouter.get("/:id", authMiddleware, restrictTo("admin"), getATutCat);
  tutCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateATutCat);
  tutCatRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteATutCat);
  
  module.exports = tutCatRouter;
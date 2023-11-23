const {
    postDocCategory,
    getAllDocCategories,
    getADocCat,
    updateADocCat,
    deleteADocCat,
  } = require("../controllers/docCatCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const docCatRouter = require("express").Router();
  docCatRouter.get("/all", getAllDocCategories);
  
  docCatRouter.post("/", authMiddleware, restrictTo("admin"), postDocCategory);
  docCatRouter.get("/:slug", authMiddleware, restrictTo("admin"), getADocCat);
  docCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateADocCat);
  docCatRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteADocCat);
  
  module.exports = docCatRouter;
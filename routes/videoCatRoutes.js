const {
    postVideoCategory,
    getAllVideoCategories,
    getAVideoCat,
    updateAVideoCat,
    deleteAVideoCat,
  } = require("../controllers/videoCatCtrl");
  const {
    authMiddleware,
    isAdmin,
    restrictTo,
  } = require("../middlewares/authMiddleware");
  
  const videoCatRouter = require("express").Router();
  videoCatRouter.get("/all", getAllVideoCategories);
  
  videoCatRouter.post(
    "/",
    authMiddleware,
    restrictTo("admin"),
    postVideoCategory
  );
  videoCatRouter.get("/:slug", authMiddleware, restrictTo("admin"), getAVideoCat);
  videoCatRouter.put(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    updateAVideoCat
  );
  videoCatRouter.delete(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    deleteAVideoCat
  );
  
  module.exports = videoCatRouter;
const {
    postvideo,
    getVideo,
    getallvideos,
    deleteVideo,
    updatevideo,
    getallvideosbyCat,
  } = require("../controllers/videoCtrl");
  
  const videoRouter = require("express").Router();
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  videoRouter.post("/", authMiddleware, restrictTo("admin"), postvideo);
  videoRouter.get("/all-videos", getallvideos);
  videoRouter.get("/:category/:slug", getVideo);
  videoRouter.get("/:slug", getallvideosbyCat);
  videoRouter.delete("/:id", deleteVideo);
  videoRouter.put("/:id", authMiddleware, restrictTo("admin"), updatevideo);
  module.exports = videoRouter;
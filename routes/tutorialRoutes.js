const {
    postTutorial,
    getATutorial,
    updateTutorial,
    allTutorial,
    deleteTutorial,
    getATutById,
  } = require("../controllers/tutorialCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const tutorialRouter = require("express").Router();
  
  tutorialRouter.post("/", authMiddleware, restrictTo("admin"), postTutorial);
  tutorialRouter.get("/:type/:slug", getATutorial);
  tutorialRouter.get("/:id", getATutById);
  tutorialRouter.get("/", authMiddleware, restrictTo("admin"), allTutorial);
  tutorialRouter.put("/:id", authMiddleware, restrictTo("admin"), updateTutorial);
  tutorialRouter.delete(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    deleteTutorial
  );
  
  module.exports = tutorialRouter;
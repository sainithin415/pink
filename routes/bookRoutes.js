const {
    getAllSession,
    postSession,
    getASession,
    updateSession,
    deleteSession,
  } = require("../controllers/bookSessionCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const bookRouter = require("express").Router();
  bookRouter.get("/all", getAllSession);
  
  bookRouter.post("/", authMiddleware, restrictTo("admin"), postSession);
  bookRouter.get("/:id", authMiddleware, restrictTo("admin"), getASession);
  bookRouter.put("/:id", authMiddleware, restrictTo("admin"), updateSession);
  bookRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteSession);
  
  module.exports = bookRouter;
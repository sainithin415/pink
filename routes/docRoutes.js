const {
    postdoc,
    getdoc,
    getalldocs,
    deletedoc,
    updatedoc,
  } = require("../controllers/docCtrl");
  
  const docRouter = require("express").Router();
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  docRouter.post("/", authMiddleware, restrictTo("admin"), postdoc);
  docRouter.get("/:slug", getdoc);
  docRouter.get("/", getalldocs);
  docRouter.delete("/:id", authMiddleware, restrictTo("admin"), deletedoc);
  docRouter.put("/:id", authMiddleware, restrictTo("admin"), updatedoc);
  
  module.exports = docRouter;
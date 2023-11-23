const contactRouter = require("express").Router();

const {
  createcontact,
  getAllcontacts,
  deleteAcontact,
  getAcontact,
  updatecontactStatus,
} = require("../controllers/contactCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
contactRouter.post("/", authMiddleware, createcontact);
contactRouter.get("/", authMiddleware, restrictTo("admin"), getAllcontacts);
contactRouter.get("/:id", authMiddleware, restrictTo("admin"), getAcontact);
contactRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteAcontact
);
contactRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  updatecontactStatus
);

module.exports = contactRouter;
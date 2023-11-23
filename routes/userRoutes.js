const express = require("express");
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getAUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/userCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
const { rateLimit } = require("express-rate-limit");
const userRouter = express.Router();

/* all post routes */
userRouter.post(
  "/register",
  rateLimit(60 * 60 * 1000, 2, "Secs", 2),
  registerAUser
);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);

/* all get routes */

userRouter.get("/all-users", authMiddleware, restrictTo("admin"), getAllUser);
userRouter.get("/:id", authMiddleware, getAUser);

/* all put routes */

userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, restrictTo("admin"), blockUser);
userRouter.put(
  "/unblock/:id",
  authMiddleware,
  restrictTo("admin"),
  unblockUser
);
userRouter.put("/update-password", authMiddleware, updatePassword);
userRouter.put("/reset-password/:token", resetPassword);

/* all delete routes */

userRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteUser);

module.exports = userRouter;
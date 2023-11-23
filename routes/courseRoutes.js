const courseRouter = require("express").Router();

const {
  createCourse,
  getAllCoursesByCategory,
  getAllCourses,
  getACourse,
  deleteCourse,
  updateCourse,
  getParticularIntructorCourses,
  checkEnrollment,
  freeEnrollment,
} = require("../controllers/courseCtrl");
const {
  createLesson,
  deleteALesson,
  getALession,
  getAllCourseLession,
  updateALession,
} = require("../controllers/lessonCtrl");
const {
  authMiddleware,

  restrictTo,
} = require("../middlewares/authMiddleware");

courseRouter.post(
  "/",
  authMiddleware,
  restrictTo("admin", "instructor"),
  createCourse
);
courseRouter.get(
  "/instructor/all-courses",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getParticularIntructorCourses
);
courseRouter.get("/all", getAllCourses);
courseRouter.get("/:slug", getACourse);

courseRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteCourse
);
courseRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateCourse
);

/* =============== Lessons ==================== */

courseRouter.post(
  "/lesson/:courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  createLesson
);
courseRouter.delete(
  "/lesson/:courseId/:lessonId",
  authMiddleware,
  restrictTo("admin", "instructor"),

  deleteALesson
);
courseRouter.get(
  "/lesson/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getALession
);
courseRouter.get(
  "/lessons/:courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getAllCourseLession
);
courseRouter.put(
  "/update-lesson/:lessonId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateALession
);

courseRouter.post(
  "/check-enrollment/:courseId",
  authMiddleware,
  checkEnrollment
);

courseRouter.post("/free-enrollment/:courseId", authMiddleware, freeEnrollment);

module.exports = courseRouter;
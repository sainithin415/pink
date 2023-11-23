const {
    postCourseCategory,
    getAllCourseCategories,
    getACourseCat,
    updateACourseCat,
    deleteACourseCat,
  } = require("../controllers/courseCatCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const courseCatRouter = require("express").Router();
  
  courseCatRouter.get("/all", getAllCourseCategories);
  
  courseCatRouter.post(
    "/",
    authMiddleware,
    restrictTo("admin", "instructor"),
    postCourseCategory
  );
  courseCatRouter.get(
    "/:slug",
    authMiddleware,
    restrictTo("admin", "instructor"),
    getACourseCat
  );
  courseCatRouter.put(
    "/:id",
    authMiddleware,
    restrictTo("admin", "instructor"),
    updateACourseCat
  );
  courseCatRouter.delete(
    "/:id",
    authMiddleware,
    restrictTo("admin", "instructor"),
    deleteACourseCat
  );
  
  module.exports = courseCatRouter;
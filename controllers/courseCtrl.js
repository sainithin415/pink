const Course = require("../models/courseModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const { default: slugify } = require("slugify");
const User = require("../models/userModel");

// Create A Course

const createCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const course = await Course.create(req.body);
    res
      .status(200)
      .json({ status: true, message: "Course Created Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: true,
      message: "All Courses Fetched!",
      courses,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getACourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Course Fetched!",
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getParticularIntructorCourses = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  validateMongoDbId(_id);
  try {
    const courses = await Course.find({ instructor: _id });
    res.status(200).json({ status: true, message: "Courses Found!", courses });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: true, message: "Course Updated!" });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const course = await Course.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Course Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

const checkEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { id } = req.user;
  const user = await User.findById(id);
  let ids = [];
  for (let index = 0; index < user.courses.length; index++) {
    if (user.courses.length > 0) {
      ids.push(user.courses[index].toString());
    }
  }
  res.status(200).json({
    status: ids.includes(courseId),
    course: await Course.findById(courseId).exec(),
  });
});

const freeEnrollment = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (course.paid) {
      return;
    }
    const addCourseToUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { courses: course?._id } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Course Added" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getACourse,
  getParticularIntructorCourses,
  checkEnrollment,
  freeEnrollment,
};

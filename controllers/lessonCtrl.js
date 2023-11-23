const Lesson = require("../models/lessonModel");
const Course = require("../models/courseModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const { default: slugify } = require("slugify");

const createLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const findCourse = await Course.findById(courseId);
    if (findCourse) {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const lesson = await Lesson.create(req.body);
      await Course.findByIdAndUpdate(
        courseId,
        {
          $push: { lessons: lesson._id },
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        message: "Lesson Added to the Course!",
        lesson,
      });
    } else {
      throw new Error("No Course Exists with this ID");
    }
    console.log(findCourse);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteALesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  validateMongoDbId(courseId);
  validateMongoDbId(lessonId);
  try {
    const findCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { lessons: lessonId } },
      { new: true }
    );
    const findLesson = await Lesson.findByIdAndDelete(lessonId);
    res.status(200).json({ status: 200, message: "Lession Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const getALession = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  validateMongoDbId(lessonId);
  try {
    const lesson = await Lesson.findOne({ lesson: lessonId });
    res.status(200).json({ status: true, message: "lession found!", lesson });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCourseLession = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  validateMongoDbId(courseId);
  try {
    const lessons = await Course.find()
      .where({ _id: courseId })
      .select("lessons");
    res.status(200).json({ status: true, message: "lession found!", lessons });
  } catch (error) {
    throw new Error(error);
  }
});

const updateALession = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  console.log("update fds sd");
  try {
    const lesson = await Lesson.findByIdAndUpdate(lessonId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "lession updated!",
      lesson,
    });
  } catch (error) {}
});

module.exports = {
  createLesson,
  deleteALesson,
  getALession,
  getAllCourseLession,
  updateALession,
};
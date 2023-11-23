const { default: slugify } = require("slugify");
const CourseCat = require("../models/courseCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongoDbId");

const postCourseCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const postCourseCat = await CourseCat.create(req.body);
    res.status(200).json({
      status: true,
      message: "Course Category Created Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCourseCategories = asyncHandler(async (req, res) => {
  try {
    const allCoursecat = await CourseCat.find();
    res.status(200).json({
      status: true,
      message: "Courses Category Fetched",
      allCoursecat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getACourseCat = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const findCourseCat = await CourseCat.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Course Category Found!",
      findCourseCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteACourseCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteCourseCat = await CourseCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Course Category Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateACourseCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateCourseCat = await CourseCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Course Category Updated!",
      updateCourseCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postCourseCategory,
  getACourseCat,
  getAllCourseCategories,
  updateACourseCat,
  deleteACourseCat,
};
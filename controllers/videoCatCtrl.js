const { default: slugify } = require("slugify");
const VideoCat = require("../models/videoCatModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongoDbId");

const postVideoCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postVideoCat = await VideoCat.create(req.body);
    res.status(200).json({
      status: true,
      message: "Video Category Created Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllVideoCategories = asyncHandler(async (req, res) => {
  try {
    const allVideocat = await VideoCat.find();
    res.status(200).json({
      status: true,
      message: "Videos Category Fetched",
      allVideocat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAVideoCat = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const findVideoCat = await VideoCat.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Video Category Found!",
      findVideoCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAVideoCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteVideoCat = await VideoCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Video Category Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateAVideoCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateVideoCat = await VideoCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Video Category Updated!",
      updateVideoCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postVideoCategory,
  getAVideoCat,
  getAllVideoCategories,
  updateAVideoCat,
  deleteAVideoCat,
};
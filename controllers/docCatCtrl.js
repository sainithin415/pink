const { default: slugify } = require("slugify");
const DocCat = require("../models/docCatModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongoDbId");

const postDocCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const postDocCat = await DocCat.create(req.body);
    res.status(200).json({
      status: true,
      message: "Doc Category Created Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllDocCategories = asyncHandler(async (req, res) => {
  try {
    const allDoccat = await DocCat.find();
    res.status(200).json({
      status: true,
      message: "Docs Category Fetched",
      allDoccat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getADocCat = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const findDocCat = await DocCat.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Doc Category Found!",
      findDocCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteADocCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteDocCat = await DocCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Doc Category Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateADocCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateDocCat = await DocCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Doc Category Updated!",
      updateDocCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postDocCategory,
  getADocCat,
  getAllDocCategories,
  updateADocCat,
  deleteADocCat,
};
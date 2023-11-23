const { default: slugify } = require("slugify");
const BlogCat = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongoDbId");

const postBlogCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const postBlogCat = await BlogCat.create(req.body);
    res.status(200).json({
      status: true,
      message: "Blog Category Created Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategories = asyncHandler(async (req, res) => {
  try {
    const allBlogcat = await BlogCat.find();
    res.status(200).json({
      status: true,
      message: "Blogs Category Fetched",
      allBlogcat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getABlogCat = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const findBlogCat = await BlogCat.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Blog Category Found!",
      findBlogCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteABlogCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteBlogCat = await BlogCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Blog Category Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateABlogCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateBlogCat = await BlogCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Blog Category Updated!",
      updateBlogCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postBlogCategory,
  getABlogCat,
  getAllBlogCategories,
  updateABlogCat,
  deleteABlogCat,
};
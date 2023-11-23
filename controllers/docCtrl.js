const Doc = require("../models/documentationModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const { default: slugify } = require("slugify");

// create or post doc

const postdoc = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const doc = await Doc.create(req.body);
    res.status(200).json({ status: true, message: "Doc Posted Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

// get A doc

const getdoc = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const doc = await Doc.findOne({ slug: slug });
    res.status(200).json({ status: true, message: "Doc Found!", doc });
  } catch (error) {
    throw new Error(error);
  }
});

// get All docs

const getalldocs = asyncHandler(async (req, res) => {
  try {
    const doc = await Doc.find();
    res.status(200).json({ status: true, message: "Docs Found!", doc });
  } catch (error) {
    throw new Error(error);
  }
});

// delete a doc

const deletedoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const doc = await Doc.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Doc Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

//  update a doc

const updatedoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const doc = await Doc.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({ status: true, message: "Doc Updated Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  postdoc,
  getdoc,
  getalldocs,
  deletedoc,
  updatedoc,
};
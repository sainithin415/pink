const ProjectCategory = require("../models/projectCatModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} = require("./customCtrl");

const postCategory = createOne(ProjectCategory);
const updateCategory = updateOne(ProjectCategory);
const deleteCategory = deleteOne(ProjectCategory);
const getCategory = getOne(ProjectCategory);
const getAllCategory = getAll(ProjectCategory);

module.exports = {
  postCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
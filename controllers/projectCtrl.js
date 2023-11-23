const Project = require("../models/projectModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} = require("./customCtrl");

const postProject = createOne(Project);
const deleteProject = deleteOne(Project);
const updateProject = updateOne(Project);
const getProject = getOne(Project);
const getAllProject = getAll(Project);

module.exports = {
  postProject,
  deleteProject,
  updateProject,
  getProject,
  getAllProject,
};
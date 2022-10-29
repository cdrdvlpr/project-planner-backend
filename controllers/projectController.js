const Project = require("../models/projectModel");
const mongoose = require("mongoose");

const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: 1 });

  res.status(200).json(projects);
};
const getOneProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project!" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No such project!" });
  }

  res.status(200).json(project);
};
const postOneProject = async (req, res) => {
  const { title, details, completed } = req.body;

  try {
    const project = await Project.create({ title, details, completed });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteOneProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such project!" });
  }

  const project = await Project.findOneAndDelete({ _id: id });

  if (!project) {
    return res.status(400).json({ error: "No such project!" });
  }

  res.status(200).json(project);
};
const updateOneProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such project!" });
  }

  const project = await Project.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!project) {
    return res.status(400).json({ error: "No such project!" });
  }

  res.status(200).json(project);
};

module.exports = {
  getAllProjects,
  getOneProject,
  postOneProject,
  deleteOneProject,
  updateOneProject,
};

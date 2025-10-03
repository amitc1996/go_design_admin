import Project from "../models/projectModel.js";

const createProject = async (data) => {
  return await Project.create(data);
};

const getProjectById = async (id) => {
  return await Project.findByPk(id);
};

const updateProject = async (id, data) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  await project.update(data);
  return project;
};

const deleteProject = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  await project.destroy();
  return true;
};

const listProjects = async () => {
  return await Project.findAll();
};

export default { createProject, getProjectById, updateProject, deleteProject, listProjects };
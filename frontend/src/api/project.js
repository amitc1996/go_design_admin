import api from "../services/api";

/**
 * Fetch all projects
 */
export async function listProjects() {
  const res = await api.get("/projects");
  return res.data.data || res.data; // keeping it flexible in case backend wraps in `data`
}

/**
 * Create a new project
 */
export async function createProject({ name, description }) {
  const res = await api.post("/projects", { name, description });
  return res.data.data || res.data;
}

/**
 * Update a project by ID
 */
export async function updateProject(projectId, { name, description }) {
  const res = await api.put(`/projects/${projectId}`, { name, description });
  return res.data.data || res.data;
}

/**
 * Delete a project by ID
 */
export async function deleteProject(projectId) {
  const res = await api.delete(`/projects/${projectId}`);
  return res.data.data || res.data;
}

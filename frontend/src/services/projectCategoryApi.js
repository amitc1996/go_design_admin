import axios from "axios";

const API_URL = "/api/project-categories";

// Helper to get the auth token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Adjust if you store the token differently
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getCategories = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data.data;
};

const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData, {
    headers: getAuthHeaders(),
  });
  return response.data.data;
};

const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/${id}`, categoryData, {
    headers: getAuthHeaders(),
  });
  return response.data.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

const projectCategoryApi = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default projectCategoryApi;

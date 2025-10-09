import api from "../services/api"; // <-- path to your main axios instance file

const API_PATH = "/project_categories";

const projectCategoryApi = {
  // Get all categories
  async getCategories() {
    const response = await api.get(API_PATH);
    return response.data.data;
  },

  // Create new category
  async createCategory(categoryData) {
    const response = await api.post(API_PATH, categoryData);
    return response.data.data;
  },

  // Update category by ID
  async updateCategory(id, categoryData) {
    const response = await api.put(`${API_PATH}/${id}`, categoryData);
    return response.data.data;
  },

  // Delete category by ID
  async deleteCategory(id) {
    const response = await api.delete(`${API_PATH}/${id}`);
    return response.data;
  },
};

export default projectCategoryApi;

import ProjectCategory from '../models/projectCategoryModel.js';

const createCategory = async (categoryData) => {
  const { name } = categoryData;
  if (!name) {
    throw new Error('Category name is required');
  }
  return await ProjectCategory.create({ name });
};

const getCategoryById = async (id) => {
  const category = await ProjectCategory.findByPk(id);
  if (!category) {
    throw new Error('Project category not found');
  }
  return category;
};

const updateCategory = async (id, categoryData) => {
  const category = await getCategoryById(id);
  const { name } = categoryData;
  if (name) {
    category.name = name;
  }
  await category.save();
  return category;
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);
  await category.destroy();
};

const listCategories = async () => {
  return await ProjectCategory.findAll({ order: [['name', 'ASC']] });
};

export default {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  listCategories,
};
import projectCategoryService from '../services/projectCategoryService.js';
import { success, errors } from '../utils/response.js';

export const create = async (req, res) => {
  try {
    const category = await projectCategoryService.createCategory(req.body);
    const resp = success({ status: 201, data: category, statusText: 'Created' }, 'Project category created successfully.');
    res.status(201).json(resp);
  } catch (error) {
    const resp = errors(error, 'Failed to create project category');
    res.status(resp.status || 400).json(resp);
  }
};

export const getById = async (req, res) => {
  try {
    const category = await projectCategoryService.getCategoryById(req.params.id);
    const resp = success({ status: 200, data: category, statusText: 'OK' }, 'Project category fetched successfully.');
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, 'Failed to fetch project category');
    res.status(resp.status || 404).json(resp);
  }
};

export const update = async (req, res) => {
  try {
    const category = await projectCategoryService.updateCategory(req.params.id, req.body);
    const resp = success({ status: 200, data: category, statusText: 'OK' }, 'Project category updated successfully.');
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, 'Failed to update project category');
    res.status(resp.status || 400).json(resp);
  }
};

export const remove = async (req, res) => {
  try {
    await projectCategoryService.deleteCategory(req.params.id);
    const resp = success({ status: 200, statusText: 'OK' }, 'Project category deleted successfully.');
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, 'Failed to delete project category');
    res.status(resp.status || 400).json(resp);
  }
};

export const list = async (req, res) => {
  try {
    const categories = await projectCategoryService.listCategories();
    const resp = success({ status: 200, data: categories, statusText: 'OK' }, 'Project categories fetched successfully.');
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, 'Failed to fetch project categories');
    res.status(resp.status || 500).json(resp);
  }
};
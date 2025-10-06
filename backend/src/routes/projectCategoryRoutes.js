import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/projectCategoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js'; // Assuming you have this for admin-only routes

const router = Router();

// Assuming these are admin-only routes
router.use(authMiddleware, adminMiddleware);

router.route('/').post(create).get(list);
router.route('/:id').get(getById).put(update).delete(remove);

export default router;
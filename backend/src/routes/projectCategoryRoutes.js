import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/projectCategoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Assuming these are admin-only routes
//router.use(authMiddleware);

router.route('/').post(create).get(list);
router.route('/:id').get(getById).put(update).delete(remove);

export default router;
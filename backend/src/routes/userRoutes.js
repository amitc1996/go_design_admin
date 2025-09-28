import express from "express";
import { getProfile, updateProfile,updatePassword } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile/:id", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/update_password", authMiddleware, updatePassword);

export default router;

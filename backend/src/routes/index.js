import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import appUserRoutes from "./appUserRoutes.js";
import projectCategoryRoutes from "./projectCategoryRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/users", appUserRoutes);
router.use("/project_categories", projectCategoryRoutes);

export default router;

import express from "express";
import { signup, login, forgotPassword, resetPassword } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;

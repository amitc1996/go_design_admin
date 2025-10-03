import express from "express";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router.post("/", projectController.create);
router.get("/:id", projectController.getById);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.remove);
router.get("/", projectController.list); // Listing already available

export default router;
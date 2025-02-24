import express from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/TaskController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", AuthMiddleware, getTasks);
router.post("/", AuthMiddleware, addTask);
router.put("/:id", AuthMiddleware, updateTask);
router.delete("/:id", AuthMiddleware, deleteTask);

export default router;

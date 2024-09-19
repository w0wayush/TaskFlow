import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getUserTasks,
} from "../controllers/taskController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// Task Routes (All routes are protected by authentication middleware)
router.post("/", authenticate, createTask); // Create a task
router.put("/:taskId", authenticate, updateTask); // Update a task
router.delete("/:taskId", authenticate, deleteTask); // Delete a task
router.get("/", authenticate, getUserTasks); // Get all tasks for a user

export default router;

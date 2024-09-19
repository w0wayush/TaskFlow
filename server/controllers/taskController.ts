import { Request, Response } from "express";
import { Task } from "../models/taskSchema";
import { User } from "../models/userSchema";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, dueDate } = req.body;
  //@ts-ignore
  const userId = req.user?.id;

  // Create task
  const newTask = new Task({
    title,
    description,
    status,
    priority,
    dueDate,
  });

  try {
    const task = await newTask.save();
    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } }); // Add task to user's task array
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, priority, dueDate },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  //@ts-ignore

  const userId = req.user?.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove task reference from the user's task array
    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Get all tasks for a user
export const getUserTasks = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId).populate("tasks");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

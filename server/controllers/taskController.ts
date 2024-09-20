import { Request, Response } from "express";
import { Task } from "../models/taskSchema";
import { User } from "../models/userSchema";
import { taskSchema } from "../lib/taskType";
import { ZodError } from "zod";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedTask = taskSchema.parse(req.body);

    //@ts-ignore
    const userId = req.user?.userId;

    // Create task
    const newTask = new Task({
      ...validatedTask,
      user: userId,
    });

    const task = await newTask.save();
    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedTask = taskSchema.parse(req.body);
    const { taskId } = req.params;

    //@ts-ignore
    const userId = req.user?.userId;

    // Update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      validatedTask,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Optionally, push the updated task reference into the user's tasks array (if needed)
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { tasks: updatedTask._id } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    //@ts-ignore
    const userId = req.user?.userId;

    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Get all tasks for a user
export const getUserTasks = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.userId;

    const user = await User.findById(userId).populate("tasks");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

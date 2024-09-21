import axios from "axios";
import { TaskFormValues } from "./task";

const addTask = async (data: TaskFormValues, token: string) => {
  try {
    const newTask = {
      id: Date.now().toString(),
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`,
      newTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      // Assuming the server returns the created task
      const createdTask = response.data;
      return createdTask;
    } else {
      throw new Error("Failed to add task");
    }
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export default addTask;

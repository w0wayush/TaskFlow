import React from "react";
import { Calendar, CheckCircle, Trash, Edit2 } from "lucide-react";
import { Task } from "@/lib/task";

interface TaskCardProps {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  editTask: (task: Task) => void;
  openEditModal?: (task: Task) => void;
}

const TaskListCard: React.FC<TaskCardProps> = ({
  task,
  updateTask,
  deleteTask,
  editTask,
}) => {
  const handleDoneClick = () => {
    if (task.status !== "Completed") {
      updateTask({ ...task, status: "Completed" });
    } else {
      deleteTask(task.id as string);
    }
  };

  const handleTask = async (task: Task) => {
    try {
      editTask(task);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="w-full max-w-none bg-white rounded-xl shadow-md p-4 mb-2 border border-gray-100 hover:border-gray-200 transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {task.title}
          </h3>
          <div className="flex space-x-1">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {task.dueDate && (
              <div className="flex items-center text-gray-500 text-xs">
                <Calendar size={14} className="mr-1" />
                {task.dueDate instanceof Date && !isNaN(task.dueDate.getTime())
                  ? task.dueDate.toLocaleDateString()
                  : "Invalid date"}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleTask(task)}
              aria-label="Edit Task"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={handleDoneClick}
              className="text-gray-400 hover:text-green-600 transition-colors duration-200 p-1 rounded-full hover:bg-green-50"
            >
              <CheckCircle size={18} />
            </button>
            <button
              onClick={() => deleteTask(task.id as string)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "To Do":
      return "bg-blue-100 text-blue-800";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "text-red-600 bg-red-100";
    case "Medium":
      return "text-orange-600 bg-orange-100";
    case "Low":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default TaskListCard;

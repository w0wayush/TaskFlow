import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash, Calendar, CheckCircle } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
};

interface TaskCardProps {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  isActive?: boolean;
}

const Tasks: React.FC<TaskCardProps> = ({
  task,
  updateTask,
  deleteTask,
  isActive,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDoneClick = () => {
    if (task.status !== "Completed") {
      updateTask({ ...task, status: "Completed" });
    } else {
      deleteTask(task.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border border-gray-200 
      hover:shadow-lg hover:bg-gradient-to-br from-indigo-50 to-gray-50 transition-all duration-300 cursor-pointer
      ${isActive ? "opacity-50 bg-gray-50" : ""}`}
    >
      {/* Task Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-xl">{task.title}</h4>
        <div className="space-x-2">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
          {/* Dynamic Status Indicator */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 leading-tight">
          {task.description}
        </p>
      )}

      {/* Task Footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          {task.dueDate && (
            <span className="flex items-center text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              {task.dueDate.toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          {/* Mark Complete */}
          <button
            onClick={handleDoneClick}
            className="text-gray-400 hover:text-green-500 transition-colors duration-200"
          >
            <CheckCircle
              size={18}
              className="hover:scale-110 transition-transform duration-200"
            />
          </button>
          {/* Delete Task */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash
              size={18}
              className="hover:scale-110 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Dynamic Styles for Status and Priority Colors
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
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default Tasks;

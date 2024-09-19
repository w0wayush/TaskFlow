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

const TaskCard: React.FC<TaskCardProps> = ({
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
      className={`
        p-3 bg-white rounded-lg shadow-sm border border-gray-200
        hover:shadow-md transition-all duration-200 cursor-move
        ${isActive ? "opacity-50 bg-gray-50" : ""}
        w-full sm:w-[calc(33.333% - 1rem)] mb-4
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-sm truncate">
          {task.title}
        </h4>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="text-xs text-gray-600 mb-2 truncate">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
         <span
            className={`
              text-xs font-medium px-2 py-1 rounded-full
              ${getPriorityColor(task.priority)}
            `}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              {task.dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDoneClick}
            className="text-gray-400 hover:text-green-500 transition-colors duration-200"
          >
            <CheckCircle size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash size={16} />
          </button>
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
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default TaskCard;

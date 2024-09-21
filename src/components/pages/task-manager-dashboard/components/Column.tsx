import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
};

interface ColumnProps {
  title: Task["status"];
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  updateTask,
  deleteTask,
}) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div className="flex-1 space-y-2">
      <div className="bg-gray-100  p-4  rounded-lg">
        <h3 className="font-bold mb-2 flex items-center justify-center ">
          {title}
        </h3>
      </div>
      <SortableContext
        id={title}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;

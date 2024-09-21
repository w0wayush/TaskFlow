import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Task } from "@/lib/task";

interface ContainerProps {
  id: string;
  title?: string;
  tasks?: Task[]; // Ensure tasks are an array
  description?: string;
  onAddItem?: () => void;
  updateTask?: (task: Task) => void;
  deleteTask?: (id: string) => void;
  children: React.ReactNode;
}

const Container = ({
  id,
  title,
  //   description,
  //   onAddItem,
  //   updateTask,
  //   deleteTask,
  children,
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    // listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "container",
    },
  });

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "w-full h-full rounded-t-xl flex flex-col gap-y-4",
        isDragging ? "opacity-90 z-10" : ""
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1 bg-gray-50 w-full h-full p-5 rounded-t-xl">
          <h1 className="text-gray-800 text-xl font-bold flex-1">{title}</h1>
          {/* <p className="text-gray-400 text-sm">{description}</p> */}
          {/* <Button variant="ghost" onClick={onAddItem}>
        Add Item
      </Button> */}
        </div>
      </div>

      {children}
      {/* <Button variant="ghost" onClick={onAddItem}>
        Add Item
      </Button> */}
    </div>
  );
};

export default Container;

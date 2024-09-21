import React, { useCallback } from "react";
import TaskListCard from "./TaskListCard";
import { Task } from "@/lib/task";

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  openEditModal?: (task: Task) => void;
  editTask: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTasks,
  openEditModal,
  editTask,
}) => {
  const updateTask = useCallback(
    (updatedTask: Task) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });

  return (
    <div className="flex flex-wrap -mx-2">
      {sortedTasks.map((task) => (
        <div key={task.id} className="w-full sm:w-1/3 px-2 mb-4 ">
          <TaskListCard
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            editTask={editTask}
            openEditModal={openEditModal}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;

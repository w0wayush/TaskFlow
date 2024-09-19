"use client";

import React, { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import Navbar from "@/components/pages/navbar/Navbar";
import TaskCard from "./components/TaskCard";
import Column from "./components/Column";
import KanbanBoard from "./components/KanbanBoard";
import Tasks from "./components/Tasks";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
};

const TaskManagerDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Task["status"] | "All">(
    "All"
  );

  const [filterPriority, setFilterPriority] = useState<
    Task["priority"] | "All"
  >("All");
  const [sortBy, setSortBy] = useState<"priority" | "dueDate">("priority");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addTask = () => {
    if (newTask.title) {
      setTasks([
        ...tasks,
        {
          ...newTask,
          id: Date.now().toString(),
          status: newTask.status || "To Do",
        } as Task,
      ]);
      setNewTask({});
      setIsModalOpen(false);
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overColumn = over.id as Task["status"];

    if (activeTask && activeTask.status !== overColumn) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === active.id ? { ...task, status: overColumn } : task
        )
      );
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus !== "All" && task.status !== filterStatus) return false;
    if (filterPriority !== "All" && task.priority !== filterPriority)
      return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    return 0;
  });

  const TaskList = useCallback(
    () => (
      <div className="flex flex-wrap -mx-2">
        {sortedTasks.map((task) => (
          <div key={task.id} className="w-full sm:w-1/3 px-2 mb-4">
            <Tasks
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        ))}
      </div>
    ),
    [sortedTasks, updateTask, deleteTask]
  );

  const KanbanBoard = useCallback(() => {
    const columns = ["To Do", "In Progress", "Completed"];

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4 text-black text-lg lg:text-xl">
          {columns.map((columnName) => (
            <Column
              key={columnName}
              title={columnName as Task["status"]}
              tasks={sortedTasks.filter((task) => task.status === columnName)}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DndContext>
    );
  }, [sortedTasks, sensors, handleDragEnd]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-indigo-300 dark:from-gray-800 dark:to-gray-900 transition-all ease-in-out duration-500">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-800 dark:text-white transition-colors duration-300">
          TaskFlow Dashboard
        </h1>
        <div className="flex justify-between items-center mb-6">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="hover:bg-indigo-500 bg-indigo-600 text-white transition-transform transform hover:scale-105">
                <Plus className="mr-2 h-5 w-5" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="animate-fade-in-up">
              <DialogHeader>
                <DialogTitle className="text-indigo-600">
                  Add New Task
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Task Title"
                  value={newTask.title || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="focus:ring-2 focus:ring-indigo-500"
                />
                <Input
                  placeholder="Description"
                  value={newTask.description || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
                <Select
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, status: value as Task["status"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,
                      priority: value as Task["priority"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.dueDate ? (
                        format(newTask.dueDate, "PPP")
                      ) : (
                        <span>Pick a due date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) =>
                        setNewTask({ ...newTask, dueDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={addTask}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Tabs defaultValue="kanban">
          <TabsList className="mb-4 bg-white rounded-lg shadow-lg p-2 space-x-2">
            <TabsTrigger
              value="kanban"
              className="transition-transform hover:scale-105 hover:bg-gray-100 rounded-md px-3 py-1"
            >
              Kanban Board
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="transition-transform hover:scale-105 hover:bg-gray-100 rounded-md px-3 py-1"
            >
              Task List
            </TabsTrigger>
          </TabsList>
          <TabsContent value="kanban">
            <KanbanBoard />
          </TabsContent>
          <TabsContent value="list">
            <TaskList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TaskManagerDashboard;

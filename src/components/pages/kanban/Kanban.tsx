"use client";

import React, { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Navbar from "@/components/pages/navbar/Navbar";
import Container from "./components/Container";
import TaskCard from "./components/TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "./components/TaskList";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import { TaskFormValues } from "@/lib/task";
import { taskSchema } from "@/lib/taskValidationSchema";
// import { RootState } from "@/app/store/store";
// import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import TaskCreationForm from "./components/TaskCreationForm";
import { Task } from "@/lib/task";

const Kanban = () => {
  // const userState = useSelector((state: RootState) => state.user);
  // const { token } = userState;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<{
    sortBy: string;
    filterByStatus: string;
    filterByPriority: string;
  }>({
    sortBy: "dueDate",
    filterByStatus: "All",
    filterByPriority: "All",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const {
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });
  const selectedDate = watch("dueDate");

  console.log("formState error - ", errors);
  console.log(selectedDate);
  console.log("active task - ", activeTask);
  // console.log("Activeid-", activeId);
  // console.log("active tsk - ", activeTask);

  const containers = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /*  const fetchUserTasks = async () => {
    try {
      // console.log("Token - ", token);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User tasks - ", response);
      setTasks(response.data);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "Failed to fetch tasks"
          : "An unexpected error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []); */

  const addOrUpdateTask = (data: TaskFormValues) => {
    let newTask: Task;

    if (editingTask) {
      // console.log("Tak update data - ", data);
      // Update existing task
      newTask = {
        ...editingTask, // Start from the editing task
        title: data.title,
        description: data.description,
        status: data.status as Task["status"],
        priority: data.priority as Task["priority"],
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editingTask.id ? newTask : task))
      );

      toast({
        title: "Success",
        description: "Successfully updated task",
        variant: "default",
      });

      // TODO: handle the update in backend
      // handleUpdateTask(newTask); // Call here, outside the map
    } else {
      // Add new task
      newTask = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        status: data.status as Task["status"],
        priority: data.priority as Task["priority"],
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);

      toast({
        title: "Success",
        description: "Successfully added task",
        variant: "default",
      });

      //TODO: handle the add tasks in backend some error in token handling
      // handleAddTask(newTask);
    }

    reset();
    setIsModalOpen(false);
    setEditingTask(null);
  };

  /* const handleUpdateTask = async (task: Task) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${task.id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Successfully updated task",
        variant: "default",
      });

      // Optionally, you can update your state with the new task if needed
      // setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "Failed to update task"
          : "An unexpected error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleAddTask = async (task: Task) => {
    try {
      // console.log("Token -", token);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Successfully added task",
        variant: "default",
      });

      // Optionally, you can update your state with the new task if needed
      // setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "Failed to add task"
          : "An unexpected error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }; */

  // Sorting and filtering logic based on filterCriteria
  // Sorting and filtering logic based on filterCriteria
  const sortedTasks = tasks
    .filter((task) => {
      if (
        filterCriteria.filterByStatus !== "All" &&
        task.status !== filterCriteria.filterByStatus
      ) {
        return false;
      }
      if (
        filterCriteria.filterByPriority !== "All" &&
        task.priority !== filterCriteria.filterByPriority
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filterCriteria.sortBy === "priority-low") {
        const priorityMap = { Low: 1, Medium: 2, High: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      } else if (filterCriteria.sortBy === "priority-high") {
        const priorityMap = { Low: 3, Medium: 2, High: 1 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      } else if (filterCriteria.sortBy === "dueDate") {
        // Ensure that tasks without a due date appear last
        const aDue =
          a.dueDate instanceof Date && !isNaN(a.dueDate.getTime())
            ? a.dueDate.getTime()
            : Infinity;
        const bDue =
          b.dueDate instanceof Date && !isNaN(b.dueDate.getTime())
            ? b.dueDate.getTime()
            : Infinity;
        return aDue - bDue;
      }
      return 0;
    });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveTask(tasks.find((task) => task.id === active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setTasks((prevTasks) => {
      const activeIndex = prevTasks.findIndex((task) => task.id === active.id);
      const overIndex = prevTasks.findIndex((task) => task.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        prevTasks[activeIndex].status = overContainer.title as Task["status"];
        return arrayMove(prevTasks, activeIndex, overIndex);
      }

      return prevTasks;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex(
          (task) => task.id === active.id
        );
        const overIndex = prevTasks.findIndex((task) => task.id === over.id);

        if (activeIndex !== -1) {
          prevTasks[activeIndex].status = overContainer.title as Task["status"];
          return arrayMove(
            prevTasks,
            activeIndex,
            overIndex !== -1 ? overIndex : prevTasks.length - 1
          );
        }

        return prevTasks;
      });
    } else if (active.id !== over.id) {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
        const newIndex = prevTasks.findIndex((task) => task.id === over.id);

        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }

    setActiveId(null);
    setActiveTask(null);
  };

  const findContainer = (id: UniqueIdentifier) => {
    if (containers.map((cont) => cont.id).includes(id as string)) {
      return containers.find((cont) => cont.id === id);
    }
    return containers.find(
      (cont) => cont.title === tasks.find((task) => task.id === id)?.status
    );
  };

  const updateTask = useCallback(
    (updatedTask: Task) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      toast({
        title: "Success",
        description: "Successfully updated tasks",
        variant: "default",
      });
    },
    [setTasks, toast]
  );

  const deleteTask = useCallback(
    (id: UniqueIdentifier) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast({
        title: "Success",
        description: "Successfully deleted tasks",
        variant: "default",
      });
    },
    [setTasks, toast]
  );

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
    // Populate the form with the task data
    setValue("title", task.title);
    setValue("description", task.description || "");
    setValue("status", task.status);
    setValue("priority", task.priority);
    setValue("dueDate", task.dueDate);
  };

  /* const saveEditedTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsModalOpen(false);
  }; */

  const editTask = useCallback(
    (task: Task) => {
      setEditingTask(task);
      setIsModalOpen(true);
      Object.keys(task).forEach((key) => {
        setValue(
          key as keyof TaskFormValues,
          task[key as keyof Task] as string
        );
      });
    },
    [setValue]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-indigo-300 dark:from-gray-800 dark:to-gray-900 transition-all ease-in-out duration-500 mt-24">
      <div>
        <Navbar />
        <div className="bg-gradient-to-r from-pink-500 via-purple-800 to-pink-500 [mask-image:linear-gradient(to_right,transparent,white_50%,white_80%,transparent)]"></div>
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-800 dark:text-white transition-colors duration-300">
          TaskFlow Dashboard
        </h1>

        <TaskCreationForm
          onSubmit={addOrUpdateTask}
          setEditingTask={setEditingTask}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingTask={editingTask}
        />

        {/* Kanban Board */}
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
            <div className="mt-10">
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <div className="grid grid-cols-3 gap-6 min-h-[50vh]">
                  {containers.map((container) => (
                    <Container
                      id={container.id}
                      title={container.title}
                      key={container.id}
                    >
                      <SortableContext
                        items={sortedTasks.filter(
                          (task) => task.status === container.title
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="flex items-start flex-col gap-y-4">
                          {sortedTasks
                            .filter((task) => task.status === container.title)
                            .map((task) => (
                              <TaskCard
                                key={task.id}
                                task={task}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                                editTask={editTask}
                                openEditModal={openEditModal}
                              />
                            ))}
                        </div>
                      </SortableContext>
                    </Container>
                  ))}
                </div>
                <DragOverlay>
                  {activeId ? (
                    <TaskCard
                      task={tasks.find((task) => task.id === activeId)!}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                      editTask={editTask}
                      openEditModal={openEditModal}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </TabsContent>
          <TabsContent value="list">
            <TaskList
              tasks={sortedTasks}
              setTasks={setTasks}
              openEditModal={openEditModal}
              editTask={editTask}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Kanban;

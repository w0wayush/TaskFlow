"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { taskSchema } from "@/lib/taskValidationSchema";
import { Task, TaskFormValues } from "@/lib/task";

type StatusType = "To Do" | "In Progress" | "Completed";
type PriorityType = "Low" | "Medium" | "High";

interface TaskCreationFormProps {
  onSubmit: (data: TaskFormValues) => void;
  editingTask?: TaskFormValues | null;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
  filterCriteria: {
    sortBy: string;
    filterByStatus: string;
    filterByPriority: string;
  };
  setFilterCriteria: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      filterByStatus: string;
      filterByPriority: string;
    }>
  >;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({
  onSubmit,
  editingTask,
  setEditingTask,
  filterCriteria,
  setFilterCriteria,
  isModalOpen,
  setIsModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: editingTask || {},
  });

  const selectedDate = watch("dueDate");
  console.log(selectedDate);

  useEffect(() => {
    if (editingTask) {
      // Pre-fill form when editing
      reset(editingTask);
      setIsModalOpen(true); // Automatically open modal when editing
    }
  }, [editingTask, reset, setIsModalOpen]);

  const handleFormSubmit = (data: TaskFormValues) => {
    onSubmit(data);
    reset();
    setIsModalOpen(false);
    setEditingTask(null); // Clear editing task after submission
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setEditingTask(null);
            reset(); // Reset the form on close
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="hover:bg-indigo-500 bg-indigo-600 text-white transition-transform transform hover:scale-105">
            <Plus className="mr-2 h-5 w-5" /> Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className="animate-fade-in-up">
          <DialogHeader>
            <DialogTitle className="text-indigo-600">
              {editingTask ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <Input
              placeholder="Task Title"
              {...register("title")}
              className="focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}

            <Input placeholder="Description" {...register("description")} />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <Select
              onValueChange={(value) => setValue("status", value as StatusType)}
              value={watch("status") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-xs">
                {errors.status.message || ""}
              </p>
            )}

            <Select
              onValueChange={(value) =>
                setValue("priority", value as PriorityType)
              }
              value={watch("priority") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-red-500 text-xs">
                {errors.priority.message || ""}
              </p>
            )}

            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a due date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined} // Set selected date or undefined
                      onSelect={field.onChange} // Update field on date select
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs">
                {errors.dueDate.message || ""}
              </p>
            )}

            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-full"
            >
              {editingTask ? "Save Changes" : "Add Task"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Select
          onValueChange={(value) =>
            setFilterCriteria({ ...filterCriteria, sortBy: value })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority-low">Priority: Low to High</SelectItem>
            <SelectItem value="priority-high">Priority: High to Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setFilterCriteria({ ...filterCriteria, filterByStatus: value })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setFilterCriteria({
              ...filterCriteria,
              filterByPriority: value,
            })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskCreationForm;

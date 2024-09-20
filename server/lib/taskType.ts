import { z } from "zod";

export const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Completed"]),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z
    .union([z.date(), z.string()])
    .optional()
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
});

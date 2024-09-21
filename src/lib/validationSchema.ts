import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "User Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  // terms: z
  //   .boolean()
  //   .refine((val) => val === true, "You must accept the terms and conditions"),
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

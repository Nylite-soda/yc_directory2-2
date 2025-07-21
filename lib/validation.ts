import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(1, "Category is required"),
  link: z.string().url("Please enter a valid URL"),
  pitch: z.string().min(50, "Pitch must be at least 50 characters long"),
});

export const userFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export const updateFormSchema = formSchema.extend({
  id: z.string(),
});

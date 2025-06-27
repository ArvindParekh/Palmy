import { z } from "zod";

export const createPalmletSchema = z.object({
   userId: z.string().min(1, {
      message: "User ID is required",
   }),
   folderNumber: z.string().min(1, {
      message: "Folder number is required",
   }),
   title: z.string().min(1, {
      message: "Title is required",
   }),
   content: z.string().optional().default(""),
});

export const updatePalmletSchema = z.object({
   id: z.string(),
   title: z.string().optional(),
   content: z.string().optional(),
   tags: z.array(z.string()).optional(),
   variables: z.array(z.string()).optional(),
});
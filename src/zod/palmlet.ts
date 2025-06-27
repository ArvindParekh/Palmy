import { z } from "zod";

export const createPalmletSchema = z.object({
   folderNumber: z.string().min(1, {
      message: "Folder number is required",
   }),
   title: z.string().min(1, {
      message: "Title is required",
   }),
   content: z.string().optional().default(""),
   tags: z.array(z.string()).optional(),
   variables: z.array(z.string()).optional(),
});

export const updatePalmletSchema = z.object({
   id: z.string().min(1, {
      message: "ID is required",
   }),
   title: z.string().optional(),
   content: z.string().optional(),
   tags: z.array(z.string()).optional(),
   variables: z.array(z.string()).optional(),
});
import { z } from "zod";

export const createPalmletSchema = z.string().min(1, {
   message: "User ID is required",
});

export const updatePalmletSchema = z.object({
   id: z.string(),
   title: z.string().optional(),
   content: z.string().optional(),
   tags: z.array(z.string()).optional(),
   variables: z.array(z.string()).optional(),
});
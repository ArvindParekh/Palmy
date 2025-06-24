import { z } from "zod";

export const createPalmletSchema = z.string().min(1);

export const updatePalmletSchema = z.object({
    id: z.string().min(1),
    title: z.string().optional().default("Untitled"),
    content: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    variables: z.array(z.string()).optional().default([]),
})
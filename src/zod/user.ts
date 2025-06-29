import { z } from "zod";

export const updateUserSchema = z.object({
   name: z.string().min(1),
});

export const updateUserPasswordSchema = z.object({
   password: z.string().min(1),
   userId: z.string().min(1),
});
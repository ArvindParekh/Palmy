import { z } from "zod";

export const updateUserSchema = z.string().min(1);
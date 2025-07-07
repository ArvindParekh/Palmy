import { z } from "zod";

export const createCommunityTemplateSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(1, "Content is required").max(5000, "Content too long"),
  tags: z.array(z.enum([
    "LinkedIn", "Outreach", "Networking", "FollowUp", 
    "Interview", "PostInterview", "CoverLetter", "Startups", "ColdEmail"
  ])).max(5, "Maximum 5 tags allowed"),
  variables: z.array(z.string()).optional(),
});
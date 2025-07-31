import { z } from "zod";

export const aiAnalysisSchema = z.object({
   toneAnalysis: z.enum(["positive", "negative", "neutral"]).describe("The tone of the text"),
   messageLength: z.enum(["short", "medium", "long"]).describe("The length of the text"),
   proTip: z.string().describe("A pro tip for the user to improve the text"),
});
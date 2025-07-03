"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { systemPrompt } from "@/lib/system-prompt";

type ActionType =
   | "improve"
   | "rephrase"
   | "shorten"
   | "expand"
   | "formal"
   | "casual";

export async function generatePalmletText(
   prompt: string,
   palmletContent: string
) {
   try {
      const result = await generateText({
         model: google("gemini-2.0-flash"),
         system: systemPrompt,
         messages: [
            {
               role: "user",
               content: `Current palmlet content: ${
                  palmletContent || "No content yet"
               }\n\nUser request: ${prompt}`,
            },
         ],
      });

      return {
         success: true,
         text: result.text,
      };
   } catch (error) {
      console.error("Error generating text:", error);
      return {
         success: false,
         error: "Failed to generate text",
      };
   }
}

export async function improvePalmletText(
   text: string,
   action: ActionType,
   context?: string
) {
   // one action handles all toolbar commands with different prompts

   const prompts = {
      improve: `Improve this text while keeping the same meaning and {{variables}}:\n\n${text}`,
      rephrase: `Rephrase this text in different words while keeping {{variables}}:\n\n${text}`,
      shorten: `Make this text more concise while keeping {{variables}}:\n\n${text}`,
      expand: `Expand this text with more detail while keeping {{variables}}:\n\n${text}`,
      formal: `Rewrite this text in a formal tone while keeping {{variables}}:\n\n${text}`,
      casual: `Rewrite this text in a casual tone while keeping {{variables}}:\n\n${text}`,
   };
}

export async function detectVariables(text: string, cursorPosition?: number) {
   // returns suggested {{variables}} for existing text
}

export async function getSuggestions(text: string, cursorPosition?: number) {
   // real-time suggestions (could be debounced) - would cost me a lot!
}

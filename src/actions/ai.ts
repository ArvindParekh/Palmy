"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { systemPrompt } from "@/lib/system-prompt";

export type ActionType =
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

     const systemPrompt = `
  You are a helpful assistant that improves text.
  You are given a selected text, a command, and optional context.
  
  CRITICAL INSTRUCTIONS:
  - You MUST return ONLY the improved version of the selected text
  - Do NOT include any surrounding context or additional text
  - Do NOT include explanations, headers, or commentary
  - Preserve all {{variables}} exactly as they appear
  - The context is provided only for understanding - do not modify or include it in your response
  
  Your response should contain ONLY the improved selected text, nothing else.
  `

   try {
      const result = await generateText({
         model: google("gemini-2.0-flash"),
         system: systemPrompt,
         messages: [
            {
               role: "user",
               content: prompts[action] + (context ? `\n\nAdditional context: ${context}` : ""),
            },
         ],
         temperature: 0.1,
      });

      return {
         success: true,
         text: result.text,
      };
   } catch (error) {
      console.error("Error improving text:", error);
      return {
         success: false,
         error: "Failed to improve text",
      };
   }
}

export async function detectVariables(text: string, cursorPosition?: number) {
   // returns suggested {{variables}} for existing text
   const variableRegex = /\{\{([^}]+)\}\}/g;
   const matches = [];
   let match;
   
   while ((match = variableRegex.exec(text)) !== null) {
      matches.push(match[1]);
   }
   
   return {
      success: true,
      variables: [...new Set(matches)], 
   };
}

export async function getSuggestions(text: string, cursorPosition?: number) {
   // real-time suggestions (could be debounced) - would cost me a lot!
   return {
      success: true,
      suggestions: [],
   };
}

'use server'

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { systemPrompt } from "@/lib/system-prompt";

export async function generatePalmletText(prompt: string, palmletContent: string) {
    try {
        const result = await generateText({
            model: google("gemini-2.0-flash"),
            system: systemPrompt,
            messages: [
                {
                    role: "user",
                    content: `Current palmlet content: ${palmletContent || "No content yet"}\n\nUser request: ${prompt}`,
                },
            ],
        });

        return {
            success: true,
            text: result.text
        };
    } catch (error) {
        console.error("Error generating text:", error);
        return {
            success: false,
            error: "Failed to generate text"
        };
    }
}
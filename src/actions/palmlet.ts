// server actions for palmlet
"use server";

import { prisma } from "@/lib/db";
import { createPalmletSchema, updatePalmletSchema } from "@/zod/palmlet";

export async function createPalmlet(userId: string) {
    const parsedFields = createPalmletSchema.safeParse(userId);

    if (!parsedFields.success) return { message: "Invalid fields", success: false };

    try {
        const newPalmlet = await prisma.palmlet.create({
            data: {
                title: "Untitled",
                userId: parsedFields.data,
            },
        });

        return { message: "Palmlet created successfully", success: true, data: newPalmlet };
    } catch (error) {
        return { message: "Failed to create palmlet", success: false };
    }
}

export async function updatePalmlet(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData);
    const parsedFields = updatePalmletSchema.safeParse(data);

    if (!parsedFields.success) return { message: "Invalid fields", success: false };

    try {
        const updatedPalmlet = await prisma.palmlet.update({
            where: {
                id: parsedFields.data.id,
            },
            data: {
                title: parsedFields.data.title,
                content: parsedFields.data.content,
                tags: {
                    connectOrCreate: parsedFields.data.tags.map((tag) => ({
                        where: { tagName: tag },
                        create: { tagName: tag },
                    })),
                },
                variables: {
                    connectOrCreate: parsedFields.data.variables.map((variable) => ({
                        where: { variableName: variable },
                        create: { variableName: variable },
                    })),
                },
            },
        });

        return { message: "Palmlet updated successfully", success: true, data: updatedPalmlet };
    } catch (error) {
        return { message: "Failed to update palmlet", success: false };
    }
}
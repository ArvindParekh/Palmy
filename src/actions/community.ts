"use server";

import { prisma } from "@/lib/db";
import { createCommunityTemplateSchema } from "@/zod/community";


export async function createCommunityTemplate(data: {
    userId: string;
    title: string;
    content: string;
    tags: string[];
    variables: string[];
}) {
    console.log(data);
    const parsedData = createCommunityTemplateSchema.safeParse(data);

    if (!parsedData.success) {
        return {
            success: false,
            message: "Invalid data",
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    const { userId, title, content, tags, variables } = parsedData.data;

    try {
        const newSharedPalmlet = await prisma.sharedPalmlet.create({
            data: {
                content,
                title,
                userId,
                tags,
                variables: {
                    connectOrCreate: variables?.map(variable => {
                        return {
                            where: {
                                variableName: variable,
                            },
                            create: {
                                variableName: variable,
                            }
                        }
                    })
                }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                        email: true,
                    }
                },
                variables: true,
            }
        })

        return {
            success: true,
            data: newSharedPalmlet
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to create template"
        }
    }
    
}
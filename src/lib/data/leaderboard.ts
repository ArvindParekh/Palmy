import { prisma } from "../db";


export async function getTopTemplates() {
    try {
        const templates = await prisma.sharedPalmlet.findMany({
            orderBy: {
                upvotes: "desc"
            },
            include: {
                user: {
                    select: {
                        name: true,
                    }
                }  
            },
            take: 10
        });

        return {
            success: true,
            data: templates
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to get top templates"
        }
    }
}
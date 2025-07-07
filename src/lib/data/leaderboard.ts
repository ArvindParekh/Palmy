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
            message: "Failed to get top templates",
            data: []
        }
    }
}

export async function getTopCreators() {
    try {
        const creators = await prisma.user.findMany({
            orderBy: {
                sharedPalmlets: {
                    _count: "desc"
                }
            },
            include: {
                sharedPalmlets: true
            },
            take: 10
        })

        return {
            success: true,
            data: creators.map((creator) => ({
                ...creator,
                totalUpvotes: creator.sharedPalmlets.reduce((acc, curr) => acc + curr.upvotes, 0)
            }))
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to get top creators",
            data: []
        }
    }
}
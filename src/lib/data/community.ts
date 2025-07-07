import { prisma } from "../db";

export const getPopularPalmlets = async () => {
    try {
        const trendingPalmlets = await prisma.sharedPalmlet.findMany({
            orderBy: {
                upvotes: "desc",
            },
            include: {
                variables: true,
                user: {
                    select: {
                        name: true,
                        image: true,
                        email: true,
                    }
                }
            },
            take: 10,
        })

        return {
            message: "Trending palmlets fetched successfully",
            success: true,
            data: trendingPalmlets,
        }
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to fetch trending palmlets",
            success: false,
        }
    }
}

export const getLatestPalmlets = async () => {
    try {
        const latestPalmlets = await prisma.sharedPalmlet.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                variables: true,
                user: {
                    select: {
                        name: true,
                        image: true,
                        email: true,
                    }
                }
            },
            take: 10,
        })

        return {
            message: "Latest palmlets fetched successfully",
            success: true,
            data: latestPalmlets,
        }
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to fetch latest palmlets",
            success: false,
        }
    }
}
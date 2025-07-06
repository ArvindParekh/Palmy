import { prisma } from "../db";

export const getPopularPalmlets = async () => {
    try {
        const trendingPalmlets = await prisma.palmlet.findMany({
            where: {
                isPublic: true,
            },
            orderBy: {
                upvotes: "desc",
            },
            take: 10,
        })

        return {
            message: "Trending palmlets fetched successfully",
            success: true,
            data: trendingPalmlets,
        }
    } catch (error) {
        return {
            message: "Failed to fetch trending palmlets",
            success: false,
        }
    }
}

export const getLatestPalmlets = async () => {
    try {
        const latestPalmlets = await prisma.palmlet.findMany({
            where: {
                isPublic: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        })

        return {
            message: "Latest palmlets fetched successfully",
            success: true,
            data: latestPalmlets,
        }
    } catch (error) {
        return {
            message: "Failed to fetch latest palmlets",
            success: false,
        }
    }
}
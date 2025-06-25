import { prisma } from "../db"

export const getPalmlet = async (palmletId: string) => {
    try {
        const palmlet = await prisma.palmlet.findUnique({
            where: {
                id: palmletId,
            },
            include: {
                tags: true,
                variables: true,
            },
        });

        return {
            message: "Palmlet fetched successfully",
            success: true,
            data: palmlet,
        };
    } catch (error) {
        return {
            message: "Failed to fetch palmlet",
        }
    }
}

export const getUserPalmlets = async (userId: string) => {
    try {
        const palmlets = await prisma.palmlet.findMany({
            where: {
                userId: userId,
            },
            include: {
                tags: true,
                variables: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return {
            message: "Palmlets fetched successfully",
            success: true,
            data: palmlets,
        };
    } catch (error) {
        return {
            message: "Failed to fetch palmlets",
            success: false,
            data: [],
        }
    }
}
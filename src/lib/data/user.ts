import { prisma } from "../db"


export const getUserWithPalmlets = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                folders: {
                    include: {
                        palmlets: {
                            include: {
                                tags: true,
                            }
                        },
                    }
                },
            }
        })

        return {
            message: "User fetched successfully",
            success: true,
            data: user,
        };
    } catch (error) {
        return {
            message: "Failed to fetch user",
        }
    }
}

export const getUserInfo = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                emailVerified: true,
            }
        })

        return {
            message: "User info fetched successfully",
            success: true,
            data: user,
        };
    } catch (error) {
        return {
            message: "Failed to fetch user info",
            success: false,
        };
    }
}
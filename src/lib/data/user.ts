import { prisma } from "../db"


export const getUserWithPalmlets = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                palmlets: true,
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
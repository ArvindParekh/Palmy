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
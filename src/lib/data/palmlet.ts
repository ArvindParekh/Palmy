import { prisma } from "../db"
import { Prisma } from "@/generated/prisma/client";

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

export const getFolderPalmlets = async (folderId: string) : Promise<{
    message: string;
    success: boolean;
    data: Prisma.PalmletGetPayload<{
        include: {
            tags: true;
            variables: true;
            folder: true;
        };
    }>[];
}> => {
    try {
        const allPalmlets = await prisma.palmlet.findMany({
            where: {
                folder: {
                    id: folderId,
                }
            },
            include: {
                tags: true,
                variables: true,
                folder: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return {
            message: "Folder palmlets fetched successfully",
            success: true,
            data: allPalmlets,
        };
    } catch (error) {
        return {
            message: "Failed to fetch folder palmlets",
            success: false,
            data: [],
        };
    }
};

export const getFolderInfo = async (folderId: string)=> {
    try {
        const folder = await prisma.palmlet_Folder.findUnique({
            where: {
                id: folderId,
            },
            include: {
                palmlets: true,
                user: true,
            },
        });

        return {
            message: "Folder info fetched successfully",
            success: true,
            data: folder,
        };
    } catch (error) {
        return {
            message: "Failed to fetch folder info",
            success: false,
            data: null,
        };
    }
}

export const getUserPalmlets = async (userId: string) => {
    try {
        const palmlets = await prisma.palmlet.findMany({
            where: {
                folder: {
                    userId: userId,
                }
            },
            include: {
                tags: true,
                variables: true,
                folder: true,
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

export async function getRecentlyEditedPalmlets(userId: string) {
    try {
       const recentlyEditedPalmlets = await prisma.palmlet.findMany({
          where: {
             folder: {
                userId,
             },
          },
          orderBy: {
             updatedAt: "desc",
          },
          take: 3,
          include: {
             tags: true,
             variables: true,
          },
       });
 
       return {
          message: "Recently edited palmlets fetched successfully",
          success: true,
          data: recentlyEditedPalmlets,
       };
    } catch (error) {
       return {
          message: "Failed to fetch recently edited palmlets",
          success: false,
       };
    }
 }

 export async function getUserOnBoardingStatus(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                onboardingCompleted: true,
            }
        })

        return {
            message: "User onboarding status fetched successfully",
            success: true,
            data: user?.onboardingCompleted,
        }
    } catch (error) {
        return {
            message: "Failed to fetch user onboarding status",
            success: false,
            data: false,
        }
    }
 }
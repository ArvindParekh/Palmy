"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPalmletFolder(data: { userId: string, folderName: string, folderDescription: string}) {
    console.log(data);
    const { userId, folderName, folderDescription } = data;

    try {
        const newFolder = await prisma.palmlet_Folder.create({
            data: {
                userId,
                folderName,
                folderDescription
            }
        })

        // Revalidate the palmlets page to show the new folder
        revalidatePath('/palmlets');

        return {
            message: "Folder created successfully",
            success: true,
            data: newFolder
        }
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : "Failed to create folder",
            success: false
        }
    }
}

export async function deletePalmletFolder(data: { userId: string, folderName: string }) {
    const { userId, folderName } = data;

    try {
        const deletedFolder = await prisma.palmlet_Folder.delete({
            where: {
                userId_folderName: {
                    userId,
                    folderName
                }
            }
        })

        return {
            message: "Folder deleted successfully",
            success: true,
            data: deletedFolder
        }
    } catch (error) {
        return {
            message: "Failed to delete folder",
            success: false
        }
    }
}

export async function updatePalmletFolder(data: { userId: string, folderName: string, folderDescription: string }) {
    const { userId, folderName, folderDescription } = data;

    try {
        const updatedFolder = await prisma.palmlet_Folder.update({
            where: {
                userId_folderName: {
                    userId,
                    folderName
                }
            },
            data: {
                folderDescription,
                folderName
            }
        })

        return {
            message: "Folder updated successfully",
            success: true,
            data: updatedFolder
        }
    } catch (error) {
        return {
            message: "Failed to update folder",
            success: false
        }
    }
}

export async function getPalmletFolders(userId: string) {
    try {
        const folders = await prisma.palmlet_Folder.findMany({
            where: {
                userId
            },
            include: {
                palmlets: true
            }
        })

        return {
            message: "Folders fetched successfully",
            success: true,
            data: folders
        }
    } catch (error) {
        return {
            message: "Failed to fetch folders",
            success: false
        }
    }
}
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPalmletFolder(data: {
   userId: string;
   folderName: string;
   folderDescription: string;
}) {
   const { userId, folderName, folderDescription } = data;

   try {
      const newFolder = await prisma.palmlet_Folder.create({
         data: {
            userId,
            folderName,
            folderDescription,
         },
      });

      // Revalidate the palmlets page to show the new folder
      revalidatePath("/palmlets");

      return {
         message: "Folder created successfully",
         success: true,
         data: newFolder,
      };
   } catch (error) {
      return {
         message:
            error instanceof Error ? error.message : "Failed to create folder",
         success: false,
      };
   }
}

export async function deletePalmletFolder(folderId: string) {

   try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.palmlet.deleteMany({
            where: {
                folderId: folderId
            }
        })

        return await tx.palmlet_Folder.delete({
            where: {
                id: folderId
            }
        })
      })

      revalidatePath("/palmlets");

      return {
         message: "Folder deleted successfully",
         success: true,
         data: result,
      };
   } catch (error) {
      console.log(error);
      return {
         message: "Failed to delete folder",
         success: false,
      };
   }
}

export async function updatePalmletFolder(data: {
   folderId: string;
   folderName: string;
   folderDescription: string;
}) {
   const { folderId, folderName, folderDescription } = data;

   try {
      const updatedFolder = await prisma.palmlet_Folder.update({
         where: {
            id: folderId,
         },
         data: {
            folderDescription,
            folderName,
         },
      });

      revalidatePath("/palmlets");

      return {
         message: "Folder updated successfully",
         success: true,
         data: updatedFolder,
      };
   } catch (error) {
      return {
         message: "Failed to update folder",
         success: false,
      };
   }
}

export async function getPalmletFolders(userId: string) {
   try {
      const folders = await prisma.palmlet_Folder.findMany({
         where: {
            userId,
         },
         include: {
            palmlets: true,
         },
      });

      return {
         message: "Folders fetched successfully",
         success: true,
         data: folders,
      };
   } catch (error) {
      return {
         message: "Failed to fetch folders",
         success: false,
      };
   }
}

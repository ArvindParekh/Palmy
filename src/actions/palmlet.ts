// server actions for palmlet
"use server";

import { prisma } from "@/lib/db";
import { createPalmletSchema, updatePalmletSchema } from "@/zod/palmlet";
import { revalidatePath } from "next/cache";

export async function createNewPalmlet(folderNumber: string, title: string, content: string, tags: string[], variables: string[]) {
   const parsedFields = createPalmletSchema.safeParse({ folderNumber, title, content, tags, variables });

   if (!parsedFields.success)
      return { message: "Invalid fields", success: false };

   try {
      const newPalmlet = await prisma.palmlet.create({
         data: {
            title: parsedFields.data.title,
            content: parsedFields.data.content,
            folder: {
               connect: {
                  id: folderNumber,
               },
            },
            tags: {
               connectOrCreate: parsedFields.data.tags?.map((tag) => ({
                  where: { tagName: tag },
                  create: { tagName: tag },
               })),
            },
            variables: {
               connectOrCreate: parsedFields.data.variables?.map(
                  (variable) => ({
                     where: { variableName: variable },
                     create: { variableName: variable },
                  })
               ),
            },
         },
      });

      return {
         message: "Palmlet created successfully",
         success: true,
         data: newPalmlet,
      };
   } catch (error) {
      return { message: "Failed to create palmlet", success: false };
   }
}

export async function updatePalmlet(id: string, title: string, content: string, tags: string[], variables: string[], folderNumber: string) {
   const parsedFields = updatePalmletSchema.safeParse({ id, title, content, tags, variables });

   if (!parsedFields.success)
      return { message: "Invalid fields", success: false };

   try {
      const updatedPalmlet = await prisma.palmlet.update({
         where: {
            id: parsedFields.data.id,
         },
         data: {
            title: parsedFields.data.title,
            content: parsedFields.data.content,
            tags: {
               connectOrCreate: parsedFields.data.tags?.map((tag) => ({
                  where: { tagName: tag },
                  create: { tagName: tag },
               })),
            },
            variables: {
               connectOrCreate: parsedFields.data.variables?.map(
                  (variable) => ({
                     where: { variableName: variable },
                     create: { variableName: variable },
                  })
               ),
            },
         },
      });

      revalidatePath(`/palmlets/${folderNumber}/editor/${parsedFields.data.id}`);

      return {
         message: "Palmlet updated successfully",
         success: true,
         data: updatedPalmlet,
      };
   } catch (error) {
      return { message: "Failed to update palmlet", success: false };
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

export async function addTagsToPalmlet(id: string, newTags: string[], folderNumber: string) {
   try {
      const currentPalmlet = await prisma.palmlet.findUnique({
         where: { id },
         include: { tags: true, variables: true }
      });

      if (!currentPalmlet) {
         return { message: "Palmlet not found", success: false };
      }

      const existingTagNames = currentPalmlet.tags.map(tag => tag.tagName);
      const allTags = [...existingTagNames, ...newTags];

      const result = await updatePalmlet(
         id,
         currentPalmlet.title,
         currentPalmlet.content || "",
         allTags,
         currentPalmlet.variables.map(v => v.variableName),
         folderNumber
      );

      revalidatePath(`/palmlets/${folderNumber}`);

      return {
         message: "Tags added successfully",
         success: result.success,
         data: result.data,
      };
   } catch (error) {
      return {
         message: "Failed to add tags",
         success: false,
      };
   }
}

export async function deletePalmlet(id: string, folderNumber: string) {
   try {
      const deletedPalmlet = await prisma.palmlet.delete({
         where: {
            id: id,
         },
      });

      revalidatePath(`/palmlets/${folderNumber}`);

      return {
         message: "Palmlet deleted successfully",
         success: true,
         data: deletedPalmlet,
      };
   } catch (error) {
      return {
         message: "Failed to delete palmlet",
         success: false,
      };
   }
}

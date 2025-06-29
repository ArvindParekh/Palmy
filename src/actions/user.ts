// server actions for user
"use server";

import { auth } from "@/lib/auth";
import { updateUserSchema } from "@/zod/user";
import { headers } from "next/headers";

export async function updateUserDetails(userId: string, name: string) {
   const validatedFields = updateUserSchema.safeParse({
      name,
   });

   if (!validatedFields.success)
      return { message: "Invalid fields", success: false };

   const { status } = await auth.api.updateUser({
      query: {
         id: userId,
      },
      body: {
         name: validatedFields.data.name,
      },
      headers: await headers(),
   });

   if (!status)
      return { message: "Failed to update user", success: false };

   return { message: "User updated successfully", success: true };
}

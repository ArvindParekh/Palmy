// server actions for user
"use server";

import { auth } from "@/lib/auth";
import { updateUserPasswordSchema, updateUserSchema } from "@/zod/user";
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

   if (!status) return { message: "Failed to update user", success: false };

   return { message: "User updated successfully", success: true };
}

export async function updateUserPassword(userId: string, newPassword: string) {
   const validatedFields = updateUserPasswordSchema.safeParse({
      password: newPassword,
      userId,
   });

   if (!validatedFields.success)
      return { message: "Invalid fields", success: false };

   const ctx = await auth.$context;
   const hash = await ctx.password.hash(newPassword);
   try {
      const res = await ctx.internalAdapter.updatePassword(userId, hash);

      return { message: "Password updated successfully", success: true };
   } catch (error) {
      return {
         message: "Failed to update password",
         success: false,
         error: error,
      };
   }
}

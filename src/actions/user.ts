// server actions for user
"use server";

import { auth } from "@/lib/auth";
import { updateUserSchema } from "@/zod/user";
import { headers } from "next/headers";

export async function updateUserDetails(prevState: any, formData: FormData) {
   const validatedFields = updateUserSchema.safeParse(formData.get("name"));

   if (!validatedFields.success)
      return { message: "Invalid fields", success: false };

   const { status } = await auth.api.updateUser({
      body: {
         name: validatedFields.data,
      },
      headers: await headers(),
   });

   if (!status)
      return { message: "Failed to update user", success: false };

   return { message: "User updated successfully", success: true };
}

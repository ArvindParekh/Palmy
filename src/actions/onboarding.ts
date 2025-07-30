"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserOnboardingStatus(status: boolean, userId: string) {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                onboardingCompleted: status
            }
        })

        revalidatePath("/dashboard");

        return {
            message: "User onboarding status updated successfully",
            success: true,
        }
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : "Failed to update user onboarding status",
            success: false,
        }
    }
}
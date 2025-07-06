import CommunityPage from "@/components/community/community-client-page";
import { getLatestPalmlets, getPopularPalmlets } from "@/lib/data/community";
import { getUserWithPalmlets } from "@/lib/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";


export default async function Community() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const popularPalmlets = await getPopularPalmlets();
    const latestPalmlets = await getLatestPalmlets();
    const userTemplates = await getUserWithPalmlets(session?.user?.id as string);


    return (
        <div className="w-full min-h-screen p-4 md:p-12 space-y-12">
            <Toaster />
            <CommunityPage popularPalmlets={popularPalmlets.data} latestPalmlets={latestPalmlets.data} userTemplates={userTemplates.data} />
        </div>
    )
}
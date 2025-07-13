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
        <div className="relative w-full min-h-screen">
            <div className="absolute inset-0 w-full h-full opacity-50 bg-grid"></div>
            <div className="relative z-10">
                <Toaster />
                <CommunityPage popularPalmlets={popularPalmlets.data || []} latestPalmlets={latestPalmlets.data || []} userTemplates={userTemplates?.data || null} />
            </div>
        </div>
    )
}
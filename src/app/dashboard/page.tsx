import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log(session);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
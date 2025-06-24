"use client";

import { authClient } from "@/lib/auth-client";

export default function ClientPage() {

    const { data: session, isPending, error, refetch } = authClient.useSession();

    console.log(session);

    return (
        <div>
            <h1>Client Page</h1>
        </div>
    );
}
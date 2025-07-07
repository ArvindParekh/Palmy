"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Analytics } from "@vercel/analytics/next"
// import { ModeToggle } from "@/components/theme/mode-toggle"

import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => {
                // Clear router cache (protected routes)
                router.refresh()
            }}
            Link={Link}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                {/* <ModeToggle /> */}
            </ThemeProvider>
            <Analytics />
        </AuthUIProvider>
    )
}
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Analytics } from "@vercel/analytics/next"
// import { ModeToggle } from "@/components/theme/mode-toggle"

import { authClient } from "@/lib/auth-client"
import { TourProvider } from '@reactour/tour'
import { steps, tourStyles } from "@/lib/onboarding-steps"

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
            social={{
                providers: ["google"],
            }}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <TourProvider
                    steps={steps}
                    showBadge={true}
                    showCloseButton={true}
                    showNavigation={true}
                    className="rounded-lg"
                    styles={tourStyles}
                >
                    {children}
                </TourProvider>
                {/* <ModeToggle /> */}
            </ThemeProvider>
            <Analytics />
        </AuthUIProvider>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-6">
        <SidebarTrigger className="w-8 h-8" />
      </div>
    </header>
  )
}

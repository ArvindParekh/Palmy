"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Plus } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-6">
        <SidebarTrigger className="w-8 h-8" />

        <div className="flex-1 flex items-center gap-4 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search templates..."
              className="pl-10 border-neutral-200 dark:border-neutral-800 bg-transparent focus:bg-white dark:focus:bg-neutral-900"
            />
          </div>
        </div>

        <Button
          size="sm"
          className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>
    </header>
  )
}

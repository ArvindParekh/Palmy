"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutGrid, List, Plus, Search } from "lucide-react"

interface FolderToolbarProps {
  searchQuery: string
  onSearch: (query: string) => void
  onNewTemplate: () => void
  viewMode: "grid" | "list"
  onViewChange: (mode: "grid" | "list") => void
}

export function FolderToolbar({
  searchQuery,
  onSearch,
  onNewTemplate,
  viewMode,
  onViewChange,
}: FolderToolbarProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <Input
          placeholder="Search templates..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewChange("list")}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
      <Button onClick={onNewTemplate}>
        <Plus className="w-4 h-4 mr-2" />
        New Template
      </Button>
    </div>
  )
} 
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CommunityFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeSort: string;
    setActiveSort: (sort: string) => void;
    activeTags: string[];
    setActiveTags: (tags: string[]) => void;
    allTags: string[];
}

export function CommunityFilters({ 
    searchQuery, setSearchQuery, 
    activeSort, setActiveSort,
    activeTags, setActiveTags,
    allTags
}: CommunityFiltersProps) {

  const handleTagToggle = (tag: string) => {
    setActiveTags(
        activeTags.includes(tag) 
            ? activeTags.filter(t => t !== tag)
            : [...activeTags, tag]
    )
  }

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                placeholder="Search templates..."
                className="pl-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filter Tags
                    {activeTags.length > 0 && ` (${activeTags.length})`}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {allTags.map(tag => (
                         <DropdownMenuCheckboxItem
                            key={tag}
                            checked={activeTags.includes(tag)}
                            onCheckedChange={() => handleTagToggle(tag)}
                        >
                            {tag}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-800">
        <Tabs value={activeSort} onValueChange={setActiveSort} className="w-full">
            <TabsList className="bg-transparent p-0">
            <TabsTrigger value="recent" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 dark:data-[state=active]:border-neutral-100 rounded-none -mb-px px-4">Recent</TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 dark:data-[state=active]:border-neutral-100 rounded-none -mb-px px-4">Popular</TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 dark:data-[state=active]:border-neutral-100 rounded-none -mb-px px-4">Trending</TabsTrigger>
            </TabsList>
        </Tabs>
        </div>
    </div>
  );
} 
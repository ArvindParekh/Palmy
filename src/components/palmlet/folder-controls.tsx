"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  SortAsc,
  SortDesc
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { createPalmlet } from "@/actions/palmlet";

type ViewMode = 'grid' | 'list';
type SortBy = 'updated' | 'created' | 'title' | 'variables';
type SortOrder = 'asc' | 'desc';

interface Tag {
  tagName: string;
}

interface FolderControlsProps {
  allTags: Tag[];
  folderName: string;
  onFiltersChange: (filters: {
    searchQuery: string;
    selectedTags: string[];
    sortBy: SortBy;
    sortOrder: SortOrder;
    viewMode: ViewMode;
  }) => void;
}

export function FolderControls({ allTags, folderName, onFiltersChange }: FolderControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('updated');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const router = useRouter();

  const updateFilters = () => {
    const filters = {
      searchQuery,
      selectedTags,
      sortBy,
      sortOrder,
      viewMode
    };
    onFiltersChange(filters);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setTimeout(() => {
      onFiltersChange({
        searchQuery: value,
        selectedTags,
        sortBy,
        sortOrder,
        viewMode
      });
    }, 0);
  };

  const handleTagToggle = (tagName: string) => {
    const newTags = selectedTags.includes(tagName)
      ? selectedTags.filter(t => t !== tagName)
      : [...selectedTags, tagName];
    setSelectedTags(newTags);
    setTimeout(() => {
      onFiltersChange({
        searchQuery,
        selectedTags: newTags,
        sortBy,
        sortOrder,
        viewMode
      });
    }, 0);
  };

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setTimeout(() => {
      onFiltersChange({
        searchQuery,
        selectedTags,
        sortBy: newSortBy,
        sortOrder,
        viewMode
      });
    }, 0);
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setTimeout(() => {
      onFiltersChange({
        searchQuery,
        selectedTags,
        sortBy,
        sortOrder: newOrder,
        viewMode
      });
    }, 0);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setTimeout(() => {
      onFiltersChange({
        searchQuery,
        selectedTags,
        sortBy,
        sortOrder,
        viewMode: mode
      });
    }, 0);
  };

  const handleNewTemplate = async () => {
    // In a real app, get userId from session/auth
    const result = await createPalmlet("user-123", folderName); 
    if (result.success && result.data) {
      router.push(`/palmlets/editor/${result.data.id}`);
    } else {
      // Handle error, maybe with a toast notification
      console.error(result.message);
    }
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setTimeout(() => {
      onFiltersChange({
        searchQuery,
        selectedTags: [],
        sortBy,
        sortOrder,
        viewMode
      });
    }, 0);
  };

  return (
    <>
      {/* Controls Section */}
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search templates, content, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-gray-200 dark:border-gray-700"
              />
            </div>
            
            {/* Tag Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  <Filter className="w-4 h-4 mr-2" />
                  Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {allTags.map(tag => (
                  <DropdownMenuItem
                    key={tag.tagName}
                    onClick={() => handleTagToggle(tag.tagName)}
                    className="flex items-center justify-between"
                  >
                    <span>{tag.tagName}</span>
                    {selectedTags.includes(tag.tagName) && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
                {allTags.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearAllFilters}>
                      Clear all filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {sortOrder === 'desc' ? <SortDesc className="w-4 h-4 mr-2" /> : <SortAsc className="w-4 h-4 mr-2" />}
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[
                  { key: 'updated', label: 'Last Updated' },
                  { key: 'created', label: 'Created Date' },
                  { key: 'title', label: 'Title' },
                  { key: 'variables', label: 'Variables Count' }
                ].map(sort => (
                  <DropdownMenuItem
                    key={sort.key}
                    onClick={() => handleSortChange(sort.key as SortBy)}
                    className={cn(sortBy === sort.key && "bg-accent")}
                  >
                    {sort.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSortOrderChange}>
                  {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('grid')}
                className="h-8 w-8 p-0"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* New Template */}
            <Button onClick={handleNewTemplate}>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {selectedTags.length > 0 && (
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtered by:</span>
            {selectedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        )}
      </div>
    </>
  );
} 
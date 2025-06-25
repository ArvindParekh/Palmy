"use client";

import { Suspense, useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  FolderOpen,
  SortAsc,
  SortDesc,
  Calendar,
  Tag,
  Hash,
  FileText,
  Zap,
  TrendingUp,
  Clock
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
import { TemplateCard } from "@/components/palmlet/template-card";
import { getUserPalmlets } from "@/lib/data/palmlet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPalmlet } from "@/actions/palmlet";

interface Palmlet {
  id: string;
  title: string;
  content?: string | null;
  tags: Array<{ tagName: string }>;
  variables: Array<{ variableName: string }>;
  createdAt: Date;
  updatedAt: Date;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'updated' | 'created' | 'title' | 'variables';
type SortOrder = 'asc' | 'desc';

export default function FolderPage({
  params,
}: {
  params: {
    folderNumber: string;
  };
}) {
  const [templates, setTemplates] = useState<Palmlet[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Palmlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('updated');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  // Simulated folder data - in real app, this would come from params or API
  const folderData = {
    name: `Templates Folder ${params.folderNumber}`,
    description: "Your job application templates organized for efficiency",
    icon: "💼",
    colorTheme: getFolderTheme(params.folderNumber)
  };

  // Mock user ID - in real app, get from auth
  const mockUserId = "user-123";

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterAndSortTemplates();
  }, [templates, searchQuery, sortBy, sortOrder, selectedTags]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      // In real app, filter by folder
      // const result = await getUserPalmlets(mockUserId);
      // if (result.success) {
        setTemplates([{
          id: "1",
          title: "Template 1",
          tags: [{ tagName: "Tag 1" }],
          variables: [{ variableName: "Variable 1" }],
          createdAt: new Date(),
          updatedAt: new Date(),
        }]);
      // }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTemplates = () => {
    let filtered = [...templates];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.tagName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(template =>
        template.tags.some(tag => selectedTags.includes(tag.tagName))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'updated':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'variables':
          comparison = a.variables.length - b.variables.length;
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredTemplates(filtered);
  };

  const allTags = Array.from(new Set(templates.flatMap(t => t.tags.map(tag => tag.tagName))));
  const colorThemes = ['sage', 'lavender', 'cream', 'pearl', 'stone', 'mist'] as const;

  const handleUseTemplate = (id: string) => {
    // Handle template usage - open personalization modal
    console.log('Use template:', id);
  };

  const handleEditTemplate = (id: string) => {
    router.push(`/palmlets/editor/${id}`);
  };

  const handleCopyTemplate = (id: string) => {
    // Duplicate template
    console.log('Copy template:', id);
  };

  const handleNewTemplate = async () => {
    // In a real app, get userId from session/auth
    const result = await createPalmlet("user-123"); 
    if (result.success && result.data) {
      router.push(`/palmlets/editor/${result.data.id}`);
    } else {
      // Handle error, maybe with a toast notification
      console.error(result.message);
    }
  };

  if (loading) {
    return <TemplatesLoadingSkeleton />;
  }

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-gray-50/70 to-slate-100/60 dark:from-slate-950/40 dark:via-gray-950/30 dark:to-slate-900/20" />
        
        <div className="relative z-10 p-8 pb-16">
          {/* Navigation */}
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/palmlets">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{folderData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {folderData.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {folderData.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-slate-600/40">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredTemplates.length}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Templates</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-slate-600/40">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <Tag className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{allTags.length}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Tags</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-slate-600/40">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50">
                  <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {templates.reduce((sum, t) => sum + t.variables.length, 0)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Variables</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-slate-600/40">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50">
                  <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>{tag}</span>
                    {selectedTags.includes(tag) && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
                {selectedTags.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedTags([])}>
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
                    onClick={() => setSortBy(sort.key as SortBy)}
                    className={cn(sortBy === sort.key && "bg-accent")}
                  >
                    {sort.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
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
                onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Templates Grid/List */}
      <div className="p-8">
        {filteredTemplates.length === 0 ? (
          <EmptyState searchQuery={searchQuery} onNewTemplateClick={handleNewTemplate} />
        ) : (
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 max-w-4xl"
          )}>
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                title={template.title}
                content={template.content}
                tags={template.tags}
                variables={template.variables}
                createdAt={template.createdAt}
                updatedAt={template.updatedAt}
                colorTheme={colorThemes[index % colorThemes.length]}
                variant={viewMode === 'list' ? 'compact' : 'default'}
                onEdit={handleEditTemplate}
                onCopy={handleCopyTemplate}
                onUse={handleUseTemplate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getFolderTheme(folderNumber: string): 'sage' | 'lavender' | 'cream' | 'pearl' | 'stone' | 'mist' {
  const themes = ['sage', 'lavender', 'cream', 'pearl', 'stone', 'mist'] as const;
  const index = parseInt(folderNumber) % themes.length;
  return themes[index];
}

function TemplatesLoadingSkeleton() {
  return (
    <div className="w-full min-h-screen p-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        
        {/* Controls skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-80" />
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        {/* Templates skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ searchQuery, onNewTemplateClick }: { searchQuery: string; onNewTemplateClick: () => void; }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
        <FolderOpen className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {searchQuery ? 'No templates found' : 'No templates yet'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {searchQuery 
          ? `No templates match "${searchQuery}". Try a different search term or create a new template.`
          : 'Start building your template library by creating your first template.'
        }
      </p>
      <Button onClick={onNewTemplateClick}>
        <Plus className="w-4 h-4 mr-2" />
        Create Template
      </Button>
    </div>
  );
}
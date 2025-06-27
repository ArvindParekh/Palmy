"use client";

import { 
  FileText, 
  Copy, 
  Edit, 
  MoreHorizontal, 
  Calendar,
  Tag,
  Hash,
  TrendingUp,
  Star,
  Clock,
  Eye,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface TemplateCardProps {
  id: string;
  title: string;
  content?: string | null;
  tags: Array<{ tagName: string }>;
  variables: Array<{ variableName: string }>;
  createdAt: Date;
  updatedAt: Date;
  colorTheme?: 'sage' | 'lavender' | 'cream' | 'pearl' | 'stone' | 'mist';
  variant?: 'default' | 'compact' | 'detailed';
  onEdit?: (id: string) => void;
  onCopy?: (id: string) => void;
  onUse?: (id: string) => void;
  folderId: string;
}

export function TemplateCard({ 
  id,
  title, 
  content,
  tags,
  variables,
  createdAt,
  updatedAt,
  colorTheme = 'sage',
  variant = 'default',
  onEdit,
  onCopy,
  onUse,
  folderId
}: TemplateCardProps) {
  const router = useRouter();
  const colorClasses = {
    sage: {
      gradient: 'from-emerald-50/90 via-teal-50/70 to-emerald-100/60 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-900/20',
      accent: 'bg-emerald-100/80 text-emerald-800 border-emerald-200/60 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700/40',
      icon: 'text-emerald-700 dark:text-emerald-300',
      ring: 'ring-emerald-500/20 dark:ring-emerald-400/20',
    },
    lavender: {
      gradient: 'from-purple-50/90 via-violet-50/70 to-purple-100/60 dark:from-purple-950/40 dark:via-violet-950/30 dark:to-purple-900/20',
      accent: 'bg-purple-100/80 text-purple-800 border-purple-200/60 dark:bg-purple-900/60 dark:text-purple-200 dark:border-purple-700/40',
      icon: 'text-purple-700 dark:text-purple-300',
      ring: 'ring-purple-500/20 dark:ring-purple-400/20',
    },
    cream: {
      gradient: 'from-amber-50/90 via-yellow-50/70 to-amber-100/60 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-900/20',
      accent: 'bg-amber-100/80 text-amber-800 border-amber-200/60 dark:bg-amber-900/60 dark:text-amber-200 dark:border-amber-700/40',
      icon: 'text-amber-700 dark:text-amber-300',
      ring: 'ring-amber-500/20 dark:ring-amber-400/20',
    },
    pearl: {
      gradient: 'from-slate-50/90 via-gray-50/70 to-slate-100/60 dark:from-slate-950/40 dark:via-gray-950/30 dark:to-slate-900/20',
      accent: 'bg-slate-100/80 text-slate-800 border-slate-200/60 dark:bg-slate-900/60 dark:text-slate-200 dark:border-slate-700/40',
      icon: 'text-slate-700 dark:text-slate-300',
      ring: 'ring-slate-500/20 dark:ring-slate-400/20',
    },
    stone: {
      gradient: 'from-stone-50/90 via-neutral-50/70 to-stone-100/60 dark:from-stone-950/40 dark:via-neutral-950/30 dark:to-stone-900/20',
      accent: 'bg-stone-100/80 text-stone-800 border-stone-200/60 dark:bg-stone-900/60 dark:text-stone-200 dark:border-stone-700/40',
      icon: 'text-stone-700 dark:text-stone-300',
      ring: 'ring-stone-500/20 dark:ring-stone-400/20',
    },
    mist: {
      gradient: 'from-blue-50/90 via-sky-50/70 to-blue-100/60 dark:from-blue-950/40 dark:via-sky-950/30 dark:to-blue-900/20',
      accent: 'bg-blue-100/80 text-blue-800 border-blue-200/60 dark:bg-blue-900/60 dark:text-blue-200 dark:border-blue-700/40',
      icon: 'text-blue-700 dark:text-blue-300',
      ring: 'ring-blue-500/20 dark:ring-blue-400/20',
    }
  };

  const colors = colorClasses[colorTheme];
  const previewText = content ? content.slice(0, 150) + (content.length > 150 ? '...' : '') : 'No content';
  const timeAgo = getTimeAgo(updatedAt);

  if (variant === 'compact') {
    return (
      <div className="group relative w-full rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/50 dark:border-slate-600/40 hover:bg-white/90 dark:hover:bg-slate-900/90 shadow-lg hover:shadow-xl transition-all duration-400 cursor-pointer p-6">
        <div className="flex items-center space-x-4">
          <div className={cn("p-3 rounded-xl border backdrop-blur-sm group-hover:scale-105 transition-transform duration-300", colors.accent)}>
            <FileText className={cn("w-5 h-5", colors.icon)} />
          </div>
          
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed opacity-90">
              {previewText}
            </p>
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
              <span>{variables.length} variables</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.tagName}
              </Badge>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="opacity-60 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onUse?.(id)}>
                  <Zap className="w-4 h-4 mr-2" />
                  Use Template
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/palmlets/${folderId}/editor/${id}`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopy?.(id)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-full rounded-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-500 cursor-pointer overflow-hidden">
      {/* Gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70 group-hover:opacity-90 transition-opacity duration-500", colors.gradient)} />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={cn("p-3 rounded-2xl border backdrop-blur-sm group-hover:scale-110 transition-transform duration-300", colors.accent)}>
            <FileText className={cn("w-5 h-5", colors.icon)} />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="opacity-60 group-hover:opacity-100 hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onUse?.(id)}>
                <Zap className="w-4 h-4 mr-2" />
                Use Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/palmlets/${folderId}/editor/${id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopy?.(id)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Title and Preview */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 opacity-90">
            {previewText}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 text-gray-700 dark:text-gray-200 border-white/30 dark:border-slate-600/30"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag.tagName}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/60 dark:bg-slate-800/60">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/30 dark:border-slate-600/30">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Hash className="w-3 h-3" />
              <span>{variables.length} variables</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => onUse?.(id)}
            className={cn(
              "opacity-80 group-hover:opacity-100 transition-opacity duration-300",
              "bg-white/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-200",
              "hover:bg-white dark:hover:bg-slate-800 backdrop-blur-sm",
              "border border-white/30 dark:border-slate-600/30"
            )}
          >
            <Zap className="w-3 h-3 mr-1" />
            Use
          </Button>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  } else {
    return 'Just now';
  }
} 
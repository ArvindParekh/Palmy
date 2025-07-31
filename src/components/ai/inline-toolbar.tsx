"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Languages, ChevronsRightLeft, ArrowRightLeft, Drama, Mic, PencilRuler, WholeWord, ThumbsUp, ThumbsDown, LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ActionType } from "@/actions/ai";

interface InlineAIToolbarProps {
  position: { top: number; left: number };
  onCommand: (command: ActionType) => void;
}

export function InlineAIToolbar({ position, onCommand }: InlineAIToolbarProps) {
  const actions : {
    id: ActionType,
    icon: LucideIcon,
    label: string
  }[] = [
    { id: "rephrase", icon: Languages, label: "Rephrase" },
    { id: "shorten", icon: ChevronsRightLeft, label: "Shorten" },
    { id: "expand", icon: ArrowRightLeft, label: "Expand" },
  ];
  
  const tones : {
    id: ActionType,
    icon: LucideIcon,
    label: string
  }[] = [
    { id: "formal", icon: Drama, label: "Formal" },
    { id: "casual", icon: Mic, label: "Casual" },
  ];

  if (!position.top) return null;

  return (
    <div
      className="absolute z-10 bg-card text-foreground rounded-lg shadow-2xl flex items-center p-1 border border-border"
      style={{ 
        top: position.top, 
        left: position.left,
        transform: 'translate(-50%, -100%)'
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => onCommand('improve')}>
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Improve
            </Button>
          </TooltipTrigger>
          <TooltipContent>Improve writing</TooltipContent>
        </Tooltip>
        
        <Separator orientation="vertical" className="h-6 bg-neutral-700 mx-1" />

        {actions.map(action => (
          <Tooltip key={action.id}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8" onClick={() => onCommand(action.id)}>
                <action.icon className="w-4 h-4" />
                <span className="sr-only">{action.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        ))}

        <Separator orientation="vertical" className="h-6 bg-neutral-700 mx-1" />

        {tones.map(tone => (
          <Tooltip key={tone.id}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8" onClick={() => onCommand(tone.id)}>
                <tone.icon className="w-4 h-4" />
                <span className="sr-only">{tone.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Change tone to {tone.label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import { Bot, Sparkles, Wand2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface AICommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => void;
  loading?: boolean;
}

export function AICommandMenu({ open, onOpenChange, onGenerate, loading }: AICommandMenuProps) {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-black border-slate-200 dark:border-slate-800 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <DialogTitle className="text-xl">Generate with AI</DialogTitle>
                <DialogDescription>
                    Describe the template you want to create. Be as specific as possible.
                </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A professional cover letter for a Senior Software Engineer role at a fast-growing tech startup, highlighting skills in TypeScript, Next.js, and system design.'"
            className="h-32 resize-none text-base border-slate-200 dark:border-slate-700 focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>

        <DialogFooter>
          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="group relative"
          >
             {loading ? (
                <span>Generating...</span>
             ) : (
                <>
                    <Sparkles className="w-4 h-4 mr-2 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    Generate
                </>
             )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
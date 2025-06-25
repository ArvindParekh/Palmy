"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Sparkles, Wand2, Eye, PanelRight, Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AICommandMenu } from "@/components/ai/command-menu";
import { InlineAIToolbar } from "@/components/ai/inline-toolbar";

// This will be the main editor page.
export default function EditorPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState(
    "Hey {{Name}},\n\nI saw your recent post on {{Topic}} and was really impressed by your insights on {{SpecificPoint}}."
  );
  const [title, setTitle] = useState("My Awesome Template");
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selection, setSelection] = useState<{text: string; start: number; end: number} | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const variables = content.match(/{{(.*?)}}/g)?.map(v => v.slice(2, -2)) || [];

  const handleGenerate = async (prompt: string) => {
    console.log("Generating with prompt:", prompt);
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    const generatedContent = `/* AI Generated content for prompt: "${prompt}" */\n\nThis is the AI-generated template content. It should be replaced with a real API call to a language model.`;
    setContent(generatedContent);
    setIsGenerating(false);
    setIsCommandMenuOpen(false);
  };

  const handleMouseUp = useCallback(() => {
    if (!editorRef.current) return;
    
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText.trim().length > 0) {
      const rect = textarea.getBoundingClientRect();
      
      // Create a temporary element to measure text position more accurately
      const measureDiv = document.createElement('div');
      const styles = window.getComputedStyle(textarea);
      
      measureDiv.style.position = 'absolute';
      measureDiv.style.visibility = 'hidden';
      measureDiv.style.whiteSpace = 'pre-wrap';
      measureDiv.style.wordWrap = 'break-word';
      measureDiv.style.font = styles.font;
      measureDiv.style.fontSize = styles.fontSize;
      measureDiv.style.fontFamily = styles.fontFamily;
      measureDiv.style.lineHeight = styles.lineHeight;
      measureDiv.style.padding = styles.padding;
      measureDiv.style.border = styles.border;
      measureDiv.style.width = textarea.offsetWidth + 'px';
      
      document.body.appendChild(measureDiv);
      
      // Add text up to selection start
      const textBeforeSelection = content.substring(0, start);
      measureDiv.textContent = textBeforeSelection;
      
      // Create a span for the selected text to get its position
      const selectionSpan = document.createElement('span');
      selectionSpan.textContent = selectedText;
      measureDiv.appendChild(selectionSpan);
      
      const spanRect = selectionSpan.getBoundingClientRect();
      
      setToolbarPosition({
        top: rect.top + spanRect.top - measureDiv.getBoundingClientRect().top - 45,
        left: rect.left + spanRect.left - measureDiv.getBoundingClientRect().left + (spanRect.width / 2),
      });
      
      // Clean up
      document.body.removeChild(measureDiv);
      
      setSelection({
        text: selectedText,
        start,
        end
      });
      
      // Restore selection after state update
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          editorRef.current.setSelectionRange(start, end);
        }
      }, 0);
    } else {
      setSelection(null);
    }
  }, [content]);

  const handleAICommand = (command: string) => {
    if (!selection) return;
    console.log(`AI Command: ${command} on text: "${selection.text}"`);
    // Here you would call your AI service
    setSelection(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-50 dark:bg-neutral-950">
      {selection && <InlineAIToolbar position={toolbarPosition} onCommand={handleAICommand} />}
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
        <div className="flex items-center gap-4">
          <Link href="/palmlets/1">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold border-none focus-visible:ring-0 p-0 h-auto" 
            />
            <p className="text-sm text-neutral-500">Last saved 2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
            </Button>
            <Button>
                <Sparkles className="w-4 h-4 mr-2" />
                Save Template
            </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800">
        {/* Editor Panel */}
        <div className="flex flex-col bg-white dark:bg-black p-6">
            <h2 className="text-xl font-semibold mb-4">Editor</h2>
            <Textarea
                ref={editorRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onMouseUp={handleMouseUp}
                onKeyUp={handleMouseUp}
                className="flex-1 w-full text-base bg-transparent border rounded-md p-4 focus-visible:ring-1 focus-visible:ring-blue-500 resize-none"
                placeholder="Write your template here..."
            />
        </div>

        {/* Preview & Variables Panel */}
        <div className="flex flex-col bg-neutral-50 dark:bg-neutral-950 p-6">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <Card className="flex-1">
                <CardContent className="p-4 text-base whitespace-pre-wrap">
                    {content}
                </CardContent>
            </Card>
            <Separator className="my-6" />
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Variables</h3>
                <div className="flex flex-wrap gap-2">
                {variables.length > 0 ? (
                    variables.map((v, i) => <Badge key={i} variant="secondary">{v}</Badge>)
                ) : (
                    <p className="text-sm text-neutral-500">No variables found. Add some with {'{{variable_name}}'}.</p>
                )}
                </div>
            </div>
        </div>
        
        {/* AI Assistant Panel */}
        <div className="flex flex-col bg-white dark:bg-black p-6 border-l border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 mb-4">
                <Bot className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">AI Assistant</h2>
            </div>
            {/* AI Command Menu component will go here */}
            <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsCommandMenuOpen(true)}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI...
                </Button>
            </div>
        </div>
      </div>
      <AICommandMenu
        open={isCommandMenuOpen}
        onOpenChange={setIsCommandMenuOpen}
        onGenerate={handleGenerate}
        loading={isGenerating}
      />
    </div>
  );
} 
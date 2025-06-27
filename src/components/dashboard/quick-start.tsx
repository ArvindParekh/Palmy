"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Book, Bot, FilePlus } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    icon: FilePlus,
    title: "Create from scratch",
    description: "Start with a blank canvas and build your template.",
    href: "/palmlets/editor/new",
    cta: "New Template",
  },
  {
    icon: Bot,
    title: "Generate with AI",
    description: "Describe what you need and let our AI create a draft for you.",
    href: "/palmlets/new/ai",
    cta: "Use AI Assistant",
  },
  {
    icon: Book,
    title: "Browse Community",
    description: "Explore proven templates from top performers in your field.",
    href: "/community",
    cta: "Explore Library",
  },
]

export function QuickStart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => (
        <Link href={action.href} key={action.title}>
          <div className="group relative h-full bg-card border border-border rounded-xl p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <action.icon className="w-5 h-5 text-neutral-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{action.title}</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{action.description}</p>
            <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
              {action.cta}
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

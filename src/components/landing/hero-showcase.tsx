"use client"

import { Check, FileText, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    command: 'palmy create --from="Senior SWE at Google"',
    output: [
      {
        icon: Check,
        text: "Identified key skills: Golang, Kubernetes, GCP, Distributed Systems",
        color: "text-green-400",
        isStrikethrough: false,
      },
      { 
        icon: Check, 
        text: "Generated 3 tailored resume bullet points", 
        color: "text-green-400",
        isStrikethrough: false,
      },
      { 
        icon: Check, 
        text: "Created a draft cover letter", 
        color: "text-green-400",
        isStrikethrough: false,
      },
    ],
  },
  {
    output: [
      {
        icon: FileText,
        text: 'Dear {HiringManagerName}, I was excited to see the Senior Software Engineer position, as my experience in building scalable distributed systems with Go and Kubernetes aligns perfectly with your requirements.',
        color: "text-neutral-500",
        isStrikethrough: true,
      },
      {
        icon: MessageSquare,
        text: "yo {HiringManagerName}, saw you're looking for a SWE...",
        color: "text-neutral-200",
        isStrikethrough: false,
      },
    ],
  },
]

export function HeroShowcase() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl shadow-primary/20 bg-card border border-border">
      <div className="h-10 flex items-center gap-2 px-4 border-b border-neutral-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="text-sm text-neutral-400 ml-auto font-mono">zsh</div>
      </div>
      <div className="p-6 font-mono text-sm">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 1.5, duration: 0.5 }}
            className="mb-4"
          >
            {step.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-neutral-200">{step.command}</span>
              </div>
            )}
            <div className={`mt-2 ${step.command ? "pl-2" : ""}`}>
              {step.output.map((line, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 1.5 + j * 0.3 + 0.5, duration: 0.5 }}
                  className={`flex items-start gap-2 mb-1 ${line.color}`}
                >
                  <line.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className={`text-left flex-1 ${line.isStrikethrough ? "line-through" : ""}`}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

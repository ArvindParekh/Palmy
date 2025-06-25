"use client";

import {
  Folder,
  FilePlus,
  FolderPlus,
  Users,
  Star,
  Book,
  Feather,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PalmletFolderCard, PalmletFolderCardProps } from "@/components/palmlet/palmlet-folder-card";
import { TemplateCard, TemplateCardProps } from "@/components/palmlet/template-card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const folders: PalmletFolderCardProps[] = [
  {
    title: "Cover Letters",
    description: "Tailored letters for software engineering roles.",
    palmletCount: 8,
    colorTheme: "mist",
  },
  {
    title: "Cold Outreach",
    description: "Templates for networking and reaching out to recruiters.",
    palmletCount: 12,
    colorTheme: "lavender",
  },
  {
    title: "Follow-ups",
    description: "Polite and professional follow-up messages.",
    palmletCount: 4,
    colorTheme: "sage",
  },
  {
    title: "Personal Projects",
    description: "Descriptions and pitches for side projects.",
    palmletCount: 2,
    colorTheme: "stone",
  },
];

const recentTemplates: TemplateCardProps[] = [
    {
        id: "1",
        title: "Senior SWE Cover Letter (FAANG)",
        updatedAt: new Date("2024-07-28T14:30:00Z"),
        colorTheme: "mist",
        tags: [{ tagName: "Cover Letter" }, { tagName: "Tech" }],
        variables: [{ variableName: "Company" }, { variableName: "Role" }],
        createdAt: new Date("2024-07-20T10:00:00Z"),
    },
    {
        id: "2",
        title: "LinkedIn Networking Request",
        updatedAt: new Date("2024-07-27T11:00:00Z"),
        colorTheme: "lavender",
        tags: [{ tagName: "Outreach" }, { tagName: "LinkedIn" }],
        variables: [{ variableName: "Name" }, { variableName: "Mutual Connection" }],
        createdAt: new Date("2024-07-15T09:00:00Z"),
    },
    {
        id: "3",
        title: "Post-Interview Thank You",
        updatedAt: new Date("2024-07-25T18:45:00Z"),
        colorTheme: "sage",
        tags: [{ tagName: "Follow-up" }],
        variables: [{ variableName: "Interviewer" }, { variableName: "Role" }],
        createdAt: new Date("2024-06-30T16:00:00Z"),
    }
];


export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen p-4 md:p-8 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tighter">
            Workspace
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Organize your templates into folders and get started quickly.
          </p>
        </div>
        <div className="flex items-center gap-2">
        <Button size="lg" className="group">
          <Feather className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Create New Folder
        </Button>
            <Button variant="outline">
                <FilePlus className="w-4 h-4 mr-2" />
                New Template
            </Button>
        </div>
      </header>

      <main className="space-y-12">
        {/* Folders Section */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
            <Folder className="w-6 h-6 text-neutral-500" />
            My Folders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <Link href="/palmlets/1" key={folder.title}>
                 <PalmletFolderCard {...folder} />
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* Recent Templates Section */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
            <FilePlus className="w-6 h-6 text-neutral-500" />
            Recently Edited
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentTemplates.map((template) => (
              <TemplateCard {...template} key={template.id} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Community Spotlight Section */}
        <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-neutral-500" />
                Community Spotlight
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <CommunityCard 
                title="Top Cover Letters"
                description="Browse the most successful cover letters from the community."
                icon={Users}
                href="/community/cover-letters"
               />
               <CommunityCard 
                title="Template Writing Guide"
                description="Learn how to write effective templates."
                icon={Book}
                href="/guides/writing"
               />
                {/* Placeholder for more cards */}
            </div>
        </section>

      </main>
    </div>
  );
}

const CommunityCard = ({ title, description, icon: Icon, href }: { title: string, description: string, icon: React.ElementType, href: string }) => (
    <Link href={href}>
        <div className="h-full group relative rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start gap-4">
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
            </div>
            <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{description}</p>
            </div>
        </div>
    </Link>
)
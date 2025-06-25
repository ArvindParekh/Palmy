"use client";

import { Crown, Copy, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LeaderboardTab = 'creators' | 'templates' | 'rising' | 'achievements';

interface LeaderboardTabsProps {
  activeTab: LeaderboardTab;
  onTabChange: (tab: LeaderboardTab) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const tabs = [
    { id: 'creators', label: 'Top Creators', icon: Crown },
    { id: 'templates', label: 'Most Forked', icon: Copy },
    { id: 'rising', label: 'Rising Stars', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <div className="px-8 py-8 border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id as LeaderboardTab)}
                className={cn(
                  "relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === tab.id 
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
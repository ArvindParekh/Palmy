"use client";

import React, { useState, useMemo } from "react";
import { CommunityFilters } from "@/components/community/community-filters";
import {
  CommunityTemplatePost,
  // CommunityTemplatePostProps,
} from "@/components/community/community-template-post";
import { ShareTemplatePrompt } from "@/components/community/share-template-prompt";
import { Prisma, SharedPalmletTags } from "@/generated/prisma/client";
import { createCommunityTemplate } from "@/actions/community";
import { toast } from "sonner";

// const initialCommunityPosts: CommunityTemplatePostProps[] = [
//   {
//     id: "ct1",
//     author: {
//       name: "Serena Chen",
//       username: "serenachen",
//       avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
//     },
//     timestamp: "2h ago",
//     title: "The only LinkedIn hook you'll ever need",
//     contentSnippet: `Hey {{Name}},

// I saw your recent post on {{Topic}} and was really impressed by your insights on {{SpecificPoint}}. 

// The way you articulated {{AnotherPoint}} is exactly how I've been thinking about it. I'm also passionate about this space and would love to connect.`,
//     tags: ["LinkedIn", "Outreach", "Networking"],
//     stats: {
//       likes: 128,
//       forks: 45,
//       comments: 12,
//     },
//   },
//   {
//     id: "ct2",
//     author: {
//       name: "Marcus Cole",
//       username: "m_cole",
//       avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
//     },
//     timestamp: "1d ago",
//     title: "Follow-up email that actually gets replies",
//     contentSnippet: `Hi {{InterviewerName}},

// Thank you again for your time yesterday. I really enjoyed learning more about the {{Role}} position and the team at {{Company}}.

// I was particularly excited about {{SpecificProject}} and how my experience in {{YourSkill}} could help drive that forward. 

// Looking forward to hearing about next steps.

// Best,
// {{YourName}}`,
//     tags: ["Follow-up", "Interview", "Post-Interview"],
//     stats: {
//       likes: 89,
//       forks: 22,
//       comments: 5,
//     },
//   },
//   {
//     id: "ct3",
//     author: {
//       name: "Elena Vance",
//       username: "elena_v",
//       avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     },
//     timestamp: "3d ago",
//     title: "Simple, high-impact cover letter for startups",
//     contentSnippet: `Dear {{HiringManager}},

// I'm writing to express my enthusiastic interest in the {{Role}} role at {{Company}}. As a long-time admirer of your work in {{Industry}}, I was thrilled to see this opening. 

// My experience in building {{RelevantSkill}} and my success at {{PreviousCompany}} make me a strong candidate to help you {{CompanyGoal}}.`,
//     tags: ["Cover Letter", "Startups"],
//     stats: {
//       likes: 204,
//       forks: 78,
//       comments: 21,
//     },
//   },
// ];

export default function CommunityPage({ popularPalmlets, latestPalmlets, userTemplates }: { popularPalmlets: Prisma.SharedPalmletGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        image: true;
        email: true;
      }
    },
    variables: true,
  };
}>[], latestPalmlets: Prisma.SharedPalmletGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        image: true;
        email: true;
      }
    },
    variables: true,
  };
}>[], userTemplates: Prisma.UserGetPayload<{
  include: {
    folders: {
      include: {
        palmlets: {
          include: {
            tags: true,
            variables: true,
          }
        }
      }
    }
  }
}> | null }) {
  const [communityPosts, setCommunityPosts] = useState(latestPalmlets);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("trending");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = useMemo(() => [...new Set(communityPosts.flatMap(p => p.tags))], [communityPosts]);

  const handleShareTemplate = async (newTemplate: { title: string; content: string; tags: string[]; variables: string[] }) => {
    const result = await createCommunityTemplate({
        userId: userTemplates?.id as string,
        title: newTemplate.title,
        content: newTemplate.content,
        tags: newTemplate.tags as SharedPalmletTags[],
        variables: newTemplate.variables,
    })

    if (result.success) {
        toast.success("Template shared successfully");
        setCommunityPosts([result.data as unknown as Prisma.SharedPalmletGetPayload<{
          include: {
            user: {
              select: {
                name: true;
                image: true;
                email: true;
              }
            },
            variables: true,
          };
        }>, ...communityPosts]);
    } else {
        toast.error(result.message);
    }
  };

  const filteredPosts = useMemo(() => {
    let posts = [...communityPosts];

    // // Sort posts
    // if (activeSort === "popular") {
    //   posts.sort((a, b) => b.stats.likes - a.stats.likes);
    // } else if (activeSort === "recent") {
    //   // This is a simplification. In a real app, you'd sort by a real date object.
    //   // For now, we rely on the array order. Newest items are prepended.
    // } else { // Trending
    //     posts.sort((a,b) => (b.stats.likes + b.stats.forks) - (a.stats.likes + a.stats.forks));
    // }


    // // Filter by search query
    // if (searchQuery) {
    //   posts = posts.filter(post => 
    //     post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     post.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    // // Filter by tags
    // if (activeTags.length > 0) {
    //     posts = posts.filter(post =>
    //         activeTags.every(tag => post.tags.includes(tag))
    //     )
    // }

    return posts;
  }, [communityPosts, searchQuery, activeSort, activeTags]);


  return (
    <div className="relative w-full min-h-screen">
       <div className="absolute inset-0 w-full h-full opacity-50 bg-grid"
            // style={{
            //   backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(203 213 225 / 0.1)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")',
            //   backgroundPosition: '10px 10px',
            // }}
      />
      <div className="relative w-full max-w-4xl mx-auto min-h-screen p-4 md:p-6">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground">
            Community Feed
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Discover, fork, and share templates with the community.
          </p>
        </header>

        <main className="space-y-6">
          <ShareTemplatePrompt onTemplateShare={handleShareTemplate} userTemplates={userTemplates?.folders.flatMap(f => f.palmlets)} user={{ name: userTemplates?.name as string, image: userTemplates?.image as string }}/>
          <CommunityFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
            allTags={allTags}
          />
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <CommunityTemplatePost key={post.id} post={post} userFolders={userTemplates?.folders || []} />
                ))
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold">No templates found</h3>
                    <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { CommunityFilters } from "@/components/community/community-filters";
import { CommunityTemplatePost } from "@/components/community/community-template-post";
import { ShareTemplatePrompt } from "@/components/community/share-template-prompt";
import { Prisma, SharedPalmletTags } from "@/generated/prisma/client";
import { createCommunityTemplate } from "@/actions/community";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { loadMorePalmlets } from "@/actions/community";

export default function CommunityPage({
   popularPalmlets,
   latestPalmlets,
   userTemplates,
}: {
   popularPalmlets: Prisma.SharedPalmletGetPayload<{
      include: {
         user: {
            select: {
               name: true;
               image: true;
               email: true;
            };
         };
         variables: true;
      };
   }>[];
   latestPalmlets: Prisma.SharedPalmletGetPayload<{
      include: {
         user: {
            select: {
               name: true;
               image: true;
               email: true;
            };
         };
         variables: true;
      };
   }>[];
   userTemplates: Prisma.UserGetPayload<{
      include: {
         folders: {
            include: {
               palmlets: {
                  include: {
                     tags: true;
                     variables: true;
                  };
               };
            };
         };
      };
   }> | null;
}) {
   const [communityPosts, setCommunityPosts] = useState(latestPalmlets);
   const [searchQuery, setSearchQuery] = useState("");
   const [activeSort, setActiveSort] = useState("recent");
   const [activeTags, setActiveTags] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const [page, setPage] = useState(1);
   const allTags = useMemo(
      () => [...new Set(communityPosts.flatMap((p) => p.tags))],
      [communityPosts]
   );

   const handleShareTemplate = async (newTemplate: {
      title: string;
      content: string;
      tags: string[];
      variables: string[];
   }) => {
      const result = await createCommunityTemplate({
         userId: userTemplates?.id as string,
         title: newTemplate.title,
         content: newTemplate.content,
         tags: newTemplate.tags as SharedPalmletTags[],
         variables: newTemplate.variables,
      });

      if (result.success) {
         toast.success("Template shared successfully");
         setCommunityPosts([
            result.data as unknown as Prisma.SharedPalmletGetPayload<{
               include: {
                  user: {
                     select: {
                        name: true;
                        image: true;
                        email: true;
                     };
                  };
                  variables: true;
               };
            }>,
            ...communityPosts,
         ]);
      } else {
         toast.error(result.message);
      }
   };

   const handleLoadMore = async () => {
      setIsLoading(true);
      const result = await loadMorePalmlets(page + 1);
      if (result.success) {
         setCommunityPosts([...communityPosts, ...(result.data || [])]);
         setPage(page + 1);
         setHasMore((result?.data?.length || 0) > 0);
      } else {
         toast.error(result.message);
      }
      setIsLoading(false);
   };

   const filteredPosts = useMemo(() => {
      let posts = [...communityPosts];

      // Sort posts
      if (activeSort === "popular") {
         posts.sort((a, b) => b.upvotes - a.upvotes);
      }
      // else if (activeSort === "trending") {
      //   posts.sort((a, b) => (b.upvotes + b.forks) - (a.upvotes + a.forks));
      // }

      // Filter by search query
      if (searchQuery) {
         posts = posts.filter(
            (post) =>
               post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
               post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      // Filter by tags
      if (activeTags.length > 0) {
         posts = posts.filter((post) =>
            activeTags.every((tag) =>
               post.tags.includes(tag as SharedPalmletTags)
            )
         );
      }

      return posts;
   }, [communityPosts, searchQuery, activeSort, activeTags]);

   return (
      <div className='relative w-full min-h-screen'>
         <div className='relative w-full max-w-4xl mx-auto min-h-screen p-4 md:p-6'>
            <header className='mb-6'>
               <h1 className='text-2xl md:text-3xl font-bold tracking-tighter text-foreground'>
                  Community Feed
               </h1>
               <p className='text-sm md:text-base text-muted-foreground mt-1'>
                  Discover, fork, and share templates with the community.
               </p>
            </header>

            <main className='space-y-6'>
               <ShareTemplatePrompt
                  onTemplateShare={handleShareTemplate}
                  userTemplates={userTemplates?.folders.flatMap(
                     (f) => f.palmlets
                  )}
                  user={{
                     name: userTemplates?.name as string,
                     image: userTemplates?.image as string,
                  }}
               />
               <CommunityFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeSort={activeSort}
                  setActiveSort={setActiveSort}
                  activeTags={activeTags}
                  setActiveTags={setActiveTags}
                  allTags={allTags}
               />
               <div className='space-y-6'>
                  {filteredPosts.length > 0 ? (
                     filteredPosts.map((post) => (
                        <CommunityTemplatePost
                           key={post.id}
                           post={post}
                           userFolders={userTemplates?.folders || []}
                        />
                     ))
                  ) : (
                     <div className='text-center py-12'>
                        <h3 className='text-lg font-semibold'>
                           No templates found
                        </h3>
                        <p className='text-muted-foreground mt-1'>
                           Try adjusting your search or filters.
                        </p>
                     </div>
                  )}
               </div>

               {hasMore ? (
                  <div className='flex justify-center'>
                     <Button
                        variant='outline'
                        onClick={() => handleLoadMore()}
                        disabled={isLoading}
                     >
                        {isLoading ? (
                           <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                           "Load More"
                        )}
                     </Button>
                  </div>
               ) : (
                  <div className='flex flex-col items-center justify-center'>
                     <p className='text-muted-foreground mt-1'>
                        Reached the end :(
                     </p>
                     <p className='text-muted-foreground mt-1 text-center'>
                        Share your own templates to keep the community alive!
                     </p>
                  </div>
               )}
            </main>
         </div>
      </div>
   );
}

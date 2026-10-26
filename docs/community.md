# Community and leaderboard

Community posts are `SharedPalmlet` rows, separate from personal `Palmlet`s. Sharing copies title, content, enum tags, and variables; it does not keep a foreign key back to the original.

## Share

UI: `/community` → `ShareTemplatePrompt` → `ShareTemplateDialog`.

The dialog can prefill from the user’s personal palmlets (`getUserWithPalmlets` → flatten `folders.palmlets`). Tags are **not** copied from the personal template (those are free-form, lowercased `Palmlet_Tag` rows); the user must pick up to 5 of the `SharedPalmletTags` enum values. Variables come from the selected palmlet’s `Palmlet_Variable` rows.

`share-template-dialog.tsx` still declares a module-level mock `userTemplates` array. The component prop of the same name **shadows** it, so the live dropdown uses the server-loaded palmlets. Do not “fix” missing options by editing the mock.

**Codepath:** `createCommunityTemplate` → Zod `createCommunityTemplateSchema` → `prisma.sharedPalmlet.create`. The action **`console.log`s the incoming payload**. No `revalidatePath`; the client prepends the returned row.

| Constraint | Limit |
| --- | --- |
| Title | 1–100 chars |
| Content | 1–5000 chars |
| Tags | `LinkedIn`, `Outreach`, `Networking`, `FollowUp`, `Interview`, `PostInterview`, `CoverLetter`, `Startups`, `ColdEmail` (max 5) |

A successful share prepends the new post onto client `communityPosts` state (no full reload). Combined with offset `loadMorePalmlets`, that prepend can make later pages overlap or skip.

`src/components/community/community-template-card.tsx` is unused. Live cards are `CommunityTemplatePost`.

## Feed: load, filter, sort

Initial server load (`src/app/(main)/community/page.tsx`):

- `getLatestPalmlets()` — latest 10 by `createdAt`
- `getPopularPalmlets()` — top 10 by `upvotes` (helper messages say “trending”)

The client initializes `communityPosts` from **latest only**. The `popularPalmlets` prop is unused.

Client state (`community-client-page.tsx`):

- **Load more** → `loadMorePalmlets(page)` with `take: 10`, `skip: (page - 1) * 10`, always ordered by `createdAt desc`. The client starts at `page = 1` (the first 10 already on screen) and requests `page + 1` on each click. `hasMore` starts `true` even when the first page has fewer than 10 posts; the next empty response sets it false.
- **Search** — client filter on title, content, author **name** (not email)
- **Tags** — client AND-filter (`every` selected tag must be on the post)
- **Popular vs Recent** — client sort of already-loaded posts. Switching to Popular does **not** switch the data source to `getPopularPalmlets`
- **Trending** — tab is rendered (`community-filters.tsx`), but the `activeSort === "trending"` branch is commented out (it would have sorted by `upvotes + forks`; posts have no `forks` field). Selecting Trending leaves load order (latest)

Tag chips in the filter bar are derived from currently loaded posts, not the full enum.

Clicking a post body opens `ContentPreviewDialog` (highlighted `{{variables}}`, **Copy** of the raw shared content). It does not run `UseTemplateDialog`.

Each post shows the author’s name and `@{email}` (the selected `user.email` field, not a username). Community reads include `email` on the author.

## Upvotes (optimistic)

`CommunityTemplatePost.handleUpvote`:

1. `useOptimistic` bumps the displayed count immediately.
2. `upvotePost(postId)` runs `upvotes: { increment: 1 }` and returns the updated row.
3. On success, local `upvoteCount` is set to `result.data.upvotes`.

There is no per-user vote table and no toggle/downvote. Refreshing the page and clicking again increments again.

`isUpvoting` is set `true` then `false` **outside** the `startTransition` async work, so it does not serialize rapid clicks. `isPending` from `useTransition` is unused. Double-clicks can increment twice.

## Fork (not implemented)

The Fork button opens `ForkTemplateDialog` (existing-folder tab or type a new folder name, optional custom title). `handleFork` in `community-template-post.tsx` logs the payload and throws `"Fork functionality not yet implemented"`.

Fork is disabled when the user has no folders (`!userFolders || userFolders.length === 0`). Folders come from `userTemplates.folders` on the community page. The dialog is **only mounted** when the user has at least one folder — so the disabled state is not just the button.

The editor header **Share** button has no `onClick`; sharing is community-only.

## Leaderboard

`/leaderboard` uses `src/lib/data/leaderboard.ts` (reads only) and renders `LeaderboardClientPage`. The page has no `<Toaster />`. Sibling files (`leaderboard-hero.tsx`, `leaderboard-tabs.tsx`, `leaderboard-list.tsx`, `podium-section.tsx`, `achievements-section.tsx`, `old-page.tsx`) are unused by the live route.

Hero copy says rankings are “updated daily based on community engagement and template success.” There is no daily job — both queries run on each page load.

| Tab | Query | Ranking | Handle shown |
| --- | --- | --- | --- |
| Top templates | `SharedPalmlet` `take: 10` | `upvotes` desc | `@{template.user.name}` (name, not email) |
| Top creators | `User` `take: 10` | share **count** desc; `totalUpvotes` is computed but the live rows show share **length**, not that sum | podium `@{user.email}`; list rows show name only |

If fewer than 10 users have shares, users with zero shares fill the rest of the creators list (they all tie at count 0).

**Creators podium vs list:** `podium` is `topCreators.slice(0, 3)`, but the list below maps **`topCreators`** (all 10), not `restOfList`. The top three therefore appear twice. `restOfList`, `podiumTemplates`, and `restOfListTemplates` are unused. `PodiumItem` looks up rank styles with `{1,2,3}[user.id]` — `user.id` is a UUID, so the rank-colored borders never apply. Crown/medal/award icons use the CSS `order` class string instead.

**Templates table:** “Forks” and “Success Rate” column headers are rendered; the cell values are commented out (empty cells). Category badges render `template.tags` (the enum array). In-file `TemplateRow` is unused.

Forks / success-rate columns and the in-file `achievements` array on the old layout are not rendered (see `leaderboard/old-page.tsx`).

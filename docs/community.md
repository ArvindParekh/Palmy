# Community and leaderboard

Community posts are `SharedPalmlet` rows, separate from personal `Palmlet`s. Sharing copies title, content, enum tags, and variables; it does not keep a foreign key back to the original.

## Share

UI: `/community` → `ShareTemplatePrompt` → `ShareTemplateDialog`.

The dialog can prefill from the user’s personal palmlets (`getUserWithPalmlets` → flatten `folders.palmlets`). Tags are **not** copied from the personal template; the user must pick up to 5 of the enum values. Variables come from the selected palmlet’s `Palmlet_Variable` rows.

**Codepath:** `createCommunityTemplate` → Zod `createCommunityTemplateSchema` → `prisma.sharedPalmlet.create`.

| Constraint | Limit |
| --- | --- |
| Title | 1–100 chars |
| Content | 1–5000 chars |
| Tags | `LinkedIn`, `Outreach`, `Networking`, `FollowUp`, `Interview`, `PostInterview`, `CoverLetter`, `Startups`, `ColdEmail` (max 5) |

A successful share prepends the new post onto client `communityPosts` state (no full reload).

## Feed: load, filter, sort

Initial server load (`src/app/(main)/community/page.tsx`):

- `getLatestPalmlets()` — latest 10 by `createdAt`
- `getPopularPalmlets()` — top 10 by `upvotes`

The client initializes `communityPosts` from **latest only**. The `popularPalmlets` prop is unused.

Client state (`community-client-page.tsx`):

- **Load more** → `loadMorePalmlets(page)` with `take: 10`, `skip: (page - 1) * 10`, always ordered by `createdAt desc`. The client starts at `page = 1` (the first 10 already on screen) and requests `page + 1` on each click.
- **Search** — client filter on title, content, author name
- **Tags** — client AND-filter (`every` selected tag must be on the post)
- **Popular vs Recent** — client sort of already-loaded posts. Switching to Popular does **not** switch the data source to `getPopularPalmlets`

Tag chips in the filter bar are derived from currently loaded posts, not the full enum.

## Upvotes (optimistic)

`CommunityTemplatePost.handleUpvote`:

1. `useOptimistic` bumps the displayed count immediately.
2. `upvotePost(postId)` runs `upvotes: { increment: 1 }` and returns the updated row.
3. On success, local `upvoteCount` is set to `result.data.upvotes`.

There is no per-user vote table and no toggle/downvote. Refreshing the page and clicking again increments again.

`isUpvoting` is set `true` then `false` **outside** the `startTransition` async work, so it does not serialize rapid clicks. `isPending` from `useTransition` is unused. Double-clicks can increment twice.

## Fork (not implemented)

The Fork button opens `ForkTemplateDialog` (pick existing folder or type a new folder name). `handleFork` in `community-template-post.tsx` throws `"Fork functionality not yet implemented"`.

Fork is disabled when the user has no folders (`!userFolders || userFolders.length === 0`). Folders come from `userTemplates.folders` on the community page.

The editor header **Share** button has no `onClick`; sharing is community-only.

## Leaderboard

`/leaderboard` uses `src/lib/data/leaderboard.ts` (reads only):

| Tab | Query | Ranking |
| --- | --- | --- |
| Top templates | `SharedPalmlet` `take: 10` | `upvotes` desc |
| Top creators | `User` `take: 10` | share **count** desc; UI also shows `totalUpvotes` (sum of that user’s shared posts) |

If fewer than 10 users have shares, users with zero shares fill the rest of the creators list (they all tie at count 0).

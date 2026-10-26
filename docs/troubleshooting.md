# Setup, operations, and pitfalls

## Local setup failures

**`prisma generate` / missing `@/generated/prisma`**

The client is generated to `src/generated/prisma` and gitignored. Run `pnpm install` (postinstall) or `pnpm exec prisma generate` after clone. Server imports fail until this exists. Some files import `@/generated/prisma`, others `@/generated/prisma/client` — both need that generate step. `src/lib/db.ts` caches a singleton `PrismaClient` on `global` outside production.

**Migrations vs `DIRECT_URL`**

`schema.prisma` requires both `DATABASE_URL` and `DIRECT_URL`. For a single local Postgres instance, set them to the same connection string. Hosted pools (for example Prisma Accelerate or Neon pooled) typically use the pooled URL as `DATABASE_URL` and the unpooled URL as `DIRECT_URL`.

**Auth client points at the wrong host**

`authClient` uses `process.env.BETTER_AUTH_URL`. If this is unset or still set to production while you run `pnpm dev`, sign-in and session calls go to the wrong origin.

**OAuth / CSRF / callback errors**

`trustedOrigins` in `src/lib/auth.ts` must include the browser origin. Production currently allows `https://palmy.pro` and `https://www.palmy.pro`. A new preview URL will fail until that list is updated. Google OAuth settings must match (authorized origins + redirect URI, typically `/api/auth/callback/google`).

`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are asserted `as string`. Empty env values do not fail when `auth.ts` loads; Google sign-in fails later at the provider.

Landing links to `/auth/sign-in` and `/auth/sign-up`. Lab’s session-without-`user.id` redirect is `/auth/login`. A completely missing session never reaches Lab — `(main)/layout.tsx` already sent the user to `/`. Those pathnames come from `@daveyplate/better-auth-ui` (`authViewPaths`). If a path 404s, check that library’s view names rather than adding a custom route.

There is no `middleware.ts`. Session gating is only `(main)/layout.tsx` → redirect `/`. `/palmlets` additionally renders “Please log in…” if `session.user.id` is missing after that layout check.

**AI calls fail immediately**

Lab, editor generate, selection rewrite, and performance analysis all need `GOOGLE_GENERATIVE_AI_API_KEY`. Failures surface as toasts (`Failed to generate text`, `Failed to improve text`, or the analysis error message).

**Toasts never appear**

`<Toaster />` is mounted per page, not in the `(main)` layout.

| Has toaster | Missing toaster |
| --- | --- |
| Auth (`top-center` + `richColors`), `/palmlets` (page **and** `NewFolderDialog`), folder detail (`TemplateList`), editor, Lab, community, settings | Dashboard, leaderboard, profile |

`FolderCardWrapper` imports `Toaster` but does not render it. Folder rename/delete toasts still show because `/palmlets` already mounts one.

**`.env.example` never shows up in git**

`.gitignore` uses `.env*`, so any file starting with `.env` is ignored. Keep the variable table (and the copy-paste block) in the README as the source of truth.

## Data constraints

| Constraint | Failure mode |
| --- | --- |
| `(userId, folderName)` unique | Creating a folder with a name the user already has returns Prisma’s unique-violation message |
| `(folderId, title)` unique | Saving a second `"Custom Template"` (Lab’s default title) into the same folder fails |
| `Palmlet_Tag.tagName` globally unique | Tags are shared across all users via `connectOrCreate` |
| `Palmlet_Variable.variableName` globally unique | Same for `{{variables}}` |

Folder delete is a transaction that first deletes palmlets, then the folder (schema already cascades palmlets). Account delete uses better-auth `deleteUser` and Prisma `onDelete: Cascade`. Type `CONFIRM` (the input auto-uppercases); the `userId` prop on the dialog is unused.

`addTagsToPalmlet` and `updatePalmlet` replace the entire tag (and, for update, variable) set with nested `deleteMany: {}` then `connectOrCreate` on implicit many-to-many relations. Passing only the new names would wipe existing ones; the dialogs send the full list. Prefer `set` if the intent is to change join rows without deleting globally shared catalog records. `AddTagsDialog` lowercases names and stops at 10 tags.

Folder emoji in **New Folder** is not stored (`Palmlet_Folder` has no icon field). Folder cards pick a color by `index % 6`. Do not debug “missing icons” or “wrong colors after reorder” as a Prisma issue.

**Unknown folder UUID looks empty, with a blank title, not 404.** `getFolderInfo` / `getFolderPalmlets` return success with `null` / `[]` when `findUnique` misses. The folder page then shows the empty-folder UI (no stats row, New Template still present, heading empty). `FolderClientWrapper` receives `folderId=""` (`folderInfo.data?.id || ""`). Saving a new template against that UUID fails on folder `connect`. Missing palmlet ids on `/editor/[id]` do call `notFound()`.

**Folder and palmlet reads are not scoped to the current user.** Any signed-in visitor who knows a UUID can load another user’s folder or editor. Mutations also trust client-supplied ids.

## Community behavior

- **Upvotes** (`upvotePost`) always `increment: 1`. There is no per-user vote table. The UI’s `isUpvoting` flag is cleared before the server call finishes, so rapid clicks can increment twice. A page refresh can upvote again.
- **Popular vs Recent** is a client sort of the posts already loaded. Initial load is latest 10 (`getLatestPalmlets`). “Load more” pages 10 at a time (`skip: (page - 1) * 10`). Switching to Popular does not fetch the server-side popular list (`getPopularPalmlets` is loaded on the page but unused by feed state).
- **Trending** is a visible tab whose sort branch is commented out. Selecting it does not change order.
- Sharing prepends locally, then load-more still uses offset pages — rows can duplicate or skip.
- **Fork** UI exists (`ForkTemplateDialog`) but `handleFork` throws `"Fork functionality not yet implemented"`. The dialog is only mounted when the user has at least one folder.
- Share tags must be one of: `LinkedIn`, `Outreach`, `Networking`, `FollowUp`, `Interview`, `PostInterview`, `CoverLetter`, `Startups`, `ColdEmail` (max 5).
- Post click opens a raw-content preview (`ContentPreviewDialog`), not the personalize dialog.
- Posts render `@{user.email}` as the handle. Leaderboard templates use `@{user.name}`. Leaderboard creators podium uses `@{user.email}`; creator list rows show name only. `createCommunityTemplate` logs its payload to the server console.
- The mock `userTemplates` constant in `share-template-dialog.tsx` is unused (shadowed by the prop). `community-template-card.tsx` is unused.
- Leaderboard copy says “updated daily”; queries run on each request. Top-3 creators appear in both the podium and the list below (`restOfList` is unused). Podium rank borders are keyed by `user.id` (a UUID), so they never match ranks 1–3.

## Next.js 15 `params`

| Page | `params` handling |
| --- | --- |
| `/palmlets/[folderNumber]` | `Promise<{ folderNumber }>` and `await`s |
| `/palmlets/[folderNumber]/editor/[id]` | `await params` but the prop type is a plain object |
| `/palmlets/[folderNumber]/editor/new` | Reads `params.folderNumber` **without** awaiting |
| `/auth/[pathname]` | `Promise<{ pathname }>` and `await`s |

Prefer `params: Promise<…>` + `await params` on every dynamic route.

## Settings, profile, and product flags

- Notifications and billing tabs are commented out in `settings-client-page.tsx`.
- Settings **Upload new picture**, **Update Email**, and the bio textarea do not persist. Current password is unbound; only the new password field is sent. Password Zod min length is 1.
- Editor header Share is not wired (`hidden sm:inline-flex`, no `onClick`).
- Folder **New Template** is a `Link` to `/editor/new` plus a leftover `handleNewTemplate` that calls `createNewPalmlet` with **wrong positional args** (folder name as id, folder UUID as title, unbound `folderId`/`userId`/`folderDescription`). Leftover success URL `/palmlets/editor/[id]` is not a route. The throw/failure is swallowed by navigation.
- Folder-list **Edit** on `TemplateCard` uses the correct `/palmlets/{folderId}/editor/{id}`. `TemplateList.handleEditTemplate` (wrong URL) is dead because `onEdit` is never called. Duplicate is commented out.
- Dashboard Recently Edited **Use / Manage Tags / Delete** no-op (handlers not passed). Edit still works.
- Editor Save “no changes” compares against SSR `templateData`, not the last successful save.
- Textarea `onChange` shares `handleContentChange` with AI rewrite **and** generate. If `selection` is set, a keystroke (or a generate result) splices the full value into the selected range (`onChange` fires before keyup clears selection).
- `getSuggestions` is a no-op (empty array) to avoid extra model cost.
- `getUserPalmlets` is an unused read helper.
- `src/components/personalization-modal.tsx` is unused; use `UseTemplateDialog`. `src/components/dashboard.tsx` is an unused mock; the live dashboard is `src/app/(main)/dashboard/page.tsx`.
- Desktop sidebar does not show the `badge` fields on Templates/Lab. Mobile nav **does** show hardcoded `"24"` and `"3"`.
- Profile achievements, forks, and ratings are not live data. Edit Profile has no handler. Profile logs `userData` / `allPalmlets` on the server and displays email as `@handle` (and again as the bio line).
- Landing pricing plan CTAs always go to `/auth/sign-up`, even when `loggedIn` is true. Header, hero, and the bottom CTA section swap; the footer has no CTAs.
- Onboarding does not auto-start. **Take Tour** is the only in-app start, and it only renders while `onboardingCompleted` is `false`.
- `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so `pnpm build` can succeed with type/lint errors. Use `pnpm lint` separately.
- Onboarding `updateUserOnboardingStatus` does not verify the caller owns `userId`.
- Most other mutations (`createNewPalmlet`, folder CRUD, `upvotePost`, `createCommunityTemplate`, `updateUserPassword`) also skip ownership checks. See [server-actions.md](server-actions.md).
- `createNewPalmlet` does not `revalidatePath`. After Lab save, `/palmlets` can show stale counts until refresh.
- `editor/new/page.tsx` is ~310 lines of commented-out historical client editor. The live page is the last ~20 lines.

## Local runbooks

**Replay the onboarding tour**

There is no in-app reset. In Prisma Studio (`pnpm exec prisma studio`) or SQL:

```sql
UPDATE "user" SET "onboardingCompleted" = false WHERE email = 'you@example.com';
```

The User model is `@@map("user")` — quote the table name. Then reload `/dashboard`. **Take Tour** only renders when the flag is `false`. Closing the tour via the mask does not write the flag; finishing the last step does. The tour does not auto-start.

**Inspect unique-constraint failures**

Lab default titles (`"Custom Template"`, `"Cold Email Template"`, …) collide on `(folderId, title)`. Folder names collide on `(userId, folderName)`. Prisma returns the raw unique-violation string to the toast for folder create; palmlet create maps it to `"Failed to create palmlet"`.

**Confirm generated Prisma client**

```bash
pnpm exec prisma generate
ls src/generated/prisma
```

If `ls` fails, server imports of `@/generated/prisma` will fail at runtime.

**Stale folder counts after Lab save**

Expected: Lab does not redirect, and `createNewPalmlet` does not revalidate. Hard-refresh `/palmlets` or create/rename a folder (those actions revalidate `/palmlets`).

**Unknown `/palmlets/<uuid>` shows an empty folder with a blank title**

Expected until the page checks `folderInfo.data`. Do not treat it as a missing-route bug. Contrast with `/editor/[id]`, which calls `notFound()`. Saving a template there fails because the folder id does not exist.

**`/palmlets/editor/<id>` 404s**

There is no such route. Live Edit uses `/palmlets/{folderId}/editor/{id}`. Dead handlers in `FolderControls` and `TemplateList` still mention the short path.

**Editing `editor/new/page.tsx` has no effect**

Most of that file is commented-out historical UI. Change `src/components/palmlet/editor/editor-client-page.tsx` (or the live export at the bottom of `editor/new/page.tsx`).

**Community Trending tab looks selected but order did not change**

Expected. The filter tab exists; the sort implementation is commented out.

**Lab sent you to `/` instead of `/auth/login`**

Expected for a missing session. `(main)/layout.tsx` redirects first. `/auth/login` is only for a session that has no `user.id`.

**Leaderboard top-3 creators appear twice / podium has no gold border**

Expected. The list maps all `topCreators`, not `restOfList`. Podium rank styles are keyed by UUID `user.id`, not rank 1–3.

## Auth runbook (production)

1. Confirm `BETTER_AUTH_URL` is the public site origin (apex or `www`, matching what users type).
2. Confirm `trustedOrigins` includes every hostname users actually type (apex + `www`).
3. Confirm Google OAuth authorized origins and redirect URIs (`/api/auth/callback/google` by default).
4. After changing origins, redeploy; the list is compile-time config, not an env var.

## Prisma workflow

```bash
pnpm exec prisma migrate dev --name <change>
pnpm exec prisma generate
```

Do not commit `src/generated/prisma`. Do commit new files under `prisma/migrations/`.

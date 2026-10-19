# Architecture

Palmy is a Next.js App Router app. Public marketing lives at `/`. Authenticated product routes sit in `src/app/(main)/` and share a collapsible sidebar layout.

## Request flow

```
Browser
  → src/app/(main)/layout.tsx   session via auth.api.getSession()
    → page.tsx                    server component, calls src/lib/data/* or actions
    → client components           mutations via "use server" actions
    → Prisma                      Postgres
```

There is **no** `middleware.ts`. Unauthenticated visits to `(main)` redirect to `/`. Lab additionally redirects to `/auth/login` if a session exists without `user.id` — that check is unreachable for a missing session because the layout already redirected. `/palmlets` renders “Please log in…” instead of redirecting when `session.user.id` is missing after the layout check. `/`, `/auth/*`, and `/api/auth/*` are outside the session layout.

The `(main)` layout only checks that *some* session exists. Folder and palmlet **reads** (`getFolderInfo`, `getFolderPalmlets`, `getPalmlet`) look up by UUID and do **not** filter by `userId`. Any signed-in user who knows a folder or palmlet id can load that row. Mutations similarly trust client-supplied ids (see [server-actions.md](server-actions.md)). List helpers that take a `userId` (`getPalmletFolders`, `getRecentlyEditedPalmlets`, `getUserPalmlets`) do filter; `getUserPalmlets` is unused.

Each `(main)` route has a colocated `loading.tsx` (skeleton UI) used by Next.js while the server component resolves: dashboard, palmlets, folder, both editor pages, lab, community, leaderboard, settings, profile. The folder page also defines an unused `TemplatesLoadingSkeleton` and imports unused `Suspense` — the live skeleton is `src/app/(main)/palmlets/[folderNumber]/loading.tsx`.

`<Toaster />` (sonner) is mounted **per page/component**, not in `(main)/layout.tsx`. Live mounts:

| Location | Notes |
| --- | --- |
| `src/app/auth/[pathname]/view.tsx` | `position="top-center"` + `richColors` |
| `/palmlets` page | Plus a **second** toaster inside `NewFolderDialog` |
| `TemplateList` | Folder detail (`/palmlets/[folderNumber]`) |
| Editor, Lab, Community page, Settings | One each |

Dashboard, leaderboard, and profile have none — toasts on those routes will not appear. `FolderCardWrapper` imports `Toaster` but does not render it; folder rename/delete toasts work because `/palmlets` already mounts one.

## Routes

| Path | Intent |
| --- | --- |
| `/` | Landing page. Always rendered; `loggedIn` swaps header / hero / footer CTAs (`/dashboard` vs `/auth/sign-in` / `/auth/sign-up`). A session check that would skip landing is commented out. Pricing plan buttons always go to `/auth/sign-up`, even when signed in. `src/app/page.tsx` is a server component that still imports unused `useState`. |
| `/auth/[pathname]` | better-auth UI (`AuthCard`) from `@daveyplate/better-auth-ui`. Paths come from `authViewPaths` (`generateStaticParams`). Landing uses `/auth/sign-in` and `/auth/sign-up`; Lab’s session-without-id redirect is `/auth/login`. |
| `/dashboard` | Quick-start cards + 3 most recently edited palmlets. Starts the onboarding tour. Live page is `src/app/(main)/dashboard/page.tsx`, not the unused `src/components/dashboard.tsx` mock. |
| `/palmlets` | Folder grid. Create/rename/delete folders. Folder search UI is commented out. |
| `/palmlets/[folderNumber]` | Templates in a folder. `folderNumber` is the folder **UUID**, not a numeric index. Unknown UUIDs look like an empty folder with a blank title (see below). |
| `/palmlets/[folderNumber]/editor/new` | New template (`id === ""` until first save). Does not check that the folder exists. The file is ~310 lines of **commented-out historical client editor**; the live export is the last ~20 lines. |
| `/palmlets/[folderNumber]/editor/[id]` | Existing template editor. Missing palmlet → `notFound()`. |
| `/lab` | Prompt → Gemini → optional save into a folder. |
| `/community` | Share, browse, filter, upvote community templates. |
| `/leaderboard` | Top shared templates (by upvotes) and top creators (by share count). |
| `/settings` | Profile name, password, appearance, account deletion. Notifications and billing tabs are commented out. |
| `/profile` | Linked from the sidebar footer name. Personal templates plus **hardcoded** achievements / fork / rating stats. |
| `/api/auth/[...all]` | better-auth GET/POST handler. |

There is no `/palmlets/editor/[id]` route. `FolderControls` leftover create success and `TemplateList.handleEditTemplate` still point there; those handlers are unused by the live Edit UI (see [workflows.md](workflows.md)).

## Auth

Server config: `src/lib/auth.ts`. Client: `src/lib/auth-client.ts`. Root providers wrap the tree in `AuthUIProvider` with `social.providers: ["google"]`.

- Adapter: Prisma, Postgres
- Email/password with `autoSignIn: true`
- Google social provider (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`)
- `user.deleteUser.enabled: true` — Settings calls `authClient.deleteUser()`. Related rows cascade via Prisma `onDelete: Cascade`
- `trustedOrigins`: `http://localhost:3000`, `https://palmy.pro`, `https://www.palmy.pro`

`authClient` uses `process.env.BETTER_AUTH_URL` as `baseURL`. The exported `signIn()` helper in `auth-client.ts` always calls Google social sign-in and is unused; the UI goes through `AuthCard` / `AuthUIProvider`.

Google OAuth in Google Cloud Console must list the same origins plus the better-auth callback (default `/api/auth/callback/google`).

## Data model (Prisma)

Defined in `prisma/schema.prisma`. Client output: `src/generated/prisma`. App imports are split: `src/lib/db.ts` uses `@/generated/prisma`; several data helpers import `@/generated/prisma/client`. Both resolve after `prisma generate`.

`src/lib/db.ts` is a Prisma singleton: it caches `PrismaClient` on `global` when `NODE_ENV !== "production"` so Next.js hot reload does not open extra connections.

| Model | Role |
| --- | --- |
| `User` | Auth user + `onboardingCompleted` (default `false`). Mapped to table `"user"`. |
| `Palmlet_Folder` | Per-user folder. Unique on `(userId, folderName)`. No icon column. |
| `Palmlet` | Template in a folder. Unique on `(folderId, title)`. `onDelete: Cascade` from folder. |
| `Palmlet_Tag` | **Globally** unique `tagName`, implicit many-to-many with palmlets |
| `Palmlet_Variable` | **Globally** unique `variableName`, shared by personal and community templates |
| `SharedPalmlet` | Community post: title, content, `upvotes`, enum `tags`, variables. No FK back to the original `Palmlet`. |
| `Session` / `Account` / `Verification` | better-auth tables |

Deleting a folder runs a transaction: `deleteMany` palmlets, then the folder (`src/actions/palmlet-folder.ts`). The schema would already cascade those palmlets. Deleting a user cascades folders, palmlets, and shared posts.

Folder card colors (`sage`, `lavender`, `cream`, `pearl`, `stone`, `mist`) are assigned as `index % 6` in `/palmlets`. They are not stored. Folder detail headers always show a hardcoded `💼` emoji.

**Unknown folder UUID:** `getFolderInfo` / `getFolderPalmlets` use `findUnique` / `findMany` and return `{ success: true, data: null | [] }` when nothing matches (they only fail on thrown errors). The folder page then takes the empty-folder branch. Because `folderInfo.data` is null, the heading is **blank** (not a 404, not a named empty folder). Empty folders still mount `FolderClientWrapper`, so **New Template** is shown. For an unknown UUID the wrapper gets `folderId=""` (`folderInfo.data?.id || ""`); a real empty folder still has a UUID. Saving from `/editor/new` against a missing folder fails when Prisma cannot `connect` the folder id. Missing palmlet id → `notFound()`.

## Server actions vs data helpers

| Layer | Location | Writes? |
| --- | --- | --- |
| HTTP | `src/app/api/auth/[...all]/route.ts` | Auth only (session, OAuth, delete user) |
| Server actions | `src/actions/*.ts` (`"use server"`) | Yes (create/update/delete, AI calls, onboarding flag). Catalog: [server-actions.md](server-actions.md). |
| Data helpers | `src/lib/data/*.ts` | No. Used by server components |

`getPalmletFolders` lives in `src/actions/palmlet-folder.ts` even though it is a read (`/palmlets` and `/lab` call it). `getUserPalmlets` in `src/lib/data/palmlet.ts` is unused. New reads should go in `src/lib/data/`.

Palmlet create/update validate with Zod (`src/zod/palmlet.ts`). Community share validates with `createCommunityTemplateSchema` (title ≤ 100, content ≤ 5000, ≤ 5 enum tags).

Variables in the editor are **not** typed by the user as a separate list. On save, the editor extracts unique `{{name}}` tokens from content with `/{{(.*?)}}/g` and passes them to `createNewPalmlet` / `updatePalmlet`.

`addTagsToPalmlet` and `updatePalmlet` replace relation sets with nested `deleteMany: {}` then `connectOrCreate` on implicit many-to-many catalogs that are **globally unique**. Prefer `set` when the intent is “replace this palmlet’s join rows” without deleting shared `Palmlet_Tag` / `Palmlet_Variable` records. The UI (`AddTagsDialog`) sends the full list, not a delta.

`updatePalmlet`’s `folderNumber` is used only for `revalidatePath`, not to move the palmlet.

## Cache / `revalidatePath`

| Mutation | Revalidates |
| --- | --- |
| `createPalmletFolder` / `updatePalmletFolder` / `deletePalmletFolder` | `/palmlets` |
| `createNewPalmlet` | **none** |
| `updatePalmlet` | `/palmlets/{folderNumber}/editor/{id}` only |
| `addTagsToPalmlet` / `deletePalmlet` | `/palmlets/{folderNumber}` |
| `createCommunityTemplate` / `upvotePost` | **none** (community UI updates local state) |
| `updateUserOnboardingStatus` | `/dashboard` |

Lab save into an existing folder therefore leaves `/palmlets` counts stale until a hard refresh. Editor first-save navigates to `/editor/[id]`, so it does not depend on that cache.

## Sidebar, mobile nav, and theme

`SidebarProvider` defaults to open. `AppSidebar` uses `collapsible="icon"` (desktop). Mobile (`md:hidden`) uses `MobileNav` (bottom sheet). Collapse state is stored in the `sidebar_state` cookie (7-day max age) by the shadcn sidebar primitive; keyboard shortcut is `b` (with Ctrl/Cmd).

Active item matching is `pathname === href || pathname.startsWith(href)`, so Templates stays highlighted on `/palmlets/.../editor/...`.

`menuItems` in both `app-sidebar-content.tsx` and `mobile-nav.tsx` include unused-looking `badge: "24"` (Templates) and `badge: "3"` (Lab). **Desktop does not render those badges.** Mobile nav does, so phones show hardcoded counts.

Theme: `next-themes`, default `dark`, `enableSystem`. Toggle lives in the sidebar footer.

Root metadata title is `palmy.io` (`src/app/layout.tsx`). The in-app sidebar brand is **Palmly**. Production auth origins use **palmy.pro**. Root layout also loads Geist, Geist Mono, Inter, IBM Plex Sans, and Montserrat as CSS variables; the editor textarea uses `font-mono`.

`Providers` mounts `TourProvider` around `{children}` (landing and auth included). Vercel `<Analytics />` is a **sibling** under `AuthUIProvider`, not inside the tour tree. Steps only open via `startTour()` or `?tour=` — see [onboarding.md](onboarding.md).

## Unused / stale UI

- `src/components/personalization-modal.tsx` is not imported. Live fill-and-copy is `UseTemplateDialog`.
- `src/components/header.tsx`, `src/components/dashboard.tsx`, `dashboard/dashboard-card-variants.tsx`, `community/community-template-card.tsx`, `profile/old-page.tsx`, and `leaderboard/old-page.tsx` are unused. The live dashboard is `src/app/(main)/dashboard/page.tsx`.
- Folder library search input is commented out on `/palmlets`. Search/sort/grid-list **inside** a folder is live (`FolderControls`, client-side).
- `NewFolderDialog` shows an emoji icon picker; the value is never sent and Prisma has no icon column. Default picker state is `💻`; folder headers always show `💼`.
- `TemplateCard` accepts `onEdit` / `onCopy` but never calls them. Edit always `router.push`s `/palmlets/{folderId}/editor/{id}`. Duplicate is commented out.
- Dashboard Recently Edited cards omit `onUse` / `onAddTags` / `onDelete`, so those menu items no-op. Edit still works.
- `ShareTemplateDialog` has a leftover module-level mock `userTemplates` array. The prop of the same name shadows it; the live dropdown uses the user’s palmlets.
- Community filters expose a **Trending** tab, but the `activeSort === "trending"` branch is commented out. Selecting it leaves posts in load order (latest).
- Landing feature copy still mentions “A/B Testing Lab”, “Performance Analytics”, and “AI-powered suggestions”. Lab is generate-then-save; `getSuggestions()` returns `[]`; there is no analytics store.
- `editor/new/page.tsx` is mostly a commented-out historical client editor. Edit the live `EditorClientPage` export at the bottom, not the commented block.

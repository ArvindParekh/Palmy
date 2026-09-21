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

Unauthenticated visits to `(main)` redirect to `/`. Lab additionally redirects to `/auth/login` if the session has no user id. `/palmlets` renders “Please log in…” instead of redirecting when the session is missing.

Each `(main)` route has a colocated `loading.tsx` (skeleton UI) used by Next.js while the server component resolves.

## Routes

| Path | Intent |
| --- | --- |
| `/` | Landing page. Always rendered; `loggedIn` only changes CTAs (`/dashboard` vs `/auth/sign-in` / `/auth/sign-up`). |
| `/auth/[pathname]` | better-auth UI (`AuthCard`) from `@daveyplate/better-auth-ui`. Paths come from `authViewPaths` (`generateStaticParams`). Landing uses `/auth/sign-in` and `/auth/sign-up`; Lab’s no-user redirect is `/auth/login`. |
| `/dashboard` | Quick-start cards + 3 most recently edited palmlets. Starts the onboarding tour. |
| `/palmlets` | Folder grid. Create/rename/delete folders. Folder search UI is commented out. |
| `/palmlets/[folderNumber]` | Templates in a folder. `folderNumber` is the folder **UUID**, not a numeric index. |
| `/palmlets/[folderNumber]/editor/new` | New template (`id === ""` until first save). |
| `/palmlets/[folderNumber]/editor/[id]` | Existing template editor. |
| `/lab` | Prompt → Gemini → optional save into a folder. |
| `/community` | Share, browse, filter, upvote community templates. |
| `/leaderboard` | Top shared templates (by upvotes) and top creators (by share count). |
| `/settings` | Profile name, password, appearance, account deletion. Notifications and billing tabs are commented out. |
| `/profile` | Linked from the sidebar footer name. Personal templates plus **hardcoded** achievements / fork / rating stats. |
| `/api/auth/[...all]` | better-auth GET/POST handler. |

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

Defined in `prisma/schema.prisma`. Client output: `src/generated/prisma`.

| Model | Role |
| --- | --- |
| `User` | Auth user + `onboardingCompleted` (default `false`). Mapped to table `"user"`. |
| `Palmlet_Folder` | Per-user folder. Unique on `(userId, folderName)`. No icon column. |
| `Palmlet` | Template in a folder. Unique on `(folderId, title)` |
| `Palmlet_Tag` | **Globally** unique `tagName`, many-to-many with palmlets |
| `Palmlet_Variable` | **Globally** unique `variableName`, shared by personal and community templates |
| `SharedPalmlet` | Community post: title, content, `upvotes`, enum `tags`, variables. No FK back to the original `Palmlet`. |
| `Session` / `Account` / `Verification` | better-auth tables |

Deleting a folder runs a transaction: delete its palmlets, then the folder (`src/actions/palmlet-folder.ts`). Deleting a user cascades folders, palmlets, and shared posts.

Folder card colors (`sage`, `lavender`, `cream`, `pearl`, `stone`, `mist`) are assigned as `index % 6` in `/palmlets`. They are not stored. Folder detail headers always show a hardcoded `💼` emoji.

## Server actions vs data helpers

| Layer | Location | Writes? |
| --- | --- | --- |
| HTTP | `src/app/api/auth/[...all]/route.ts` | Auth only (session, OAuth, delete user) |
| Server actions | `src/actions/*.ts` (`"use server"`) | Yes (create/update/delete, AI calls, onboarding flag). Catalog: [server-actions.md](server-actions.md). |
| Data helpers | `src/lib/data/*.ts` | No. Used by server components |

`getPalmletFolders` lives in `src/actions/palmlet-folder.ts` even though it is a read (`/palmlets` and `/lab` call it). `getUserPalmlets` in `src/lib/data/palmlet.ts` is unused. New reads should go in `src/lib/data/`.

Most actions do **not** re-check session or row ownership; they trust ids from the client. The `(main)` layout only requires that *some* session exists.

Palmlet create/update validate with Zod (`src/zod/palmlet.ts`). Community share validates with `createCommunityTemplateSchema` (title ≤ 100, content ≤ 5000, ≤ 5 enum tags).

Variables in the editor are **not** typed by the user as a separate list. On save, the editor extracts unique `{{name}}` tokens from content with `/{{(.*?)}}/g` and passes them to `createNewPalmlet` / `updatePalmlet`.

`addTagsToPalmlet` replaces the palmlet’s tag set (`deleteMany` then `connectOrCreate`). The UI (`AddTagsDialog`) sends the full list, not a delta.

`updatePalmlet` also `deleteMany`s then reconnects both tags and variables, so omitted names are dropped. `folderNumber` is used only for `revalidatePath`, not to move the palmlet.

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

Active item matching is `pathname === href \|\| pathname.startsWith(href)`, so Templates stays highlighted on `/palmlets/.../editor/...`.

`menuItems` in both `app-sidebar-content.tsx` and `mobile-nav.tsx` include unused-looking `badge: "24"` (Templates) and `badge: "3"` (Lab). **Desktop does not render those badges.** Mobile nav does, so phones show hardcoded counts.

Theme: `next-themes`, default `dark`, `enableSystem`. Toggle lives in the sidebar footer.

Root metadata title is `palmy.io` (`src/app/layout.tsx`). The in-app sidebar brand is **Palmly**. Production auth origins use **palmy.pro**.

`Providers` also mounts Vercel `<Analytics />`.

## Unused / stale UI

- `src/components/personalization-modal.tsx` is not imported. Live fill-and-copy is `UseTemplateDialog`.
- `src/components/header.tsx`, `dashboard/dashboard-card-variants.tsx`, `profile/old-page.tsx`, and `leaderboard/old-page.tsx` are unused.
- Folder library search input is commented out on `/palmlets`. Search/sort/grid-list **inside** a folder is live (`FolderControls`, client-side).
- `NewFolderDialog` shows an emoji icon picker; the value is never sent and Prisma has no icon column.
- Landing feature copy still mentions “A/B Testing Lab”, “Performance Analytics”, and “AI-powered suggestions”. Lab is generate-then-save; `getSuggestions()` returns `[]`; there is no analytics store.

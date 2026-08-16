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

Unauthenticated visits to `(main)` redirect to `/`. Lab additionally redirects to `/auth/login` if the session has no user id.

## Routes

| Path | Intent |
| --- | --- |
| `/` | Landing page (`LandingPage`). Renders for both signed-in and signed-out users. |
| `/auth/[pathname]` | better-auth UI (`AuthCard`) from `@daveyplate/better-auth-ui`. Paths come from `authViewPaths`. |
| `/dashboard` | Quick-start cards + 3 most recently edited palmlets. Starts the onboarding tour. |
| `/palmlets` | Folder grid. Create/rename/delete folders. |
| `/palmlets/[folderNumber]` | Templates in a folder. `folderNumber` is the folder **id**, not a numeric index. |
| `/palmlets/[folderNumber]/editor/new` | New template (`id === ""` until first save). |
| `/palmlets/[folderNumber]/editor/[id]` | Existing template editor. |
| `/lab` | Prompt → Gemini → optional save into a folder. |
| `/community` | Share, browse, filter, upvote community templates. |
| `/leaderboard` | Top shared templates (by upvotes) and top creators (by share count). |
| `/settings` | Profile name, password, appearance, account deletion. Notifications and billing tabs are commented out. |
| `/profile` | Profile page. |
| `/api/auth/[...all]` | better-auth GET/POST handler. |

## Auth

Server config: `src/lib/auth.ts`. Client: `src/lib/auth-client.ts`. Root providers wrap the tree in `AuthUIProvider`.

- Adapter: Prisma, Postgres
- Email/password with `autoSignIn: true`
- Google social provider
- `user.deleteUser.enabled: true` — Settings calls `authClient.deleteUser()`. Related rows cascade via Prisma `onDelete: Cascade`
- `trustedOrigins`: `http://localhost:3000`, `https://palmy.pro`, `https://www.palmy.pro`

Google OAuth in Google Cloud Console must list the same origins plus the better-auth callback URL.

## Data model (Prisma)

Defined in `prisma/schema.prisma`. Client output: `src/generated/prisma`.

| Model | Role |
| --- | --- |
| `User` | Auth user + `onboardingCompleted` (default `false`) |
| `Palmlet_Folder` | Per-user folder. Unique on `(userId, folderName)` |
| `Palmlet` | Template in a folder. Unique on `(folderId, title)` |
| `Palmlet_Tag` | **Globally** unique `tagName`, many-to-many with palmlets |
| `Palmlet_Variable` | **Globally** unique `variableName`, shared by personal and community templates |
| `SharedPalmlet` | Community post: title, content, `upvotes`, enum `tags`, variables |
| `Session` / `Account` / `Verification` | better-auth tables |

Deleting a folder runs a transaction: delete its palmlets, then the folder (`src/actions/palmlet-folder.ts`). Deleting a user cascades folders, palmlets, and shared posts.

## Server actions vs data helpers

| Layer | Location | Writes? |
| --- | --- | --- |
| Server actions | `src/actions/*.ts` (`"use server"`) | Yes (create/update/delete, AI calls, onboarding flag) |
| Data helpers | `src/lib/data/*.ts` | No. Used by server components |

Palmlet create/update validate with Zod (`src/zod/palmlet.ts`). Community share validates with `createCommunityTemplateSchema` (title ≤ 100, content ≤ 5000, ≤ 5 enum tags).

Variables in the editor are **not** typed by the user as a separate list. On save, the editor extracts unique `{{name}}` tokens from content with `/\{\{(.*?)\}\}/` and passes them to `createNewPalmlet` / `updatePalmlet`.

## Sidebar and theme

`SidebarProvider` defaults to open. `AppSidebar` uses `collapsible="icon"` (desktop). Mobile uses `MobileNav`. Collapse state is stored in the `sidebar_state` cookie (7-day max age) by the shadcn sidebar primitive; keyboard shortcut is `b` (with Ctrl/Cmd).

Theme: `next-themes`, default `dark`, `enableSystem`. Toggle lives in the sidebar footer.

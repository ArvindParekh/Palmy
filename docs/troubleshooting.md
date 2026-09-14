# Setup, operations, and pitfalls

## Local setup failures

**`prisma generate` / missing `@/generated/prisma`**

The client is generated to `src/generated/prisma` and gitignored. Run `pnpm install` (postinstall) or `pnpm exec prisma generate` after clone. Server imports fail until this exists.

**Migrations vs `DIRECT_URL`**

`schema.prisma` requires both `DATABASE_URL` and `DIRECT_URL`. For a single local Postgres instance, set them to the same connection string. Hosted pools (for example Prisma Accelerate or Neon pooled) typically use the pooled URL as `DATABASE_URL` and the unpooled URL as `DIRECT_URL`.

**Auth client points at the wrong host**

`authClient` uses `process.env.BETTER_AUTH_URL`. If this is unset or still set to production while you run `pnpm dev`, sign-in and session calls go to the wrong origin.

**OAuth / CSRF / callback errors**

`trustedOrigins` in `src/lib/auth.ts` must include the browser origin. Production currently allows `https://palmy.pro` and `https://www.palmy.pro`. A new preview URL will fail until that list is updated. Google OAuth settings must match.

Landing links to `/auth/sign-in` and `/auth/sign-up`. Lab’s missing-user redirect is `/auth/login`. Those pathnames come from `@daveyplate/better-auth-ui` (`authViewPaths`). If a path 404s, check that library’s view names rather than adding a custom route.

**AI calls fail immediately**

Lab, editor generate, selection rewrite, and performance analysis all need `GOOGLE_GENERATIVE_AI_API_KEY`. Failures surface as toasts (`Failed to generate text`, `Failed to improve text`, or the analysis error message).

**`.env.example` never shows up in git**

`.gitignore` uses `.env*`, so any file starting with `.env` is ignored. Keep the variable table in the README as the source of truth.

## Data constraints

| Constraint | Failure mode |
| --- | --- |
| `(userId, folderName)` unique | Creating a folder with a name the user already has returns Prisma’s unique-violation message |
| `(folderId, title)` unique | Saving a second `"Custom Template"` (Lab’s default title) into the same folder fails |
| `Palmlet_Tag.tagName` globally unique | Tags are shared across all users via `connectOrCreate` |
| `Palmlet_Variable.variableName` globally unique | Same for `{{variables}}` |

Folder delete is a transaction that first deletes palmlets, then the folder. Account delete uses better-auth `deleteUser` and Prisma `onDelete: Cascade`.

`addTagsToPalmlet` and `updatePalmlet` replace the entire tag (and, for update, variable) set. Passing only the new names would wipe existing ones; the dialogs send the full list. `AddTagsDialog` lowercases names and stops at 10 tags.

Folder emoji in **New Folder** is not stored (`Palmlet_Folder` has no icon field). Do not debug “missing icons” as a Prisma issue.

## Community behavior

- **Upvotes** (`upvotePost`) always `increment: 1`. There is no per-user vote table. The UI’s `isUpvoting` flag is cleared before the server call finishes, so rapid clicks can increment twice. A page refresh can upvote again.
- **Popular vs Recent** is a client sort of the posts already loaded. Initial load is latest 10 (`getLatestPalmlets`). “Load more” pages 10 at a time (`skip: (page - 1) * 10`). Switching to Popular does not fetch the server-side popular list (`getPopularPalmlets` is loaded on the page but unused by feed state).
- **Fork** UI exists (`ForkTemplateDialog`) but `handleFork` throws `"Fork functionality not yet implemented"`.
- Share tags must be one of: `LinkedIn`, `Outreach`, `Networking`, `FollowUp`, `Interview`, `PostInterview`, `CoverLetter`, `Startups`, `ColdEmail` (max 5).

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
- Editor header Share is not wired.
- `getSuggestions` is a no-op (empty array) to avoid extra model cost.
- `src/components/personalization-modal.tsx` is unused; use `UseTemplateDialog`.
- Desktop sidebar does not show the `badge` fields on Templates/Lab. Mobile nav **does** show hardcoded `"24"` and `"3"`.
- Profile achievements, forks, and ratings are not live data. Edit Profile has no handler.
- `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so `pnpm build` can succeed with type/lint errors. Use `pnpm lint` separately.
- Onboarding `updateUserOnboardingStatus` does not verify the caller owns `userId`.
- Most other mutations (`createNewPalmlet`, folder CRUD, `upvotePost`, `createCommunityTemplate`, `updateUserPassword`) also skip ownership checks. See [server-actions.md](server-actions.md).

## Local runbooks

**Replay the onboarding tour**

There is no in-app reset. In Prisma Studio (`pnpm exec prisma studio`) or SQL:

```sql
UPDATE "user" SET "onboardingCompleted" = false WHERE email = 'you@example.com';
```

Then reload `/dashboard`. **Take Tour** only renders when the flag is `false`. Closing the tour via the mask does not write the flag; finishing the last step does.

**Inspect unique-constraint failures**

Lab default titles (`"Custom Template"`, `"Cold Email Template"`, …) collide on `(folderId, title)`. Folder names collide on `(userId, folderName)`. Prisma returns the raw unique-violation string to the toast for folder create; palmlet create maps it to `"Failed to create palmlet"`.

**Confirm generated Prisma client**

```bash
pnpm exec prisma generate
ls src/generated/prisma
```

If `ls` fails, server imports of `@/generated/prisma` will fail at runtime.

## Auth runbook (production)

1. Confirm `BETTER_AUTH_URL` is the public site origin (apex or `www`, matching what users type).
2. Confirm `trustedOrigins` includes every hostname users actually type (apex + `www`).
3. Confirm Google OAuth authorized origins and redirect URIs.
4. After changing origins, redeploy; the list is compile-time config, not an env var.

## Prisma workflow

```bash
pnpm exec prisma migrate dev --name <change>
pnpm exec prisma generate
```

Do not commit `src/generated/prisma`. Do commit new files under `prisma/migrations/`.

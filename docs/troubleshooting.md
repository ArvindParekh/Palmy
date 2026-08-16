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

## Community behavior

- **Upvotes** (`upvotePost`) always `increment: 1`. There is no per-user vote table. The UI guards with local `isUpvoting` and `useOptimistic`; a refresh can upvote again.
- **Popular vs Recent** is a client sort of the posts already loaded. Initial load is latest 10 (`getLatestPalmlets`). “Load more” pages 10 at a time (`skip: (page - 1) * 10`). Switching to Popular does not fetch the server-side popular list (`getPopularPalmlets` is loaded on the page but the feed state starts from latest).
- **Fork** UI exists (`ForkTemplateDialog`) but `handleFork` throws `"Fork functionality not yet implemented"`.
- Share tags must be one of: `LinkedIn`, `Outreach`, `Networking`, `FollowUp`, `Interview`, `PostInterview`, `CoverLetter`, `Startups`, `ColdEmail` (max 5).

## Settings and product flags

- Notifications and billing tabs are commented out in `settings-client-page.tsx`.
- Editor header Share is not wired.
- `getSuggestions` is a no-op (empty array) to avoid extra model cost.
- `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so `pnpm build` can succeed with type/lint errors. Use `pnpm lint` separately.

## Auth runbook (production)

1. Confirm `BETTER_AUTH_URL` is the public site origin.
2. Confirm `trustedOrigins` includes every hostname users actually type (apex + `www`).
3. Confirm Google OAuth authorized origins and redirect URIs.
4. After changing origins, redeploy; the list is compile-time config, not an env var.

## Prisma workflow

```bash
pnpm exec prisma migrate dev --name <change>
pnpm exec prisma generate
```

Do not commit `src/generated/prisma`. Do commit new files under `prisma/migrations/`.

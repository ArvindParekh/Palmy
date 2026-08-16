# Palmy

Never write the same email, message, or document twice!

Palmy turns repetitive text into reusable templates with `{{variables}}` that adapt to each situation. Store personal templates in folders, generate drafts with AI, and browse community templates.

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Postgres via Prisma
- better-auth (email/password + Google)
- Vercel AI SDK + Google Gemini (`gemini-2.0-flash`)
- Tailwind CSS v4 + shadcn/ui

## Documentation

| Doc | What it covers |
| --- | --- |
| [Architecture](docs/architecture.md) | Routes, data model, server actions, auth |
| [Editor AI](docs/editor-ai.md) | Generation, selection rewrite, performance analysis |
| [Onboarding](docs/onboarding.md) | Multi-page tour, DB flag, URL continuation |
| [Troubleshooting](docs/troubleshooting.md) | Setup, env, and common pitfalls |

`mvp.md` is a historical v0.dev design prompt, not a description of the current app.

## Prerequisites

- Node.js 20+
- pnpm
- A Postgres database (local or hosted). Prisma expects both `DATABASE_URL` and `DIRECT_URL`.

## Environment variables

Create a `.env` file in the repo root. `.env*` is gitignored (including `.env.example`), so copy from this table:

| Variable | Used by | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Prisma | Pooled connection string |
| `DIRECT_URL` | Prisma | Direct connection for migrations |
| `BETTER_AUTH_URL` | `src/lib/auth-client.ts` | Auth client base URL, e.g. `http://localhost:3000` |
| `BETTER_AUTH_SECRET` | better-auth | Required by the library; generate a long random string |
| `GOOGLE_CLIENT_ID` | `src/lib/auth.ts` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | `src/lib/auth.ts` | Google OAuth client secret |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `@ai-sdk/google` | Gemini key for Lab and editor AI |

Trusted auth origins are hardcoded in `src/lib/auth.ts`: `http://localhost:3000`, `https://palmy.pro`, and `https://www.palmy.pro`. Add a new origin there if you serve the app from another host.

## Getting started

```bash
pnpm install
pnpm exec prisma migrate deploy
pnpm dev
```

`pnpm install` runs `prisma generate` via the `postinstall` script. The generated client lives in `src/generated/prisma` (gitignored).

Open [http://localhost:3000](http://localhost:3000). Unauthenticated users see the landing page. Signed-in routes live under `(main)` and redirect to `/` when there is no session.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build (`next.config.ts` currently ignores TS and ESLint errors) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm exec prisma migrate dev` | Create/apply migrations locally |
| `pnpm exec prisma studio` | Inspect the database |

## Project layout

```
src/app/(main)/     Authenticated app (dashboard, palmlets, lab, community, …)
src/app/auth/       better-auth UI routes (`/auth/[pathname]`)
src/app/api/auth/   better-auth HTTP handler
src/actions/        Server actions (palmlets, folders, community, AI, user)
src/lib/data/       Read helpers used by server components
src/lib/auth.ts     better-auth server config
prisma/schema.prisma
```

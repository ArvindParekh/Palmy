# Public interfaces

Palmy has one HTTP API (`/api/auth/[...all]`) plus Next.js server actions in `src/actions/`. Reads for pages usually go through `src/lib/data/` instead.

**Auth posture:** most actions do not call `auth.api.getSession()`. They trust `userId` / ids passed from the client. `(main)/layout.tsx` already redirects when there is no session, but that is not an ownership check. Folder and palmlet **reads** are also unscoped (see [architecture.md](architecture.md)). There is no `middleware.ts`.

## HTTP

| Method | Path | Handler |
| --- | --- | --- |
| GET, POST | `/api/auth/[...all]` | `toNextJsHandler(auth)` in `src/app/api/auth/[...all]/route.ts` |

Session, email/password, Google OAuth, and `deleteUser` all go through this route. There are no other `src/app/api/` routes.

## Server actions

### Palmlets — `src/actions/palmlet.ts`

| Action | Writes | Notes |
| --- | --- | --- |
| `createNewPalmlet(folderNumber, title, content, tags, variables)` | Insert `Palmlet` + `connectOrCreate` tags/variables | Zod: `createPalmletSchema`. `folderNumber` is the folder UUID. Does not check that the folder belongs to the caller or exists. **No `revalidatePath`.** Unique-constraint errors map to `"Failed to create palmlet"`. |
| `updatePalmlet(id, title, content, tags, variables, folderNumber)` | Replace tags **and** variables (`deleteMany` then `connectOrCreate`) | Zod: `updatePalmletSchema` (does **not** include `folderNumber`). `folderNumber` is only used to revalidate `/palmlets/{folderNumber}/editor/{id}`. Does not move folders. Title/content are optional in Zod, so `""` is allowed. |
| `addTagsToPalmlet(id, newTags, folderNumber)` | Replace **only** tags | UI sends the full list (`AddTagsDialog`). Revalidates `/palmlets/{folderNumber}`. |
| `deletePalmlet(id, folderNumber)` | Delete row | No ownership check. Revalidates the folder page. Tag/variable catalog rows stay (unless a nested `deleteMany` on another write removed them). |

`FolderControls` still imports `createNewPalmlet` for a leftover `handleNewTemplate`. The call is **five arguments** (matching the signature) but the **values are wrong**: `(folderName, folderNumber, folderId, userId, folderDescription)`. Only `folderName` and `folderNumber` are props; the rest are unbound identifiers. If Prisma somehow succeeded, the leftover success URL is `/palmlets/editor/[id]`, which is not a route. The wrapping `Link` still goes to `/editor/new`. Do not add create logic there.

`TemplateList.handleEditTemplate` also pushes `/palmlets/editor/[id]`. That function is passed as `onEdit` but `TemplateCard` never calls `onEdit` — the live Edit menu uses `/palmlets/{folderId}/editor/{id}`.

Nested `deleteMany: {}` on implicit many-to-many `tags` / `variables` targets related catalog rows, which are globally unique and shared. Use `set` when the intent is to replace join rows for one palmlet.

### Folders — `src/actions/palmlet-folder.ts`

| Action | Writes | Notes |
| --- | --- | --- |
| `createPalmletFolder({ userId, folderName, folderDescription })` | Insert | `userId` comes from the client (`authClient.useSession()` or Lab’s page prop). Unique on `(userId, folderName)`. Revalidates `/palmlets`. Folder-create errors return Prisma’s message string (including unique violations). |
| `updatePalmletFolder({ folderId, folderName, folderDescription })` | Update name/description | Icon picker in `NewFolderDialog` is **not** sent; Prisma has no icon field. |
| `deletePalmletFolder(folderId)` | Transaction: delete palmlets, then folder | Schema already `onDelete: Cascade` from folder → palmlets. The explicit `deleteMany` is redundant with that cascade. |
| `getPalmletFolders(userId)` | None (read) | Used as a read by `/palmlets` and `/lab`. Prefer `src/lib/data/` for new reads. |

### Community — `src/actions/community.ts`

| Action | Writes | Notes |
| --- | --- | --- |
| `createCommunityTemplate({ userId, title, content, tags, variables })` | Insert `SharedPalmlet` | Zod: title ≤ 100, content ≤ 5000, ≤ 5 enum tags. Copies data; no FK to the original `Palmlet`. No revalidate; the feed prepends locally. **`console.log`s the payload** (title, content, userId). |
| `loadMorePalmlets(page)` | None | Always `createdAt desc`, `take: 10`, `skip: (page - 1) * 10`. Offset pagination, not cursor. |
| `upvotePost(postId)` | `upvotes: { increment: 1 }` | No session, no per-user uniqueness, no toggle. |

### AI — `src/actions/ai.ts`

All live model calls use `google("gemini-2.0-flash")` and `GOOGLE_GENERATIVE_AI_API_KEY`.

| Action | Model? | Notes |
| --- | --- | --- |
| `generatePalmletText(prompt, palmletContent)` | Yes | Lab and editor “Generate with AI…”. System prompt in `src/lib/system-prompt.ts`. |
| `improvePalmletText(text, action, context?)` | Yes | Selection toolbar. `action`: `improve` \| `rephrase` \| `shorten` \| `expand` \| `formal` \| `casual`. `temperature: 0.1`. |
| `performAnalysis(text)` | Yes | `generateObject` + `aiAnalysisSchema` (`toneAnalysis`, `messageLength`, `proTip`). Not persisted. |
| `detectVariables(text, cursorPosition?)` | No | Regex `/\{\{([^}]+)\}\}/g`, unique names. `cursorPosition` is unused. |
| `getSuggestions(text, cursorPosition?)` | No | Always `{ suggestions: [] }` (stubbed to avoid extra cost). |

### User and onboarding

| Action | File | Notes |
| --- | --- | --- |
| `updateUserDetails(userId, name)` | `src/actions/user.ts` | Zod name min 1. Calls `auth.api.updateUser` with request headers (session cookie). Bio / avatar / email are not written here. |
| `updateUserPassword(userId, newPassword)` | `src/actions/user.ts` | Hashes via `auth.$context.password.hash`, then `internalAdapter.updatePassword(userId, hash)`. Zod password min **1**. Does not verify the current password. Uses the id from the settings page, not a server-side ownership check. |
| `updateUserOnboardingStatus(status, userId)` | `src/actions/onboarding.ts` | Sets `User.onboardingCompleted`. No ownership check. Revalidates `/dashboard`. |

## Data helpers (reads)

Used by server components. They do not revalidate and do not take a session.

| Helper | File | Query |
| --- | --- | --- |
| `getPalmlet` | `src/lib/data/palmlet.ts` | One palmlet + tags + variables. `findUnique` miss returns `{ success: true, data: null }`. Catch return **omits** `success` (editor treats that as `notFound()`). |
| `getFolderPalmlets` | same | Folder templates, `updatedAt` desc. Unknown folder → `{ success: true, data: [] }`. |
| `getFolderInfo` | same | Folder + palmlets + user. Unknown folder → `{ success: true, data: null }`. **No `userId` filter.** |
| `getUserPalmlets` | same | All of a user’s palmlets — **defined, never called** |
| `getRecentlyEditedPalmlets` | same | `take: 3`, `updatedAt` desc (dashboard). Catch omits `data`; dashboard then hides Recently Edited. |
| `getUserOnBoardingStatus` | same | `onboardingCompleted` boolean |
| `getLatestPalmlets` | `src/lib/data/community.ts` | Latest 10 shared posts (includes author `email`) |
| `getPopularPalmlets` | same | Top 10 by upvotes (**fetched** on `/community`, unused by feed state) |
| `getUserWithPalmlets` | `src/lib/data/user.ts` | User + nested folders/palmlets |
| `getUserInfo` | same | Name, email, image, dates (settings + sidebar). Does not select `id`; settings merges `session.user.id`. |
| `getTopTemplates` | `src/lib/data/leaderboard.ts` | Shared posts, upvotes desc, take 10 |
| `getTopCreators` | same | Users by share **count** desc, take 10; also sums `totalUpvotes` |

## Constraints to keep in mind

- Personal tags from `AddTagsDialog` are **lowercased** and capped at **10**. Community share tags are the Prisma enum (max 5) and are **not** lowercased.
- `Palmlet_Tag.tagName` and `Palmlet_Variable.variableName` are globally unique. `connectOrCreate` shares rows across users.
- Deleting a palmlet does not delete the tag/variable catalog rows (many-to-many).
- Editor save re-sends `templateData.tags` from page load; tag edits happen on the folder list, not in the editor.
- Variable regex is not identical everywhere: editor uses `/{{(.*?)}}/g` (can match empty `{{}}`); `detectVariables` / `UseTemplateDialog` use `/\{\{([^}]+)\}\}/g` (at least one character inside).

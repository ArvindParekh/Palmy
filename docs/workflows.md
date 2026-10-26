# Developer workflows

These are the live product paths, verified against current source. Do not treat `mvp.md` as a workflow spec.

## Create a folder and template

1. `/palmlets` → **New Folder** → `createPalmletFolder({ userId, folderName, folderDescription })`. `userId` comes from `authClient.useSession()` in the dialog. The emoji icon picker is local UI only (not persisted; default `💻`). Card colors cycle `sage` / `lavender` / `cream` / `pearl` / `stone` / `mist` by index.
2. Open `/palmlets/[folderId]` (the `[folderNumber]` param is the folder UUID). Header emoji is always `💼`.
3. Create template → `/palmlets/[folderId]/editor/new`. The page passes `id === ""` and empty content into `EditorClientPage`. It does **not** verify the folder exists.
4. Save → `createNewPalmlet(folderId, title, content, tags, variables)` then `router.push` to `/editor/[newId]`. Editor save re-sends tags from page load; tag edits happen on the folder list (`AddTagsDialog` → `addTagsToPalmlet`).
5. Later edits → `updatePalmlet`. “No changes to save” compares title/content to the **SSR** `templateData`, not the last successful save. After an in-place save, clicking Save again still calls `updatePalmlet`. The “Last saved … ago” line also stays on the SSR `updatedAt` until reload.

**New Template button:** `FolderControls` wraps a `Link` to `/palmlets/{folderNumber}/editor/new` **and** calls leftover `handleNewTemplate` on click. That handler calls `createNewPalmlet(folderName, folderNumber, folderId, userId, folderDescription)` — five args, matching the function arity, but **positional values are wrong** (`folderName` as folder id, folder UUID as title). `folderId`, `userId`, and `folderDescription` are not props on `FolderControls` (`FolderClientWrapper` has `folderId` and never passes it). Prisma connect fails; leftover success would `router.push('/palmlets/editor/[id]')`, which is not a route. The `Link` still navigates to the blank editor. Do not wire new create logic there — follow the `Link` path.

**Edit from a card:** `TemplateCard` (compact and default) always `router.push`s `/palmlets/{folderId}/editor/{id}`. That is the live path. `TemplateList` still defines `handleEditTemplate` → `/palmlets/editor/{id}` and passes it as `onEdit`, but `TemplateCard` never calls `onEdit`. Duplicate is commented out in the card; `handleCopyTemplate` only `console.log`s.

Unknown folder UUIDs take the empty-folder branch (helpers return success with null/empty data, not 404). The heading is blank because `folderInfo.data?.folderName` is undefined. Empty folders skip the four-stat row but still render `FolderClientWrapper`, so New Template is shown. The wrapper receives `folderId=""` (`folderInfo.data?.id || ""`) for an unknown UUID; a real empty folder still has an id. Saving against a missing folder fails on Prisma `connect`.

Folder names are unique per user (`@@unique([userId, folderName])`). Template titles are unique per folder (`@@unique([folderId, title])`).

Personal tags from `AddTagsDialog` are lowercased, capped at 10, and stored in the global `Palmlet_Tag` catalog. Enter or Space adds a tag. Community share tags are a separate Prisma enum (max 5) and are not lowercased.

The folder page shows four stats: template count, unique tag names, total variable rows (not unique names), and **completion rate** (`%` of palmlets whose `content` is non-empty). Search, tag filter, sort (`updated` / `created` / `title` / `variables`), and grid/list view are client-side (`FolderControls` + `TemplateList`).

## Use a template (personalize)

Opened from the folder list (`TemplateList` → `UseTemplateDialog`). Not the unused `personalization-modal.tsx`. Community posts use `ContentPreviewDialog` (copy raw content, no fill-in). Dashboard Recently Edited cards render the same `TemplateCard` **without** `onUse` / `onAddTags` / `onDelete`, so those menu items no-op there. Edit from the dashboard card still works (card uses `folderId` itself).

1. Collect variable names from content (`\{\{([^}]+)\}\}`) **and** `Palmlet_Variable` rows.
2. Replace `{{name}}` as the user types. Unfilled names stay as `{{name}}` in the preview.
3. Copy / Download / Email stay disabled until every variable has a non-empty trimmed value (or the template has no variables).
4. Export:
   - Copy → `navigator.clipboard.writeText`
   - Download → `Blob` as `{title}.txt`
   - Email → `mailto:?subject={title}&body={content}` (no recipient)

This does **not** increment a usage counter. Prisma has no `timesUsed` field.

## Lab: generate then save

`/lab` sits under `(main)`, so a missing session already redirected to `/`. The page’s own `redirect("/auth/login")` only runs when a session exists without `user.id`.

1. Prompt (or an example chip) → `generatePalmletText(prompt, "")`. Chips **fill the prompt only**; they do not auto-generate.
2. Chip prompts (exact strings):
   - Cold Email → `Create a professional cold email template for reaching out to potential business partners about collaboration opportunities`
   - LinkedIn Outreach → `Generate a LinkedIn connection request template for networking with people in the tech industry`
   - Cover Letter → `Create a cover letter template for applying to software engineering positions at startups`
3. Enter submits; Shift+Enter does not (`onKeyPress`).
4. `detectVariables(text)` extracts `{{…}}` names for the save payload (regex, not an LLM).
5. Title is a prompt substring heuristic (case-insensitive):
   - contains `cold email` → `"Cold Email Template"`
   - contains `linkedin` → `"LinkedIn Outreach Template"`
   - contains `cover letter` → `"Cover Letter Template"`
   - contains `follow` → `"Follow-up Template"`
   - else `"Custom Template"`
6. A local `category` field is always `"Generated Template"` (not persisted). New folders created from Lab get description ``Folder for ${category}`` → `Folder for Generated Template`.
7. Save dialog: pick an existing folder **or** `createPalmletFolder` then `createNewPalmlet`. Tags are always `[]` from Lab. Saving with neither a selected folder nor a new name toasts `"Please select a folder or create a new one"`.
8. After save, Lab clears local state; it does **not** redirect to the editor (that `router.push` is commented out). `createNewPalmlet` does not revalidate `/palmlets`, so folder counts can stay stale until refresh.

Lab also exposes **Copy** on the generated draft (`navigator.clipboard.writeText`) before save.

Editor generate is a different UI: a freeform `AICommandMenu` dialog (no chips). See [editor-ai.md](editor-ai.md).

## Settings

| Tab / control | Writes |
| --- | --- |
| Public Profile → Full Name | `updateUserDetails` → `auth.api.updateUser` |
| Public Profile → Upload picture | No `onClick` |
| Public Profile → Bio | Local default string; never saved (Prisma has no bio field) |
| Public Profile → Username | Disabled; shows email |
| Account → Email / Update Email | Email input disabled; button has no handler |
| Account → Password | Only **New Password** is bound. Current password is ignored. `updateUserPassword` hashes and writes via better-auth; Zod min length is 1 |
| Account → Delete | Type `CONFIRM` (input is auto-uppercased) → `authClient.deleteUser()`. The `userId` prop is unused |
| Appearance | `next-themes` (`light` / `dark` / `system`). No server write |

Notifications and billing tabs are commented out in `settings-client-page.tsx`. Appearance still uses a local placeholder `Switch`, not the shadcn Switch component.

Password update does not verify that the caller owns `userId` beyond the Zod parse; it uses the id passed from the settings page’s session (`getUserInfo` does not select `id`; the page merges `session.user.id`).

## Profile

Reached from the sidebar footer name (`/profile`), not the main nav.

| Surface | Source |
| --- | --- |
| Name, email, avatar, joined date, template list | `getUserWithPalmlets` |
| Template count | Flattened `folders.palmlets` |
| Forks / avg rating | Hardcoded `0` |
| Achievements | Static array in `profile/page.tsx` (`earned: true/false` is not computed) |
| Edit Profile button | No `onClick` |
| Recent Activity | Placeholder copy |
| Handle line | Renders `@{userData.email}` (email, not a username). The line under it repeats `userData.email` as a bio stand-in |

The page `console.log`s `allPalmlets` and `userData` on every server render.

## Dashboard

- Live page: `src/app/(main)/dashboard/page.tsx`. `src/components/dashboard.tsx` is an unused mock.
- Quick-start cards: `/palmlets`, `/lab`, `/community` (`data-tour="quick-start-0"` … `2`). CTAs: New Template / Use AI Assistant / Explore Library.
- Recently Edited: `getRecentlyEditedPalmlets` (`take: 3`, `updatedAt` desc). Hidden when empty or when the helper’s catch path omits `data`.
- Card overflow menu: **Edit** works; **Use / Manage Tags / Delete** no-op (handlers not passed).
- **Take Tour** only when `onboardingCompleted` is `false`. The tour does **not** auto-start on first visit — the user must click the button.
- No `<Toaster />` on this route.

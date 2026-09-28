# Developer workflows

These are the live product paths, verified against current source. Do not treat `mvp.md` as a workflow spec.

## Create a folder and template

1. `/palmlets` → **New Folder** → `createPalmletFolder({ userId, folderName, folderDescription })`. The emoji icon picker is local UI only (not persisted). Card colors cycle `sage` / `lavender` / `cream` / `pearl` / `stone` / `mist` by index.
2. Open `/palmlets/[folderId]` (the `[folderNumber]` param is the folder UUID). Header emoji is always `💼`.
3. Create template → `/palmlets/[folderId]/editor/new`. The page passes `id === ""` and empty content into `EditorClientPage`. It does **not** verify the folder exists.
4. Save → `createNewPalmlet(folderId, title, content, tags, variables)` then `router.push` to `/editor/[newId]`. Editor save re-sends tags from page load; tag edits happen on the folder list (`AddTagsDialog` → `addTagsToPalmlet`).
5. Later edits → `updatePalmlet`. “No changes to save” compares title/content to the **SSR** `templateData`, not the last successful save. After an in-place save, clicking Save again still calls `updatePalmlet`. The “Last saved … ago” line also stays on the SSR `updatedAt` until reload.

**New Template button:** `FolderControls` wraps a `Link` to `/palmlets/{folderNumber}/editor/new` **and** calls leftover `handleNewTemplate` on click. That handler calls `createNewPalmlet(folderName, folderNumber, folderId, userId, folderDescription)` — five args, matching the function arity, but **positional values are wrong** (`folderName` as folder id, folder UUID as title). `folderId`, `userId`, and `folderDescription` are not props on `FolderControls` (`FolderClientWrapper` has `folderId` and never passes it). Prisma connect fails; leftover success would `router.push('/palmlets/editor/[id]')`, which is not a route. The `Link` still navigates to the blank editor. Do not wire new create logic there — follow the `Link` path.

Unknown folder UUIDs take the empty-folder branch (helpers return success with null/empty data, not 404). Empty folders skip the four-stat row but still render `FolderClientWrapper`, so New Template works.

Folder names are unique per user (`@@unique([userId, folderName])`). Template titles are unique per folder (`@@unique([folderId, title])`).

Personal tags from `AddTagsDialog` are lowercased, capped at 10, and stored in the global `Palmlet_Tag` catalog. Community share tags are a separate Prisma enum (max 5) and are not lowercased.

The folder page shows four stats: template count, unique tag names, total variable rows (not unique names), and **completion rate** (`%` of palmlets whose `content` is non-empty). Search, tag filter, sort (`updated` / `created` / `title` / `variables`), and grid/list view are client-side (`FolderControls` + `TemplateList`).

## Use a template (personalize)

Opened from the folder list (`TemplateList` → `UseTemplateDialog`). Not the unused `personalization-modal.tsx`. Community posts use `ContentPreviewDialog` (copy raw content, no fill-in).

1. Collect variable names from content (`\{\{([^}]+)\}\}`) **and** `Palmlet_Variable` rows.
2. Replace `{{name}}` as the user types. Unfilled names stay as `{{name}}` in the preview.
3. Copy / Download / Email stay disabled until every variable has a non-empty trimmed value (or the template has no variables).
4. Export:
   - Copy → `navigator.clipboard.writeText`
   - Download → `Blob` as `{title}.txt`
   - Email → `mailto:?subject={title}&body={content}` (no recipient)

This does **not** increment a usage counter. Prisma has no `timesUsed` field.

## Lab: generate then save

`/lab` requires a session user id (otherwise `/auth/login`).

1. Prompt (or an example chip: Cold Email / LinkedIn Outreach / Cover Letter) → `generatePalmletText(prompt, "")`.
2. Enter submits; Shift+Enter does not.
3. `detectVariables(text)` extracts `{{…}}` names for the save payload (regex, not an LLM).
4. Title is a prompt substring heuristic:
   - contains `cold email` → `"Cold Email Template"`
   - contains `linkedin` → `"LinkedIn Outreach Template"`
   - contains `cover letter` → `"Cover Letter Template"`
   - contains `follow` → `"Follow-up Template"`
   - else `"Custom Template"`
5. Save dialog: pick an existing folder **or** `createPalmletFolder` then `createNewPalmlet`. Tags are always `[]` from Lab. Saving with neither a selected folder nor a new name toasts `"Please select a folder or create a new one"`. New folders get description `Folder for Generated Template`.
6. After save, Lab clears local state; it does **not** redirect to the editor. `createNewPalmlet` does not revalidate `/palmlets`, so folder counts can stay stale until refresh.

Lab also exposes **Copy** on the generated draft (`navigator.clipboard.writeText`) before save.

## Settings

| Tab / control | Writes |
| --- | --- |
| Public Profile → Full Name | `updateUserDetails` → `auth.api.updateUser` |
| Public Profile → Upload picture | No `onClick` |
| Public Profile → Bio | Local default string; never saved (Prisma has no bio field) |
| Public Profile → Username | Disabled; shows email |
| Account → Email / Update Email | Email input disabled; button has no handler |
| Account → Password | Only **New Password** is bound. Current password is ignored. `updateUserPassword` hashes and writes via better-auth; Zod min length is 1 |
| Account → Delete | Type `CONFIRM` (input is uppercased) → `authClient.deleteUser()`. The `userId` prop is unused |
| Appearance | `next-themes` (`light` / `dark` / `system`). No server write |

Notifications and billing tabs are commented out in `settings-client-page.tsx`.

Password update does not verify that the caller owns `userId` beyond the Zod parse; it uses the id passed from the settings page’s session.

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
| Handle line | Renders `@{userData.email}` (email, not a username) |

The page `console.log`s `allPalmlets` and `userData` on every server render.

## Dashboard

- Quick-start cards: `/palmlets`, `/lab`, `/community` (`data-tour="quick-start-0"` … `2`).
- Recently Edited: `getRecentlyEditedPalmlets` (`take: 3`, `updatedAt` desc). Hidden when empty.
- **Take Tour** only when `onboardingCompleted` is `false`.
- No `<Toaster />` on this route.

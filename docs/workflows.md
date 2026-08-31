# Developer workflows

These are the live product paths, verified against current source. Do not treat `mvp.md` as a workflow spec.

## Create a folder and template

1. `/palmlets` → **New Folder** → `createPalmletFolder({ userId, folderName, folderDescription })`.
2. Open `/palmlets/[folderId]` (the `[folderNumber]` param is the folder UUID).
3. Create template → `/palmlets/[folderId]/editor/new`. The page passes `id === ""` and empty content into `EditorClientPage`.
4. Save → `createNewPalmlet(folderId, title, content, tags, variables)` then `router.push` to `/editor/[newId]`.
5. Later edits → `updatePalmlet`. Save is a no-op toast if title and content are unchanged.

Folder names are unique per user (`@@unique([userId, folderName])`). Template titles are unique per folder (`@@unique([folderId, title])`).

## Use a template (personalize)

Opened from the folder list (`TemplateList` → `UseTemplateDialog`). Not the unused `personalization-modal.tsx`.

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

1. Prompt (or an example chip) → `generatePalmletText(prompt, "")`.
2. `detectVariables(text)` extracts `{{…}}` names for the save payload.
3. Title is a prompt substring heuristic (cold email / LinkedIn / cover letter / follow → else `"Custom Template"`).
4. Save dialog: pick an existing folder **or** `createPalmletFolder` then `createNewPalmlet`. Tags are always `[]` from Lab.
5. After save, Lab clears local state; it does **not** redirect to the editor.

## Settings

| Tab | Writes |
| --- | --- |
| Public Profile | `updateUserDetails` → `auth.api.updateUser` (name only) |
| Account | `updateUserPassword` hashes via `auth.$context.password.hash` then `internalAdapter.updatePassword`; delete → `authClient.deleteUser()` after typing `CONFIRM` |
| Appearance | `next-themes` (`light` / `dark` / `system`). No server write |

Notifications and billing tabs are commented out in `settings-client-page.tsx`.

Password update does not verify that the caller owns `userId` beyond the Zod parse; it uses the id passed from the settings page’s session.

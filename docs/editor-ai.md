# Editor and AI

The palmlet editor (`src/components/palmlet/editor/editor-client-page.tsx`) is a textarea plus a sidebar with Preview, Variables, and AI tabs. On viewports below `md`, the sidebar is a toggle (`isSidebarOpen`). Lab (`/lab`) reuses the same generation server action.

All model calls use `@ai-sdk/google` with **`gemini-2.0-flash`**. The API key is `GOOGLE_GENERATIVE_AI_API_KEY` (read by the SDK, not by app code).

`src/app/(main)/palmlets/[folderNumber]/editor/new/page.tsx` is mostly a **commented-out historical client editor** (~310 lines). The live export is the last ~20 lines, which pass `id === ""` into `EditorClientPage`. Do not edit the commented block.

## Variables

Placeholders use double curly braces:

```
Hi {{HiringManager}}, I'm applying for {{Role}} at {{Company}}.
```

- Detected in the editor with `content.match(/{{(.*?)}}/g)` (unique names only; empty `{{}}` can match). A comment in the editor says not to concat stored `Palmlet_Variable` rows — live badges come from content only.
- Shown as badges on the Variables tab
- Highlighted in Preview (`previewContent.split(/({{.*?}})/)`)
- Persisted via `Palmlet_Variable.connectOrCreate` on save
- Filled at use-time in `UseTemplateDialog` (copy, `.txt` download, or `mailto:`)

`detectVariables()` in `src/actions/ai.ts` is a regex helper (`/\{\{([^}]+)\}\}/g`), not an LLM call. Its `cursorPosition` argument is unused. Lab calls it after generate; the editor does not. `getSuggestions()` currently returns an empty list (intentionally stubbed to avoid extra model cost).

## Generate a full template

Two UIs call `generatePalmletText`:

| UI | Prompt source | Current content passed? |
| --- | --- | --- |
| Editor AI tab → “Generate with AI…” → `AICommandMenu` | Freeform textarea. Generate is disabled until the prompt is non-empty. Placeholder example is a Senior Software Engineer cover letter. **No chips.** | Yes — `generatePalmletText(prompt, content)` |
| Lab prompt input | Freeform + three chips that **fill the prompt only** (do not auto-generate). Enter submits; Shift+Enter does not. | No — `generatePalmletText(prompt, "")` |

The editor also `console.log`s the prompt before calling the model.

**Codepath:** `generatePalmletText(prompt, palmletContent)` → `generateText` with `systemPrompt` from `src/lib/system-prompt.ts`.

The system prompt requires:

- Output **only** template body (no markdown, no explanations)
- Include 3–8 `{{variables}}`
- Job search / networking / outreach voice

In the editor, a successful generate calls `handleContentChange(result.text)`. That **replaces the whole document only when `selection` is null**. If a selection is still set (toolbar visible), generate splices the model output into `[selection.start, selection.end)` the same way a rewrite does. Lab keeps the result in local state until the user saves into a folder.

Lab title heuristics (substring match on the prompt, case-insensitive): cold email, LinkedIn, cover letter, follow → otherwise `"Custom Template"`. Duplicate titles in the same folder fail the `(folderId, title)` unique constraint.

## Rewrite selected text

Select text in the editor (mouseup or keyup). `InlineAIToolbar` appears above the selection (`translate(-50%, -100%)` from the measured caret). The toolbar returns `null` when `position.top` is falsy. Position is measured by cloning textarea styles into a hidden `div`.

| Action id | UI | Prompt intent |
| --- | --- | --- |
| `improve` | Labeled **Improve** button | Improve writing, keep meaning and `{{variables}}` |
| `rephrase` | Icon | Different wording |
| `shorten` | Icon | More concise |
| `expand` | Icon | More detail |
| `formal` | Icon (tone group) | Formal tone |
| `casual` | Icon (tone group) | Casual tone |

**Codepath:** `improvePalmletText(selectedText, action, fullContent)` → `generateText` at `temperature: 0.1`. The model is instructed to return **only** the rewritten selection. `handleAICommand` then calls `handleContentChange(result.text)`. Because `selection` is still set, `handleContentChange` **splices** that string into `content` around `selection.start` / `selection.end`, adding spaces if the neighbors are not whitespace. The replacement is `value.trim()`’d first.

If generation fails, the action returns `{ success: false, error: "Failed to improve text" }` and the UI toasts.

The textarea `onChange` also goes through `handleContentChange`. Selection is cleared on **keyup** after a collapsed range — `onChange` fires first. If `selection` is still set, a keystroke treats the **entire** new textarea value as the replacement for the selected range and splices it in. AI rewrite depends on that splice path; typing while a selection is active can duplicate content.

## Performance analysis

AI tab → refresh on “AI Performance Score” → `performAnalysis(content)` → `generateObject` with `aiAnalysisSchema`:

| Field | Values | Meaning (from `analysisPrompt`) |
| --- | --- | --- |
| `toneAnalysis` | `positive` \| `negative` \| `neutral` | Warmth / confidence / engagement |
| `messageLength` | `short` \| `medium` \| `long` | short &lt; 100 words, medium 100–200, long &gt; 200 |
| `proTip` | string | One actionable suggestion, intended &lt; 30 words |

Empty content is rejected in the client (`"No content to analyze"`). Results are **not** stored in the database; they live in component state until refresh or navigation.

## Character and word count

The editor overlay shows:

- characters: `(content ?? "").length`
- words: `content.split(/\s+/).filter(word => word.length > 0).length`

Content is initialized with `templateData.content || ""`, so the overlay always sees a string after mount.

## Save

- New template (`id === ""`): `createNewPalmlet` then navigate to `/palmlets/{folderNumber}/editor/{newId}`.
- Existing template: `updatePalmlet`. Dirty check is `title === templateData.title && content === templateData.content` against the **SSR payload**, not the last successful save. Repeat Save after an in-place update hits the server again.
- Tags sent on save are `templateData.tags` from page load (editor does not edit tags). Variables sent on save are the unique names extracted from live content.
- Missing palmlet id on `/editor/[id]` → `notFound()`. `getPalmlet` returns `{ success: true, data: null }` for a miss; catch returns without `success`.
- New-template page does not load or validate the folder.

## Constraints and pitfalls

- Missing `GOOGLE_GENERATIVE_AI_API_KEY` fails all three live AI actions (`generatePalmletText`, `improvePalmletText`, `performAnalysis`).
- Selection rewrite depends on `selection` still being set when the result arrives; the editor does not clear selection before applying the replacement (`setSelection(null)` is commented out).
- Generate uses the same `handleContentChange` path. Opening the command menu without collapsing the selection splices the generated body into the range instead of replacing the document.
- The header **Share** button (`hidden sm:inline-flex`) has no `onClick`. Sharing is done from `/community`. There is no **Use** button in the live editor header.
- “Last saved … ago” uses `formatDistanceToNow(templateData.updatedAt)` from the server payload; an in-place save does not update it.
- New-template page (`editor/new/page.tsx`) reads `params.folderNumber` **without** awaiting (Next 15 `params` is a Promise). The existing-template page does `await params`.
- `next.config.ts` ignores TypeScript and ESLint errors at build time, so AI-related type issues will not fail `pnpm build`.

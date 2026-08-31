# Editor and AI

The palmlet editor (`src/components/palmlet/editor/editor-client-page.tsx`) is a textarea plus a sidebar with Preview, Variables, and AI tabs. Lab (`/lab`) reuses the same generation server action.

All model calls use `@ai-sdk/google` with **`gemini-2.0-flash`**. The API key is `GOOGLE_GENERATIVE_AI_API_KEY` (read by the SDK, not by app code).

## Variables

Placeholders use double curly braces:

```
Hi {{HiringManager}}, I'm applying for {{Role}} at {{Company}}.
```

- Detected in the editor with `content.match(/{{(.*?)}}/g)`
- Shown as badges on the Variables tab
- Highlighted in Preview
- Persisted via `Palmlet_Variable.connectOrCreate` on save
- Filled at use-time in `UseTemplateDialog` (copy, `.txt` download, or `mailto:`)

`detectVariables()` in `src/actions/ai.ts` is a regex helper, not an LLM call. `getSuggestions()` currently returns an empty list (intentionally stubbed to avoid extra model cost).

## Generate a full template

**UI**

- Editor AI tab → “Generate with AI…” → `AICommandMenu`
- Lab prompt input (Enter submits; Shift+Enter does not)

**Codepath:** `generatePalmletText(prompt, palmletContent)` → `generateText` with `systemPrompt` from `src/lib/system-prompt.ts`.

The system prompt requires:

- Output **only** template body (no markdown, no explanations)
- Include 3–8 `{{variables}}`
- Job search / networking / outreach voice

In the editor, a successful generate **replaces the whole document** (`handleContentChange` with no selection). Lab keeps the result in local state until the user saves into a folder.

Lab title heuristics (substring match on the prompt): cold email, LinkedIn, cover letter, follow → otherwise `"Custom Template"`. Duplicate titles in the same folder fail the `(folderId, title)` unique constraint.

## Rewrite selected text

Select text in the editor (mouseup or keyup). `InlineAIToolbar` appears above the selection.

| Action id | Prompt intent |
| --- | --- |
| `improve` | Improve writing, keep meaning and `{{variables}}` |
| `rephrase` | Different wording |
| `shorten` | More concise |
| `expand` | More detail |
| `formal` | Formal tone |
| `casual` | Casual tone |

**Codepath:** `improvePalmletText(selectedText, action, fullContent)` → `generateText` at `temperature: 0.1`. The model is instructed to return **only** the rewritten selection. The editor then splices that string back into `content` around `selection.start` / `selection.end`, adding spaces if needed.

If generation fails, the action returns `{ success: false, error: "Failed to improve text" }` and the UI toasts.

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

## Constraints and pitfalls

- Missing `GOOGLE_GENERATIVE_AI_API_KEY` fails all three live AI actions (`generatePalmletText`, `improvePalmletText`, `performAnalysis`).
- Selection rewrite depends on `selection` still being set when the result arrives; the editor does not clear selection before applying the replacement.
- The header **Share** button in the editor has no `onClick`. Sharing is done from `/community`.
- `next.config.ts` ignores TypeScript and ESLint errors at build time, so AI-related type issues will not fail `pnpm build`.

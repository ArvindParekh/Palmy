# Onboarding tour

First-time users see a **Take Tour** button on the dashboard (`QuickStart`). The tour does **not** auto-start on first visit — clicking the button starts a Reactour walkthrough across Dashboard → Templates → Lab → Community. Completion is stored on `User.onboardingCompleted` (Prisma, default `false`, added in `prisma/migrations/20250730174443_add_onboarding_status_field_to_user`).

`TourProvider` lives in root `src/app/providers.tsx` (around `{children}` inside `ThemeProvider`), so it wraps landing and auth as well as `(main)`. Vercel `<Analytics />` is a sibling under `AuthUIProvider`, not inside the tour tree. Steps only open when `startTour()` runs or `?tour=` is present.

`src/components/header.tsx` is unused. The `(main)` layout renders its own mobile header; tour steps target `data-tour` attributes, not that file.

## When the tour starts

`DashboardPage` loads `getUserOnBoardingStatus(userId)`. `QuickStart` shows **Take Tour** only when that flag is `false`. Clicking it calls `startTour()` (`currentStep = 0`, `setIsOpen(true)`).

There is no in-app control to reset the flag after completion. To replay locally, set `onboardingCompleted` back to `false` in the database.

## Cross-page continuation

Tour steps live in `src/lib/onboarding-steps.tsx`. `TourProvider` uses `onClickMask` to close the tour.

Some steps set `action: () => { window.location.href = '/…?tour=<section>' }`. Reactour runs `action` **when the step is shown**, which immediately hard-navigates. `useOnboardingTour()` (`src/hooks/use-tour.ts`) reads `?tour=` and jumps to a step index, then strips the query with `history.replaceState`.

| `?tour=` value | Step index | Lands on | Skips |
| --- | --- | --- | --- |
| `dashboard` | 0 | Dashboard first card | — |
| `templates` | 7 | `templates-new-folder` | `templates-header` (6) |
| `lab` | 11 | `lab-prompt-input` | `lab-header` (10) |
| `community` | 15 | `community-share-prompt` | `community-header` (14) |

The “welcome to this page” header steps exist in the step array but are skipped because continuation indexes the first interactive control, not the header.

Pages that must mount the hook for continuation: dashboard (`QuickStart`), templates (`TemplatesClientWrapper`), lab (`LabClientPage`), community (`CommunityPage`).

## Step map (selectors)

Selectors are `data-tour="…"` attributes. If you rename or remove one, the corresponding step highlights nothing.

| Order | Selector | Screen |
| --- | --- | --- |
| 0–2 | `quick-start-0` … `quick-start-2` | Dashboard cards (scratch / AI / community) |
| 3 | `quick-start-community` | Sidebar Community item |
| 4 | `quick-start-leaderboard` | Sidebar Leaderboard item |
| 5 | `quick-start-templates` | Sidebar Templates → navigates to `/palmlets?tour=templates` |
| 6–8 | `templates-header`, `templates-new-folder`, `templates-grid` | Folder library (6 skipped on continuation) |
| 9 | `quick-start-lab` | Sidebar Lab → `/lab?tour=lab` |
| 10–12 | `lab-header`, `lab-prompt-input`, `lab-generate-button` | Lab (10 skipped on continuation) |
| 13 | `quick-start-community` | Sidebar Community **again** (same selector as step 3) → `/community?tour=community` |
| 14–16 | `community-header`, `community-share-prompt`, `community-filters` | Community (14 skipped on continuation) |
| 17 | `body` | Completion card |

Lab also has an unused wrapper `data-tour="lab-input"` around the prompt row. Steps target `lab-prompt-input` / `lab-generate-button` on the input and button themselves.

The last step’s **Get Started!** button closes the tour and sends the user to `/dashboard`. `actionAfter` on that step calls `updateUserOnboardingStatus(true, userId)` via `authClient.getSession()`.

A commented-out dashboard folder step (`quick-start-3`) is not in the live array; keep indexes in `tourStepMapping` in sync if you insert steps before a navigation hop.

## Persistence

```
updateUserOnboardingStatus(status, userId)
  → prisma.user.update({ onboardingCompleted: status })
  → revalidatePath("/dashboard")
```

Defined in `src/actions/onboarding.ts`. The action does **not** check that the caller owns `userId`.

## Constraints

- Mask click closes the tour (`onClickMask` → `setIsOpen(false)`) without writing the DB flag, so **Take Tour** remains available.
- Completing the last step is what sets `onboardingCompleted`. Closing early does not.
- Hard navigations (`window.location.href`) are required because the tour state is client-only; URL params rehydrate the step after the new page loads.
- Sidebar `data-tour` ids are `quick-start-${item.id}` (`dashboard`, `templates`, `community`, `lab`, `leaderboard`, `settings`). Dashboard cards use numeric indexes `quick-start-0` … `2`. Those namespaces are different on purpose.
- Mobile nav does **not** set `data-tour` attributes. The tour targets desktop sidebar items; on a phone those selectors miss.

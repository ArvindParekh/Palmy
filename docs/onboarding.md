# Onboarding tour

First-time users get a Reactour walkthrough across Dashboard → Templates → Lab → Community. Completion is stored on `User.onboardingCompleted` (Prisma, default `false`, added in `prisma/migrations/20250730174443_add_onboarding_status_field_to_user`).

## When the tour starts

`DashboardPage` loads `getUserOnBoardingStatus(userId)`. `QuickStart` shows **Take Tour** only when that flag is `false`. Clicking it calls `startTour()` (`currentStep = 0`, `setIsOpen(true)`).

There is no in-app control to reset the flag after completion. To replay locally, set `onboardingCompleted` back to `false` in the database.

## Cross-page continuation

Tour steps live in `src/lib/onboarding-steps.tsx`. `TourProvider` wraps the app in `src/app/providers.tsx`.

Some steps call `window.location.href = '/…?tour=<section>'`. `useOnboardingTour()` (`src/hooks/use-tour.ts`) reads `?tour=` and jumps to a step index, then strips the query with `history.replaceState`.

| `?tour=` value | Step index | Page |
| --- | --- | --- |
| `dashboard` | 0 | `/dashboard` |
| `templates` | 7 | `/palmlets` |
| `lab` | 11 | `/lab` |
| `community` | 15 | `/community` |

Pages that must mount the hook for continuation: dashboard (`QuickStart`), templates (`TemplatesClientWrapper`), lab (`LabClientPage`), community (`CommunityPage`).

## Step map (selectors)

Selectors are `data-tour="…"` attributes. If you rename or remove one, the corresponding step highlights nothing.

| Order | Selector | Screen |
| --- | --- | --- |
| 0–2 | `quick-start-0` … `quick-start-2` | Dashboard cards (scratch / AI / community) |
| 3 | `quick-start-community` | Sidebar Community item |
| 4 | `quick-start-leaderboard` | Sidebar Leaderboard item |
| 5 | `quick-start-templates` | Sidebar Templates → navigates to `/palmlets?tour=templates` |
| 6–8 | `templates-header`, `templates-new-folder`, `templates-grid` | Folder library |
| 9 | `quick-start-lab` | Sidebar Lab → `/lab?tour=lab` |
| 10–12 | `lab-header`, `lab-prompt-input`, `lab-generate-button` | Lab |
| 13 | `quick-start-community` | Sidebar Community again → `/community?tour=community` |
| 14–16 | `community-header`, `community-share-prompt`, `community-filters` | Community |
| 17 | `body` | Completion card |

The last step’s **Get Started!** button closes the tour and sends the user to `/dashboard`. `actionAfter` on that step calls `updateUserOnboardingStatus(true, userId)` via `authClient.getSession()`.

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

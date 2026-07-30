# Collectogs

## Overview
Collectogs shows, for a given artist, which masters (albums) are missing from the user's Discogs collection. Primarily built for a personal portfolio and personal use, but should remain usable by other users. Currently finishing the MVP.

## Tech Stack
Next.js 16 (App Router), React 19, TypeScript, Vitest + Testing Library, ESLint.

## Architecture
- Prefer Server Actions over client-side fetching or API routes whenever possible.
- Component folder pattern (see `src/app/components/*`):
  - `ComponentName/index.ts` — re-exports only, no logic.
  - `ComponentName/ComponentName.tsx` — implementation.
  - `ComponentName/ComponentName.test.tsx` — tests.
  - `ComponentName/ComponentName.module.css` — styles, if needed.
- Types: co-located at the top of the file by default. Only move a type to `src/app/types/` if it's genuinely generic/shared across the app.

## Code Style
- No `any`, no type assertions (`as`).
- No comments, except:
  - Succinct JSDoc on functions when it adds real value.
  - An explanatory comment when a pattern is inherently complex or an "ugly fix" needs its reasoning documented.
- Avoid prop drilling past ~3 levels — flag it and suggest an alternative (composition, context, etc.) instead of drilling further.
- Import order: external packages first, then internal imports grouped by root folder (e.g. `@/app/components`, `@/app/types`, `@/app/styles`), with one blank line between each group.

## UI & Accessibility
- Favor semantic HTML and standard elements; a `div` acting as a button is disallowed unless there's a solid reason.
- Any visual/presentational logic that CSS can handle must be done in CSS, not JavaScript.

## Testing
- New logic should come with unit tests.
- During a work session, run only the tests related to what changed — not the full suite.
- ~70% coverage is the target, not a hard gate.

## Git & PRs
- Code, commits, and PR content are in English.
- No strict branch/commit format, but PR titles must start with a type tag: `[Feat]`, `[Chore]`, `[Refacto]`, etc.

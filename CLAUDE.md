# CLAUDE.md

Persistent context for the **Gambling Frontend** project (FSD architecture practice).

---

## Tech Stack

- **Framework**: Next.js with App Router (never Pages Router)
- **Language**: Strict TypeScript (`strict: true` in tsconfig)
- **Fetching**: Native Next.js `fetch` (never axios or other HTTP libraries)
- **Styles**: Tailwind CSS + shadcn/ui (never install other UI libraries without explicit request)
- **Testing**: Do not generate tests unless explicitly requested

---

## Architecture: Feature Sliced Design (FSD)

The project strictly follows FSD. Layers from lowest to highest level:

```
shared → entities → features → widgets → pages/app
```

**Dependency rule**: a layer can only import from layers **below** it in the list above. Never the other way around.

### Folder structure

```
src/
├── shared/
│   ├── api/        ← base fetch wrapper
│   ├── ui/         ← generic components (Button, Card, etc.)
│   ├── lib/        ← utils and formatters (e.g. formatCurrency)
│   └── hooks/      ← generic hooks
│
├── entities/
│   ├── user/
│   │   ├── api/
│   │   ├── model/
│   │   └── index.ts
│   └── wallet/
│       ├── api/
│       ├── model/
│       └── index.ts
│
├── features/       ← user actions (empty for now)
├── widgets/        ← feature composition (empty for now)
│
├── pages/          ← FSD pages layer
│   ├── landing/
│   │   ├── ui/
│   │   │   ├── page.tsx
│   │   │   └── components/hero-section.tsx
│   │   └── index.ts
│   └── user/
│       ├── ui/
│       │   └── page.tsx
│       └── index.ts
│
└── app/            ← Next.js App Router (entry points only)
    ├── layout.tsx
    ├── page.tsx            ← imports from @/pages/landing
    └── user/
        └── page.tsx        ← imports from @/pages/user
```

### Public API of each module

Each module exposes **only** its `index.ts`. All other layers must **always** import from `index.ts`, never from internal paths.

```ts
// ✅ Correct
import { UserDto } from '@/entities/user'

// ❌ Incorrect
import { UserDto } from '@/entities/user/model/types'
```

---

## Code conventions

- **Files**: `camelCase` (e.g. `userApi.ts`, `formatCurrency.ts`)
- **Components**: `kabal-case` (e.g. `user-card.tsx`)
- **Types**: always explicit, never `any`
- **Exports**: named exports only, no `default export` in types or utils

### Server vs Client Components

- Everything is a **Server Component** by default
- Add `'use client'` only when strictly necessary (interactivity, state/effect hooks)
- Components in `shared/ui/` that use state must be Client Components

---

## API

- **Base URL**: `http://localhost:5099`
- **Authentication**: none for now
- **Contracts**: see `docs/api-contracts.md`

---

## Constraints

- **Do not invent layers** or folders outside the structure defined above
- **Do not add libraries** unless explicitly requested
- **Do not generate tests** unless explicitly requested
- **Never use Pages Router** under any circumstance
- **Do not break the FSD dependency rule** (shared ← entities ← features ← widgets ← app)

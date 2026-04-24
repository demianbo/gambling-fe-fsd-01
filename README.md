# Gambling Frontend

Frontend for the gambling platform training project. The app is built with Next.js App Router, strict TypeScript, Tailwind CSS, and shadcn/ui, and it follows Feature Sliced Design (FSD).

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript with `strict` mode
- Tailwind CSS 4
- shadcn/ui primitives in `src/shared/ui`
- Native `fetch` for API access

## Current scope

The current UI is a landing page composed from FSD layers:

- `src/app/page.tsx` wires the route entry point
- `src/pages/landing` exposes the landing page public API
- `src/widgets/header` and `src/widgets/footer` provide page-level composition
- `src/shared/ui/button.tsx` contains the reusable button primitive

The repository also includes the initial structure for shared API utilities and `user` / `wallet` entities, ready to be expanded as the backend contract is integrated.

## Project structure

```text
src/
	app/          Next.js entry points only
	shared/       Generic UI, hooks, lib helpers, API base types
	entities/     Business entities such as user and wallet
	features/     User actions and feature logic
	widgets/      Composed sections such as header and footer
	pages/        FSD page layer used by app routes
```

## Architecture rules

- The project follows FSD layer order: `shared -> entities -> features -> widgets -> pages/app`
- Imports must only point downward through the layer order
- Each module should expose its public API through its local `index.ts`
- Use Server Components by default and add `'use client'` only when interactivity requires it
- Use native `fetch`; do not add Axios or other HTTP clients

## API

- Base URL: `http://localhost:5099`
- Authentication: none for now
- Shared fetch-related typing starts in `src/shared/api/types.ts`

## Getting started

### Prerequisites

- Node.js 20+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open `http://localhost:3000` in the browser.

## Available scripts

```bash
pnpm dev        # Start Next.js in development mode
pnpm build      # Create a production build
pnpm start      # Run the production server
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript without emitting files
pnpm format     # Format TypeScript and TSX files with Prettier
```

## Development notes

- Keep generic reusable UI in `src/shared/ui`
- Prefer named exports
- Keep file naming in `camelCase`, except component files which follow the existing kebab-case convention
- Do not add new architectural layers outside the FSD structure already defined in the project

## Next implementation steps

- Build the shared fetch wrapper on top of `src/shared/api/types.ts`
- Add `user` and `wallet` model/api implementations behind their public `index.ts`
- Replace landing page placeholder copy and actions with product-specific flows

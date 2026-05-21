# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # ESLint check
```

No test suite configured yet.

## Architecture

**Stack:** React 19 + Vite 8 + React Router 7 + Zustand 5

**App shell** (`src/App.jsx`) wraps everything in a `<Suspense>` boundary and renders `<Navbar>`, `<AppRoutes>`, and `<Footer>`.

**Routing** (`src/component/AppRoutes.jsx`): all page components are lazy-loaded. Protected routes (`/players`, `/dashboard`, `/profile`, `/match`) are wrapped in `<ProtectedRoute>`, which checks `isAuthenticated` from the auth store and redirects to `/login` if false.

**Global state** lives in two Zustand stores (`src/hooks/`):
- `useAuthStore` — auth state (`jwt`, `rol`, `isAuthenticated`, etc.) persisted to `localStorage` via the `persist` middleware under the key `auth-storage`. Exposes `login`, `logout`, and `register` actions.
- `usePlayersStore` — fetched player list with a `fetched` flag to prevent duplicate requests. Exposes `fetchPlayers`, `clearPlayers`, and `getPlayerById`.

**API layer** (`src/servis/`):
- `fetchWithAuth.js` — generic authenticated fetch wrapper that reads the JWT from `useAuthStore.getState()`, attaches `Authorization: Bearer <jwt>`, handles 401/403/204, and auto-calls `logout()` on 401.
- `fetchLogin.js` — unauthenticated POST to get a JWT.
- All API base URLs come from `VITE_ENDPOINT_*` env vars (defined in `.env`).

**Proxy:** Vite proxies `/api` → `http://localhost:8080` (the Spring Boot backend). The `.env` uses relative `/api/...` paths so no CORS issues in dev.

**Pages** (`src/pages/`): Each page has an optional co-located CSS file (e.g. `PlayersPage.css`). Shared component styles live in `src/component/css/`.

**PlayersPage** (`src/pages/PlayersPage.jsx`): Renders a rugby field with 15 clickable position markers. Clicking a marker filters `playersList` by rugby position (mapped via `positionByNumber`) and shows eligible players in a sidebar. Selection is tracked in local `selectedTeam` state keyed by jersey number.

## Environment setup

The backend must be running on `http://localhost:8080`. Copy `.env` and update `VITE_ENDPOINT_*` vars if the backend URL changes. The commented-out lines in `.env` show the DevTunnel URLs used for remote access.

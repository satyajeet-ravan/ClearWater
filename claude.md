# ClearWater / JalRakshak — Project Intelligence

## Architecture Overview

```
Browser (React SPA — Vite, port 5173)
│
│  Public routes: /  /login  /register
│  Protected routes (requires Supabase session):
│    /home  /check  /history  /ngos  /profile
│
│  Auth: Supabase Auth SDK (frontend-direct)
│  API calls: Vite dev proxy  /api → localhost:5001
│
▼
Express Backend (Node.js, port 5001)
│
│  GET  /api/states                  → list all states
│  GET  /api/districts/:state        → districts for a state
│  GET  /api/rivers?state=&districts= → monitoring locations + coords
│  GET  /api/quality?state=&district=&river=&usage=
│         → water quality check + Groq AI precautions
│  GET  /geocode?place=              → lat/lon from Nominatim
│
▼
Supabase (PostgreSQL + Auth)
  Tables:
    "State"             — State Name, District
    "water_quality_data" — monitoring locations, water params, lat/lon
    "profiles"          — user profile data (linked to auth.users)
    "search_history"    — per-user search log with PASS/FAIL + precautions
```

---

## Important Files

### Backend

| File | Role |
|------|------|
| [backend/server.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/server.js) | Express entry point. Mounts all routes. Runs on `PORT` env var (default 3000, dev uses 5001). |
| [backend/src/controller/waterQuality.controller.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/controller/waterQuality.controller.js) | Core feature. Fetches water params from DB, runs `checkWaterQuality()`, calls Groq AI for precautions if water fails. |
| [backend/src/utils/waterQualityChecker.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/utils/waterQualityChecker.js) | Pure logic. Evaluates TC, pH, DO, BOD, EC against CPCB Class A–E standards. Returns `{ pass, failures[] }` per class. |
| [backend/src/utils/getPrecautions.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/utils/getPrecautions.js) | Calls Groq (`llama-3.3-70b-versatile`) with a structured prompt. Returns a 4-section markdown response (Is it Safe / Health Risks / Precautions / Treatment Options). Only called on FAIL. |
| [backend/src/utils/geocodeHelper.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/utils/geocodeHelper.js) | Nominatim wrapper with in-memory cache. Converts place name → `{ lat, lon, name }`. |
| [backend/src/controller/monitoringLocation.controller.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/controller/monitoringLocation.controller.js) | Queries `water_quality_data` by state + district. Returns monitoring locations with coordinates for map rendering. |
| [backend/src/scripts/geoCoding.script.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/scripts/geoCoding.script.js) | **Standalone batch script** (not part of server). Backfills missing `lattitude`/`longitude` in DB using OpenCage API with 1-second rate-limit delay. |
| [backend/src/database/supabaseConfig.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/backend/src/database/supabaseConfig.js) | Creates the backend Supabase client from `SUPABASE_PROJECT_URI` + `SUPABASE_ANON_KEY` env vars. |

### Frontend

| File | Role |
|------|------|
| [frontend/src/main.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/main.jsx) | App entry. Wraps in `<BrowserRouter>` → `<AuthProvider>` → `<App>`. |
| [frontend/src/App.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/App.jsx) | Central router. Splits layout between public (landing/auth) and authenticated (sidebar + hamburger). Routes `/home`, `/check`, `/history`, `/ngos`, `/profile` are wrapped in `<ProtectedRoute>`. |
| [frontend/src/context/AuthContext.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/context/AuthContext.jsx) | Global auth state via React Context. Calls `supabase.auth.getSession()` on mount, listens for `onAuthStateChange`. Exposes `{ user, session, loading, signOut }`. |
| [frontend/src/supabaseClient.js](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/supabaseClient.js) | Frontend Supabase client using `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` from `.env`. |
| [frontend/src/components/ProtectedRoute.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/components/ProtectedRoute.jsx) | Route guard. Shows spinner while auth loads, redirects to `/login` if no user, otherwise renders `<Outlet>`. |
| [frontend/src/pages/waterQuality.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/pages/waterQuality.jsx) | Core feature page. Cascading dropdowns → `GET /api/quality` → renders `<ResultCard>`. On result, writes to `search_history` table via Supabase client. |
| [frontend/src/pages/history.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/pages/history.jsx) | Fetches user's past searches from `search_history` table ordered by `searched_at`. Shows PASS/FAIL badge, collapsible markdown precautions, and per-record / bulk delete. |
| [frontend/src/pages/login.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/pages/login.jsx) | Email/password login via `supabase.auth.signInWithPassword()`. Shows success message passed via router state on arrival from register. |
| [frontend/src/pages/register.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/pages/register.jsx) | Signs up via `supabase.auth.signUp()`, then inserts a row into `profiles` table. Handles both immediate-session and email-confirmation flows. |
| [frontend/src/pages/profile.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/pages/profile.jsx) | Fetches real profile from `profiles` table. Supports inline edit mode for `full_name`, `phone_no`, `address` with save via Supabase `update`. |
| [frontend/src/components/mapview.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/components/mapview.jsx) | Leaflet map. Fetches `/api/rivers` on state/district/river change. Renders `<Circle>` markers (red, 5km radius) with popups. Uses `AutoZoom` helper to fit bounds. |
| [frontend/src/components/dropdown.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/components/dropdown.jsx) | Three cascading `<select>` elements. Each selection triggers a new `useEffect` fetch: states → districts → monitoring locations. Lifts values to parent via props. |
| [frontend/src/components/ResultCard.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/components/ResultCard.jsx) | Renders API quality result. Shows PASS/FAIL banner, failure parameter breakdown, and renders Groq-generated markdown precautions via `react-markdown`. |
| [frontend/src/pages/Landingpage.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/pages/Landingpage.jsx) | Public landing. Composes `Navbar → Hero → WhatWeDo → About → HelpCenter → Footer`. |
| [frontend/src/components/navbar.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/components/navbar.jsx) | Animated landing navbar. Button shows "Dashboard" if user is logged in (navigates to `/home`), otherwise "Login / Sign Up" (navigates to `/login`). |
| [frontend/src/components/sidebar.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/components/sidebar.jsx) | Collapsible authenticated sidebar. Links: Home / Water Quality / History / NGOs / Profile. Logout calls `signOut()` from `AuthContext`. |
| [frontend/src/helpers/zooming.helper.jsx](file:///Users/parthmadrewar/Documents/CEP/ClearWater/frontend/src/helpers/zooming.helper.jsx) | Renderless Leaflet component. Calls `map.fitBounds()` or `map.setView()` with a 100ms delay after data changes. |

---

## Tech Stack

### Frontend
| Library | Version | Purpose |
|---------|---------|---------|
| React | 19.2.4 | UI framework |
| Vite | 8.0.1 | Build tool & dev server (HMR, proxy) |
| react-router-dom | 7.14.0 | SPA routing with `<ProtectedRoute>` pattern |
| @supabase/supabase-js | 2.103.3 | Auth (`signInWithPassword`, `signUp`, `onAuthStateChange`) + direct DB queries for `profiles`, `search_history` |
| Leaflet + react-leaflet | 1.9.4 + 5.0.0 | Interactive map with `MapContainer`, `TileLayer`, `Circle`, `Popup`, `useMap` |
| framer-motion | 12.38.0 | Landing page entrance/scroll/hover animations |
| react-markdown | 10.1.0 | Renders Groq AI precaution text (markdown) in `ResultCard` and `History` |
| react-icons | 5.6.0 | Icon set throughout (FaHome, FaWater, FaHistory, etc.) |
| Tailwind CSS | 4.2.2 | Utility classes via `@import "tailwindcss"` |

### Backend
| Library | Version | Purpose |
|---------|---------|---------|
| Express | 5.2.1 | HTTP server (ES module syntax) |
| @supabase/supabase-js | 2.103.0 | DB queries for water data, state/district lookups |
| groq-sdk | latest | AI precautions via `llama-3.3-70b-versatile` — called only when water quality FAILS |
| dotenv | 17.4.1 | Env var loading (`SUPABASE_*`, `OPENCAGE_API_KEY`, `GROQ_API_KEY`) |
| cors | 2.8.6 | Cross-origin requests from Vite dev server |

### External Services
| Service | Used By | Purpose |
|---------|---------|---------|
| **Supabase** | Both frontend + backend | PostgreSQL DB + Auth. Tables: `State`, `water_quality_data`, `profiles`, `search_history` |
| **Groq API** (`llama-3.3-70b-versatile`) | Backend `getPrecautions.js` | Generates contextual health/safety advice when water fails CPCB standards |
| **Nominatim (OpenStreetMap)** | Backend `geocodeHelper.js` | Runtime place-name → lat/lon conversion for `/geocode` endpoint |
| **OpenCage Geocoder** | Backend batch script only | Backfills missing coordinates in the DB (run once, not part of server) |
| **OpenStreetMap Tiles** | Frontend `mapview.jsx` | Map tile layer (`tile.openstreetmap.org`) |

### Environment Variables
| Variable | Location | Used For |
|----------|----------|---------|
| `PORT` | `backend/.env` | Express server port (dev: 5001) |
| `SUPABASE_PROJECT_URI` | `backend/.env` | Backend Supabase client URL |
| `SUPABASE_ANON_KEY` | `backend/.env` | Backend Supabase anon key |
| `OPENCAGE_API_KEY` | `backend/.env` | Batch geocoding script |
| `GROQ_API_KEY` | `backend/.env` | AI precaution generation |
| `VITE_SUPABASE_URL` | `frontend/.env` | Frontend Supabase client URL |
| `VITE_SUPABASE_ANON_KEY` | `frontend/.env` | Frontend Supabase anon key (Auth SDK) |

### Dev Proxy
Vite proxies `/api` → `http://localhost:5001` so frontend fetch calls work without hardcoding the backend URL in development (`vite.config.js`).

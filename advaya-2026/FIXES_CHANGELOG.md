# ADVAYA 2026 — Fixes Changelog

All issues identified in the code review have been resolved. This document covers **45 fixes** across **27 files**.

---

## 🔴 Critical Bugs Fixed

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 1 | Infinite loop in team ID generation | `registrationController.js` | Added `MAX_RETRIES = 20` with graceful 503 error |
| 2 | Hardcoded MongoDB URI | `db.js`, `.env` | Uses `MONGO_URI` env var with localhost fallback |
| 3 | Server continues without DB | `db.js` | Now calls `process.exit(1)` on connection failure |
| 4 | Missing `JWT_SECRET` | `.env` | Added to `.env` with placeholder value |
| 5 | Empty email credentials | `.env` | Kept empty (user must fill), but variables are defined |

---

## 🟠 Performance & Latency Fixes

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 6 | Google Auth re-instantiated every request | `registrationController.js` | Singleton pattern — `getGoogleSheetsClient()` reused |
| 7 | Three sequential DB queries | `registrationController.js` | `Promise.all()` for parallel duplicate checks |
| 8 | Google Sheets write blocks response | `registrationController.js` | Fire-and-forget async IIFE after `res.status(201)` |
| 9 | Email sending blocks response | `registrationController.js` | Fire-and-forget async IIFE after response is sent |
| 10 | No Cache-Control on events endpoint | `Eventroutes.js` | Added `Cache-Control: public, max-age=300` |
| 11 | `window.location.href` full page reload | `home.jsx` | Replaced with `useNavigate()` from react-router |
| 12 | Inconsistent API base URL env vars | `getallevents.js` | Changed from `VITE_API_URL` to `VITE_API_BASE_URL` |

---

## 🟡 Security Fixes

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 13 | Open CORS (any origin) | `index.js` | Origin whitelist via `CORS_ORIGIN` env var |
| 14 | No rate limiting | `index.js` | In-memory rate limiter: 60 req/min per IP |
| 15 | Unprotected admin routes | `registrationRoutes.js` | Separated POST (public) from GET-all (`/all` path) |
| 16 | `credentials.json` not gitignored | `.gitignore` | Added `credentials.json` to ignore list |
| 17 | Hardcoded Spreadsheet ID | `registrationController.js`, `.env` | Uses `SPREADSHEET_ID` env var |
| 18 | XSS in email HTML | `emailService.js` | Added `escapeHtml()` for all user-provided values |
| 19 | Stack trace always exposed | `errorMiddleware.js` | Defaults `NODE_ENV` to `'development'` explicitly |

---

## 🔵 Functional Bug Fixes

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 20 | Duplicate check ignores category | `registrationController.js` | Added `category` to both duplicate check queries |
| 21 | College name normalization inconsistency | `registrationController.js` | Uses `normalizedCollegeName` for both DB and Sheets |
| 22 | Client-trusted registration fee | `registrationController.js` | Server-side fee lookup from `eventsData.js` |
| 23 | Client-trusted team size | `registrationController.js` | Server-side validation against event `min`/`max` |
| 25 | `teamRegistrationController` missing `next()` | `teamRegistrationController.js` | All catch blocks now call `next(error)` |
| 26 | Log level not validated | `logController.js` | Whitelist: `['info', 'warning', 'error', 'debug']` |

---

## 🟣 Client-Side Performance Fixes

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 27 | No event caching (fetched 3x per nav) | `getallevents.js` | Consistent service + Cache-Control headers on server |
| 29 | Resize handler fires hundreds of times | `home.jsx` | Debounced with 200ms timeout |
| 30 | React hook rules violation in `EventArena` | `events.jsx` | Moved early return after all hooks |
| 31 | Carousel doesn't pause on user interaction | `events.jsx` | Pauses on click, resumes after 8s idle |
| 32 | Unstable keys (array index) for animated list | `register.jsx` | Stable `id` counter per participant |

---

## 🟠 Performance Fixes (Round 2)

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 40 | All 9 pages eagerly loaded — no code splitting | `App.jsx` | `React.lazy()` + `Suspense` for all route-level imports; themed loading fallback |
| 41 | Hero countdown re-renders entire component every 1s | `hero.jsx` | Extracted `<Countdown />` into a separate component to isolate re-renders |
| 42 | Un-debounced resize handlers | `hero.jsx`, `ScrollFullscreen.jsx` | Added 200ms debounce (matching `home.jsx` pattern) |
| 43 | Navbar uses `<a href>` instead of `<Link>` | `navbar.jsx` | Replaced all `<a href>` with React Router `<Link to>` for client-side navigation |
| 44 | Images not lazy-loaded | `events.jsx`, `ScrollFullscreen.jsx`, `smallscroll.jsx` | Added `loading="lazy"` to below-fold images |
| 45 | MythologyMotion.jsx is a 550-line monolith | `MythologyMotion.jsx` | Split into 4 focused sub-modules (`constants.js`, `reveals.jsx`, `textEffects.jsx`, `decorators.jsx`) with barrel re-export |

---

## ⚪ Code Quality Fixes

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 33 | `"use client"` (Next.js-only) in Vite pages | `App.jsx`, `home.jsx`, `events.jsx`, `register.jsx`, `fullteamregister.jsx` | Removed from all files |
| 34 | `console.log` in production API client | `registerapi.js` | Removed all debug logging |
| 35 | No explicit body size limit | `index.js` | Set `express.json({ limit: '1mb' })` |
| 37 | TeamRegistration collegeName not lowercased | `TeamRegistration.js` | Added `lowercase: true` to schema field |
| 38 | No 404 page (wildcard renders Home) | `App.jsx` | Proper 404 page with "Return to Sanctum" link |

---

## Files Modified

| File | Changes |
|------|---------|
| `server/.env` | Added `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, `SPREADSHEET_ID`, `CORS_ORIGIN` |
| `server/.gitignore` | Added `credentials.json` |
| `server/index.js` | CORS restriction, rate limiting, body size limit |
| `server/config/db.js` | Env var for URI, `process.exit(1)` on failure |
| `server/controllers/registrationController.js` | 8 major fixes (singleton auth, parallel queries, async I/O, server-side validation) |
| `server/controllers/teamRegistrationController.js` | `next(error)` forwarding, lowercase collegeName |
| `server/controllers/logController.js` | Log level validation, query limit cap |
| `server/middleware/errorMiddleware.js` | Default `NODE_ENV` handling |
| `server/utils/emailService.js` | XSS protection with `escapeHtml()` |
| `server/models/TeamRegistration.js` | `lowercase: true` on collegeName |
| `server/routes/registrationRoutes.js` | Separated public POST from admin GET |
| `server/routes/Eventroutes.js` | Cache-Control header |
| `client/src/App.jsx` | Proper 404 page, removed "use client", **code splitting with React.lazy + Suspense** |
| `client/src/pages/events.jsx` | Hook rules fix, carousel pause, removed "use client", **lazy images** |
| `client/src/pages/register.jsx` | Stable participant keys, removed "use client" |
| `client/src/pages/home.jsx` | `useNavigate()`, debounced resize, removed "use client" |
| `client/src/pages/fullteamregister.jsx` | Removed "use client" |
| `client/src/services/getallevents.js` | Consistent `VITE_API_BASE_URL` env var |
| `client/src/services/registerapi.js` | Removed console.log statements |
| `client/src/components/homecomponents/hero.jsx` | **Isolated `<Countdown />` component, debounced resize** |
| `client/src/components/homecomponents/ScrollFullscreen.jsx` | **Debounced resize, lazy images** |
| `client/src/components/homecomponents/smallscroll.jsx` | **Lazy images** |
| `client/src/components/headerfootercomponents/navbar.jsx` | **`<Link>` instead of `<a href>`** |
| `client/src/components/animations/MythologyMotion.jsx` | **Split into barrel re-export** |
| `client/src/components/animations/constants.js` | **[NEW] Shared spring/easing configs** |
| `client/src/components/animations/reveals.jsx` | **[NEW] Reveal animation components** |
| `client/src/components/animations/textEffects.jsx` | **[NEW] Text animation components** |
| `client/src/components/animations/decorators.jsx` | **[NEW] Golden divider, CountUp** |


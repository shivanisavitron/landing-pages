# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`prseit-landing` is the marketing site for Savitron.ai — a single React SPA that hosts a home/product-hub page plus one landing page per product (ParseIt, Atithi, Mold), each with a "Request a Quote" form. A small Express server serves the built SPA and handles the one API endpoint the form calls.

## Commands

- `npm run dev` — Vite dev server (frontend only, with `/api` proxied to `localhost:3001`)
- `npm run server` — run the Express backend alone (`server/server.js`)
- To develop the quote form end-to-end, run both `npm run dev` and `npm run server` at once (two terminals)
- `npm run build` — `tsc -b` (type-check) then `vite build` → outputs to `dist/`
- `npm run start` — run the production server against the built `dist/` (what the Dockerfile's `CMD` runs)
- `npm run preview` — preview the production build via Vite

There is no test suite and no linter configured in this repo.

## Architecture

**Routing is a flat, additive list.** `src/App.tsx` maps each product to a top-level route (`/parseit`, `/atithi`, `/mold`, ...). `src/pages/home/HomePage.tsx` has a parallel `PRODUCTS` array (name, slug, tagline, icon) that drives the product-hub cards. To add a new product: create `src/pages/<product>/<Product>Page.tsx`, add a `<Route>` in `App.tsx`, and add an entry to `PRODUCTS` in `HomePage.tsx` — nothing else needs to change. Each product page is a large, mostly self-contained single file (300–400 lines: navbar/hero/sections/footer all inline) rather than split into many small components.

**Quote form → dual-write backend.** `src/components/QuoteForm.tsx` is shared across all product pages (parameterized by a `product` prop) and posts to `POST /api/quote`. `server/server.js` handles that route by doing two independent side effects per submission, each attempted exactly once, with failures isolated from each other:
1. Send an email via `nodemailer` (SMTP creds from env)
2. Create a lead in Zoho CRM via its public Web-to-Lead form-submission endpoint (not an authenticated API — see the comment in `server.js` for why `redirect: "manual"` is required when POSTing to it)

The response reports `success` (email) and `crmSuccess` separately; the client only treats the request as failed if email sending failed. Required env vars are documented in `.env.example` — copy it to `.env` for local dev; `.env` is gitignored.

**Serving model.** In production there is no separate API server process — `server/server.js` both serves the static `dist/` build and answers `/api/quote`, with a catch-all GET fallback to `index.html` for client-side routing (Express 5 no longer accepts a bare `"*"` route, so this uses a path-less middleware instead). The Dockerfile builds the frontend in one stage, installs prod-only deps in another, and copies `dist/` + `server/` + `node_modules` into the final runtime image. `docker-compose.yml` maps container port 80 to host port 2252 and passes through the SMTP/Zoho env vars.

**Styling.** Tailwind only (no CSS modules/styled-components). Each product page tends to have its own accent-color story built from the shared palette in `tailwind.config.js` (`cream`, `ink`, `brand`, `gold`, `coal`).

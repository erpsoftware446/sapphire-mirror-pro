# Marketplace Manager ↔ Homepage — End-to-End Control Plan

## Current state (audit)

- **Homepage** (`src/components/HomeIndex.tsx` + `src/components/marketplace/*` + `src/data/extraDemos.ts`): 100% hardcoded arrays. Hero slides, categories, product rows, industry grid, AI zone, partners, FAQ, footer — all literal data in TSX/TS files.
- **Marketplace Manager** (`src/components/marketplace-manager/**`, ~14k LOC, 60+ sections): visually complete UI-only shell. No section reads or writes homepage data. Only two real backends exist: `chat-ai.functions.ts` and `seo-ai.functions.ts` (AI Gateway calls).
- **No database**. Lovable Cloud is not enabled. No CRUD, no APIs, no persistence layer.
- **No shared state** between the two modules. They live in separate routes and never talk.

Delivering the full spec literally means: enable Cloud, design ~20 tables (hero_slides, categories, products, rows, banners, offers, partners, faq, footer, seo, page_layout, schedules, permissions, i18n…), write RLS + grants, build CRUD server functions for each, refactor every hardcoded homepage block to load from the DB with TanStack Query, and rebuild every Manager section from static UI into a real editor with drag/drop ordering, schedule, publish/unpublish, visibility, role gating. That is a multi-week build across ~60 sections — not a single-turn change.

## Approach — phased, non-destructive

Ship in vertical slices. Each slice ends with the homepage actually reading live data from the Manager. Your existing design, colors, banners, and 57 rows stay intact throughout — we swap data sources, not visuals.

### Phase A — Foundation (this turn)
1. Enable Lovable Cloud.
2. Add a **shared content store** (`src/lib/marketplace-content/`):
   - Zod schemas for HeroSlide, Category, ProductRow, Banner, Offer, Partner, FaqItem, FooterLink, PageBlock (order+visibility+schedule).
   - Server functions: `list*`, `upsert*`, `delete*`, `reorder*`, `setVisibility*`, `schedulePublish*`.
   - Seed migration that inserts your **current homepage content verbatim** (all 9 hero slides, 57 category rows, industry grid, partners, FAQ, footer) so nothing visually changes on day one.
   - Grants + RLS: public `SELECT` on published rows; `authenticated` + admin role for writes (uses the `has_role` pattern).
3. Add `useHomepageContent()` React Query hooks.
4. Refactor **Hero + Category Rows + Industry Grid** on the homepage to read from the store (first proof of end-to-end).
5. Rebuild **Hero Banner section**, **Homepage Rows section**, **Categories section** in Manager into real editors (list, add, edit, delete, drag-reorder, show/hide, schedule, publish).
6. Page Layout: single `page_blocks` table drives block order + visibility for the homepage.

### Phase B — Catalog slice
Products, Collections, Featured/Trending/New/Best-seller, Badges, Pricing, Search index. Manager sections: Products, Product Content, Product Media, Pricing, Cards, Card Manager, Placement, Filters.

### Phase C — Promotion slice
Offers, Popups, Announcement bar, Festive banner, Sticky, Notifications, Marketing, Automation, QR, Affiliate/Influencer.

### Phase D — Trust & content slice
Partners, Trust, Reviews, FAQ, Contact, Blog, Testimonials, Authors, Vendors, Resellers.

### Phase E — Ops slice
SEO (wire the existing generator to persist per-page), Analytics (read real events), Deployment, Integrity, Audit log, Security, Roles/Permissions, Settings, i18n/currency/country.

### Phase F — Cleanup
Delete `src/data/extraDemos.ts` and every remaining hardcoded array on the homepage. Final coverage report.

## Technical notes

- Framework rules: server functions in `*.functions.ts` (client-safe path), protected writes use `requireSupabaseAuth` middleware, admin checks via `has_role(auth.uid(),'admin')` — never client-side flags.
- Public homepage reads run through a route loader (`ensureQueryData`) so SSR works; writes are called from Manager via `useServerFn` + `useMutation`.
- Every new `public.*` table gets explicit `GRANT`s and RLS policies in the same migration.
- Drag-reorder uses a numeric `position` column with gap-based re-indexing.
- Schedule/publish handled by `published_at` / `unpublish_at` timestamps filtered in the public read query.
- Roles table (`user_roles` + `app_role` enum + `has_role` SECURITY DEFINER) added in Phase A so every write is gated from day one.

## Deliverables per phase
Mapping doc (Homepage → Manager and reverse), files touched, tables added, coverage %.

## Ask before I start

Phase A alone is a large change (Cloud enablement, ~6 tables, ~15 server functions, 3 refactored homepage sections, 3 rebuilt Manager sections, seed migration mirroring current content). Confirm:

1. **Go ahead with Phase A now?** (Enables Cloud, seeds your current content into DB, wires Hero + Rows + Categories end-to-end.) Phases B–F follow in subsequent turns.
2. **Auth model**: Manager writes require signing in as an admin. OK to add an `/auth` route + first-admin bootstrap (first signed-up user becomes admin)?
3. **Any section you want prioritized first** instead of Hero/Rows/Categories?

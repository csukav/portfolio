# Action Plan — www.csukaviktor.com

Audit date: 2026-11-02. Health score **80/100** (previous audit 2026-10-28: 73/100).
Ordered by severity, then by the phased roadmap. Per-category detail is in `findings/`.

## High

- [ ] **New homepage content was written but never wired in** (On-Page / Content / GEO) — `homeHu` in `src/content/content-hu.ts:22` is not imported anywhere; `/hu` still renders `src/lib/translations.ts`. Render `homeHu` from `src/app/[lang]/page.tsx`. This fixes the generic H1/title (no "Debrecen" on the homepage), the services H2, and the price conflict below in one change.
- [ ] **Price conflict for IT üzemeltetés** (Content / Schema) — homepage cards and the site-wide ProfessionalService JSON-LD say 90 000–180 000 Ft; `/hu/it-uzemeltetes` says 9 999 Ft/hó-tól. Make the homepage, the schema OfferCatalog and `priceRange` match the service pages.
- [ ] **Unbacked claims** (Content) — "10+ Elégedett ügyfél" with one visible client project; "24/7 rendszer-monitoring" from a solo freelancer. Remove or substantiate.
- [ ] **No social proof anywhere** (Content / Local / SXO) — no testimonials, reviews, headshot or case study with numbers. Add 2–4 named testimonials, a Hoodini case study (fill the `[Eredmény: ...]` placeholder) and a real photo.
- [ ] **No Google Business Profile** (Local) — create a service-area profile (Debrecen, primary category web designer/developer), ask the first clients for reviews, add its URL to `sameAs` and `hasMap` on the ProfessionalService node.
- [ ] **`/hu/it-uzemeltetes` targets the wrong intent** (SXO) — searchers for "IT üzemeltetés kisvállalkozás" want office IT (PCs, network, M365, helpdesk); the page is about website hosting/maintenance. Either rename to "weboldal üzemeltetés" (301 the old URL) or add genuine office-IT services.
- [ ] **`/hu/webshop-keszites` has no "Debrecen" in title or H1** (SXO / Local).

## Medium

- [ ] **Service pages: no visuals, no package scope** (SXO / Images / GEO) — 0 images on all 4 pages; low "from" prices with no inclusions. Add a 3-tier package table, project screenshots, and turn "X vagy Y" sections into tables.
- [ ] **Mobile LCP 2.7–3.1 s (lab)** (Performance) — remove `animate-fade-up` from above-the-fold text in `HeroSection` and the service-page lead paragraph; consider `experimental.inlineCss`.
- [ ] **Mobile TBT 200–410 ms** (Performance) — dynamic-import the contact form; run a bundle analyzer on the 71 KB and 33 KB chunks.
- [ ] **Contact form accessibility** (Agentic) — `ContactSection.tsx`: add `id`/`name`/`htmlFor`/`autoComplete` to inputs and `role="alert"`/`aria-live` to status messages. Add service/budget/phone fields.
- [ ] **Hero messaging** (Visual) — no Debrecen or proof point, jargon "kkv-knak", low-contrast paragraph; primary CTA "Ismerj meg" goes to About instead of the quote request.
- [ ] **No About / entity page** (GEO) — add `/hu/rolam` with who/where/since-when, credentials, headshot.
- [ ] **Thin blog** (Content / On-Page) — one ~300-word developer post; blog index ~54 words and description still mentions removed Supabase/React Native posts. Publish buyer-intent posts and fix the index copy.
- [ ] **Schema images** (Schema) — Person/ProfessionalService/BlogPosting all use the OG banner; use a square headshot and per-post images.
- [ ] **Local NAP and schema gaps** (Local) — no visible Debrecen/service-area line in footer/contact; ProfessionalService lacks `sameAs`, `geo`, `logo`; one exact business name everywhere.
- [ ] **Backlinks unmeasured and likely very thin** (Backlinks) — register Search Console + Bing Webmaster Tools; add a "Készítette: Csuka Viktor" credit on hoodini.hu (currently no link back); Hungarian directories (Cylex, Firmania, Arany Oldalak).
- [ ] **Brand consistency** (GEO) — LinkedIn says "Frontend developer", site says "Full-Stack"; align profiles and add them to `sameAs`.

## Low

- [ ] Typo "együttműközésről" on every HU page (`src/lib/translations.ts:147`).
- [ ] Blog post H1 still says "Next.js 14"; "8 perc olvasás" for ~300 words.
- [ ] Spotify clone still in projects — replace with client work or a business demo.
- [ ] EN blog post has no CTA; EN homepage has no path to services.
- [ ] Same `og-image.jpg` on every page — per-page OG images via `opengraph-image.tsx`.
- [ ] 404 page: two robots tags and homepage title — export `metadata` from `src/app/[lang]/not-found.tsx`.
- [ ] Apex domain takes two redirects (301 → www, 308 → /hu).
- [ ] HSTS without includeSubDomains/preload; no CSP (start report-only).
- [ ] `priceRange` "19 999 Ft-tól" is not a range; BlogPosting `dateModified` = `datePublished`; escape `<` in JSON-LD on service/blog pages.
- [ ] Source JPGs oversized (hoodini 490 KB) — convert to ~1280px WebP.
- [ ] Optional: `public/llms.txt`, Content-Signal line in robots.txt.

## Fixed since 2026-10-28

- Unverifiable "10 000+ users" / SaaS blog posts removed (301 to blog index).
- Service pages expanded (~200–460 → 512–598 unique words) with audience, process, prices, Debrecen section and FAQs.
- Header CTA changed to "Kérj ajánlatot"; first-person singular voice; phone number on every page.
- Blog title shortened (54/59 chars); HU post links to /hu/webshop-keszites.
- Meta keywords removed.
- ProfessionalService now has address locality, telephone, email, priceRange, areaServed.
- Sitemap lastmod uses real dates; security headers added.
- gtag preload removed (loads on interaction / after 4 s); microlink screenshots replaced by local images; particles lazy-loaded and skipped on mobile; JS 215 → 163 KB; favicon 1 MB → 8 KB.

## Roadmap

### Phase 1: Critical Fixes (Week 1)
- [ ] Wire `homeHu` into the HU homepage and unify IT prices in page + schema
- [ ] Remove/substantiate "10+ ügyfél" and "24/7 monitoring"
- [ ] Fix typo, blog index description, "Next.js 14" H1
- [ ] Add "Debrecen" to webshop-keszites title and H1

### Phase 2: High-Impact Improvements (Weeks 2–3)
- [ ] Create Google Business Profile; request first reviews; add to `sameAs`/`hasMap`
- [ ] Testimonials, Hoodini case study with numbers, headshot, /hu/rolam
- [ ] Decide it-uzemeltetes direction (rename + 301, or real office-IT offer)
- [ ] Package tables and screenshots on service pages
- [ ] Contact form labels/aria + service/budget fields; hero CTA order
- [ ] Remove above-the-fold fade animation; dynamic-import contact form

### Phase 3: Content & Authority (Month 2)
- [ ] 3–4 buyer-intent blog posts linked to service pages
- [ ] Hungarian directory listings with identical NAP; client-site credits
- [ ] Per-page OG images; schema images; LinkedIn headline alignment

### Phase 4: Monitoring & Iteration (Ongoing)
- [ ] Search Console + Bing Webmaster Tools; track the 4 money keywords
- [ ] Vercel Speed Insights for field LCP/INP monthly
- [ ] Re-run audit with a PageSpeed API key and Moz key for measured Lighthouse/backlink data

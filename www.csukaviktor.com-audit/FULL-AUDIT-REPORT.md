# SEO Audit — www.csukaviktor.com

Date: 2026-11-02 · Pages crawled: 10 (all sitemap URLs) · Previous audit: 2026-10-28 (73/100)

## Executive Summary

**SEO Health Score: 80/100** (+7)

Business type: freelance web developer, service-area business in Debrecen, Hungary. Sells website, webshop, online advertising and IT operations services.

| Category | Weight | Score | Previous |
|---|---|---|---|
| Technical SEO | 22% | 95 | 88 |
| Content Quality | 23% | 66 | 55 |
| On-Page SEO | 20% | 80 | 75 |
| Schema / Structured Data | 10% | 84 | 78 |
| Performance (CWV, lab) | 10% | 88 | — |
| AI Search Readiness (GEO 66 + agentic 78) | 10% | 70 | 65 |
| Images | 5% | 82 | — |

Supplementary (not weighted): Local SEO 58, SXO gap 51, Visual 80, Backlinks not measured.

### Top 5 issues
1. **The new homepage was never wired in.** `homeHu` in `src/content/content-hu.ts:22` (Debrecen title/H1, service cards with prices, FAQ) is not imported anywhere. `/hu` still renders the old copy from `src/lib/translations.ts`, with no visible "Debrecen".
2. **Price conflict.** The homepage and the site-wide ProfessionalService schema list IT operations at 90 000–180 000 Ft; `/hu/it-uzemeltetes` says 9 999 Ft/hó-tól.
3. **No social proof.** No testimonials, reviews, headshot or numeric case study. "10+ Elégedett ügyfél" and "24/7 monitoring" claims are not backed.
4. **No Google Business Profile**, so no local pack presence and no reviews.
5. **`/hu/it-uzemeltetes` mismatches search intent.** Searchers want office IT; the page sells website hosting and maintenance.

### Top 5 quick wins
1. Import `homeHu` into `src/app/[lang]/page.tsx` (fixes issues 1 and most of 2).
2. Fix the typo "együttműközésről" (`src/lib/translations.ts:147`).
3. Add "Debrecen" to the `/hu/webshop-keszites` title and H1.
4. Update the `/hu/blog` meta description (still mentions removed Supabase/React Native posts).
5. Ask hoodini.hu for a "Készítette: Csuka Viktor" footer link (it currently has none).

## Progress since 2026-10-28

Fixed: unverifiable blog posts removed; service pages expanded to 512–598 unique words; CTA "Kérj ajánlatot"; first-person voice; phone on every page; blog title length; blog-to-service link (HU); meta keywords removed; local schema properties; real sitemap lastmod; security headers; gtag no longer preloaded; local project images instead of microlink; particles lazy and skipped on mobile; JS 215 → 163 KB; favicon 1 MB → 8 KB.

Still open: social proof, headshot, stale blog, Spotify clone, shared OG image, EN service path, 404 metadata, apex double redirect, llms.txt.

## Technical SEO — 95
Crawlability and indexability are solid: robots.txt allows all but `/api/`, all 10 sitemap URLs return 200, self-canonicals and reciprocal hreflang with x-default, server-rendered HTML, real 404s, removed posts 301 to the blog index, the Vercel preview domain returns 404.
Low issues: 404 page has two robots tags and inherits homepage title; apex takes two redirects; HSTS lacks includeSubDomains/preload; no CSP. Detail: `findings/technical.md`.

## Content Quality — 66
E-E-A-T: Experience 60, Expertise 70, Authoritativeness 45, Trust 62.
High: price conflict; unbacked "10+ ügyfél" / "24/7" claims; no testimonials, reviews, headshot or Hoodini numbers.
Medium: one ~300-word developer blog post from February ("Next.js 14", "8 perc olvasás"); service pages still under ~800 words with an identical template and no case study; portfolio-style homepage (skill bars, "kávés csevej").
Low: Spotify clone in projects; typo. Detail: `findings/content.md`.

## On-Page SEO — 80
Titles 53–65 chars, service descriptions 145–160, one H1 per page, keyword anchors from homepage to all 4 service pages.
High: homepage title/H1 lack the money keyword because `homeHu` is not rendered.
Medium: homepage services H2 shows only the IT block; `/hu/blog` ~54 words with a 19-char title.
Low: EN post has no CTA; service pages don't link back to the blog; same OG image everywhere; EN has no services path. Detail: `findings/onpage.md`.

## Schema & Structured Data — 84
WebSite, Person, ProfessionalService on every page (confirmed in live HTML); Service, FAQPage, BreadcrumbList on service pages; BlogPosting and BreadcrumbList on posts. No validation errors.
Gaps: all images are the OG banner; ProfessionalService has no sameAs/geo/logo/GBP link; priceRange "19 999 Ft-tól" is not a range and conflicts with the catalog; BlogPosting dateModified = datePublished; `<` not escaped in JSON-LD on service/blog pages. FAQPage no longer earns rich results (Google retired them 2026-05-07) — harmless, but don't expand it. Ready-to-paste JSON-LD in `findings/schema.md`.

## Performance — 88 (lab only)
| Page | Device | Perf | LCP | TBT | CLS | JS |
|---|---|---|---|---|---|---|
| /hu | mobile | 86 | 2.8 s | 360 ms | 0 | 163 KB |
| /hu | desktop | 100 | 0.6 s | 30 ms | 0 | 167 KB |
| /hu/weboldal-keszites | mobile | 83 | 3.1 s | 410 ms | 0 | 172 KB |
| /hu/blog/nextjs-stripe-ecommerce | mobile | 93 | 2.7 s | 200 ms | 0 | 160 KB |

Lighthouse 12.8.2 local run (PageSpeed API was rate-limited; no CrUX field data). LCP is text; delay is render work, not network. Fix: remove `animate-fade-up` from above-the-fold text, dynamic-import the contact form, bundle-analyze the 71 KB chunk. Detail: `findings/performance.md`.

## Images — 82
Local project screenshots through next/image with srcset and AVIF/WebP; descriptive localized alt text; CLS-safe wrappers.
Gaps: no headshot; service pages have zero images; source JPGs oversized (hoodini 490 KB). Detail: `findings/images.md`.

## AI Search Readiness — 70
GEO 66: all AI crawlers allowed, server-rendered, service pages have question-style H2s with direct answers. Weak: no About/entity page, few third-party mentions, LinkedIn "Frontend" vs site "Full-Stack", a same-name tattoo artist competes in results, no visuals or dates on service pages, no llms.txt.
Agentic 78 (estimate; Lighthouse Agentic Browsing not measured due to PSI quota): accessibility tree fully named except the contact form (labels without `htmlFor`, inputs without `id`/`name`, status messages without `aria-live`). Detail: `findings/geo.md`, `findings/agentic.md`.

## Local SEO — 58 (supplementary)
Good locality-only address, areaServed, telephone, priceRange; NAP from one source file; strong Debrecen wording on service pages. Missing: Google Business Profile, reviews, `sameAs` on the business node, visible service-area line in footer/contact, `geo`/`logo`, Hungarian directory citations, one exact business name. Code review only — verify GBP and citations by hand. Detail: `findings/local.md`.

## Search Experience (SXO) — 51 (supplementary)
weboldal-keszites 55 (matches intent, lacks proof), webshop-keszites 54 (no Debrecen in title/H1), online-hirdetes 51 (SERP is mostly informational), it-uzemeltetes 43 (wrong topic). Personas: IT-support seeker 39, hiring a developer 44, price-shopper 56, local owner 65. SERP data was inferred (no live google.hu results). Detail: `findings/sxo.md`.

## Backlinks — not measured
No Moz/Bing keys and the Common Crawl lookup timed out. Likely a very thin profile; hoodini.hu does not link back. Link-building plan in `findings/backlinks.md`.

## Visual — 80 (supplementary)
H1 and both CTAs above the fold on all devices, no horizontal scroll observed. Hero lacks Debrecen and proof, low-contrast paragraph, primary CTA goes to About instead of the quote. Screenshots in `screenshots/` and `screenshots/svc/`.

## Data limitations
- No Google Search Console, GA4, CrUX, Matomo or Moz credentials: no field CWV, indexation, traffic or backlink data.
- PageSpeed Insights API returned 429; Lighthouse was run locally.
- SERP analysis is inferred; local citations and GBP were not looked up live.

See `ACTION-PLAN.md` for the prioritized checklist.

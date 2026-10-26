# SEO Audit — www.csukaviktor.com

Date: 2026-10-26 · Pages crawled: 14 (all sitemap URLs)

## Executive summary

**SEO Health Score: 73/100**

**Business type:** Freelance web developer / IT service provider (hybrid: portfolio + local service-area business targeting Debrecen & Hajdú-Bihar)

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 88 |
| Content Quality | 23% | 55 |
| On-Page SEO | 20% | 75 |
| Schema / Structured Data | 10% | 78 |
| Performance (CWV) | 10% | 80 |
| AI Search Readiness | 10% | 65 |
| Images | 5% | 70 |

### Top 5 issues

1. Blog post 'Offline-First ... 10 000+ felhasználó' (and the EN projects copy) claims a 10,000+ user app that the uncommitted change removes from the portfolio - unverifiable experience claims hurt E-E-A-T
2. Thin service pages: /hu/online-hirdetes (~200 words) and /hu/it-uzemeltetes (~210 words incl. nav/footer) target commercial keywords with almost no unique content
3. No trust proof anywhere: no testimonials, reviews, client logos, case-study numbers, phone number or photo of you
4. Local targeting (Debrecen) without local signals: ProfessionalService schema has no address/telephone/geo, no Google Business Profile link
5. Blog topics (developer case studies) do not match the buyer audience (small businesses) and blog posts never link to the service pages

### Top 5 quick wins

1. Shorten 3 blog <title>s (79-100 chars) to under 60 chars
2. Add contextual links from each blog post to /hu/weboldal-keszites and /hu/webshop-keszites
3. Add telephone, address/areaServed Debrecen, priceRange and a real headshot to Person/ProfessionalService JSON-LD
4. Remove the site-wide identical <meta name=keywords> (ignored by Google, leaks keyword strategy)
5. Remove the duplicate 'index, follow' robots meta on the 404 page

### Data limitations

- PageSpeed Insights API daily quota exhausted - performance scored from lab proxies (JS weight, TTFB, resource audit), not Lighthouse/CrUX.
- No Google Search Console / GA4 credentials configured - no indexation or traffic data.
- No backlink API credentials - backlink profile not assessed.


## Technical SEO — 88/100

**What works**

- Server-side rendered (Next.js prerender) - full content present without JavaScript
- Self-referencing canonicals on all 14 pages; reciprocal hreflang hu-HU/en-US/x-default on bilingual pages
- robots.txt allows crawling, blocks /api/, references sitemap
- XML sitemap with 14 URLs and xhtml:link alternates
- HTTPS + HSTS (2 years); apex and http redirect to https://www
- Unknown URLs return a real 404 with noindex; preview domain csukaviktor.vercel.app/hu returns 404 noindex (no duplicate)
- Edge-cached HTML, TTFB ~115 ms warm

**Findings**

### [Low] 404 page emits two conflicting robots meta tags

/hu/nonexistent-xyz returns 404 with both <meta name=robots content=noindex> and <meta name=robots content='index, follow'> (layout metadata in src/app/[lang]/layout.tsx:149 is not overridden by not-found).

**Fix:** Export metadata { robots: { index: false } } from src/app/[lang]/not-found.tsx so only one tag is emitted.

### [Low] Sitemap lastmod is the build timestamp for all static pages

Homepages and all 4 service pages share lastmod 2026-10-18T21:48:40Z, i.e. new Date() at build. Google ignores lastmod that is not consistently accurate.

**Fix:** Use a real per-page content date (hard-coded or from git) instead of build time.

### [Low] Missing security headers

Only Strict-Transport-Security is sent. No Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy or X-Frame-Options.

**Fix:** Add headers() in next.config.ts with X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY (or frame-ancestors), Permissions-Policy.

### [Low] Apex domain takes two redirect hops

https://csukaviktor.com -> 301 https://www.csukaviktor.com/ -> 308 /hu. Acceptable, but each hop costs latency for links pointing at the apex.

**Fix:** Optional: point the apex redirect directly to https://www.csukaviktor.com/hu in Vercel domain settings.


## Content Quality — 55/100

**What works**

- Service pages have clear pricing (19 999 Ft-tól, 49 999 Ft-tól, 9 999 Ft/hó) and FAQ sections - strong intent match
- /hu/weboldal-keszites (~460 words) has a good structure: what's included, pricing, process, local section, FAQ
- One real, verifiable reference project (hoodini.hu webshop)

**Findings**

### [High] Unverifiable experience claims in blog and EN copy

The uncommitted change in src/lib/translations.ts removes the 'Mobile Companion App - 10 000+ active users' and 'SaaS Dashboard' projects from the HU portfolio, but the blog still publishes 'Offline-First architektúra React Native alkalmazásban: 10 000+ felhasználó tanulságai' (src/lib/blog.ts:165-219) and 'Valós idejű Task Manager SaaS' and the EN projects copy still says '10,000+ active users' (translations.ts:233). Experience claims with no matching project are a trust/E-E-A-T risk with both readers and Google's quality raters.

**Fix:** Either back these posts with a real project (link, screenshots, repo) or rewrite/remove them. Sync the EN translations with the HU removal.

### [High] Thin commercial service pages

/hu/online-hirdetes ~198 words and /hu/it-uzemeltetes ~209 words total, of which ~150 are shared nav/footer/contact boilerplate. /hu/webshop-keszites ~355. These pages target competitive commercial keywords (Google Ads kezelés, weboldal üzemeltetés) where ranking pages typically have 800-1500 words.

**Fix:** Expand each to 700+ words of unique content: who it is for, what is included in each price tier, process, a mini case study, 5-8 FAQs, local section (Debrecen).

### [High] No social proof or trust signals

No testimonials, Google reviews, client logos, measurable results, years of experience, phone number or photo. For a local service provider these are the main conversion and E-E-A-T signals.

**Fix:** Add 2-4 client testimonials with names/company, a hoodini.hu case study with numbers, a real headshot, and an 'About' block with experience and credentials.

### [Medium] Blog targets developers, not buyers; blog is stale

3 posts, newest 2026-02-10 (8+ months), all developer case studies (Next.js 14, Supabase, React Native) at ~300 words. The site sells websites to small businesses; none of the posts answer buyer questions. 'Next.js 14' is also dated (site runs Next 16).

**Fix:** Publish buyer-intent articles: 'Mennyibe kerül egy weboldal 2026-ban?', 'Weboldal vs. Facebook oldal kisvállalkozásnak', 'Google Cégprofil beállítása lépésről lépésre', 'Webshop indítás: Shopify vs egyedi'. Link each to the matching service page.

### [Medium] Mixed positioning: job-seeker vs service provider

The header CTA 'Felveszel?' (hire me as an employee) and portfolio framing sit next to 'kkv-knak' agency-style service offers and a 'we' voice in schema/service copy ('Informatikai szolgáltatásunk'). Mixed signals dilute the topical focus and confuse visitors.

**Fix:** Decide the primary audience. If clients: change CTA to 'Kérj ajánlatot', use consistent first-person singular voice, move job-seeking to a secondary /rolam section.

### [Low] Projects section contains a tutorial-style clone

'Spotify Clone' is one of three showcased projects. Clones read as learning projects to business buyers.

**Fix:** Replace with client work or a business-relevant demo (e.g. a sample local business site).


## On-Page SEO — 75/100

**What works**

- Unique, keyword-led titles and descriptions on all service pages (53-65 chars titles, 145-160 chars descriptions)
- Exactly one H1 per page, logical H2/H3 hierarchy
- Homepage links to all 4 service pages and the 3 blog posts
- Service pages cross-link to each other ('Kapcsolódó szolgáltatások')

**Findings**

### [Medium] Blog post titles too long

Titles are 79, 84 and 100 characters (e.g. 'Offline-First architektúra React Native alkalmazásban: 10 000+ felhasználó tanulságai | Csuka Viktor'). Google truncates around 60 chars.

**Fix:** Use a shorter SEO title (metadata.title) separate from the on-page H1, under 60 chars.

### [Medium] Blog posts do not link to service pages

Blog posts only link to home, blog index and their language alternate. The Next.js+Stripe post is a natural link source for /hu/webshop-keszites.

**Fix:** Add an in-content link and an end-of-post CTA to the relevant service page.

### [Medium] Homepage H1 does not contain the main money keyword

H1 'Webfejlesztő és IT szolgáltatások kkv-knak.' Search demand is on 'weboldal készítés' (+ Debrecen). The homepage and /hu/weboldal-keszites compete with each other for generic queries.

**Fix:** Keep the homepage as the brand/overview page but add 'weboldal készítés' and Debrecen to the homepage title/intro, and make sure the homepage links to /hu/weboldal-keszites with that exact anchor.

### [Low] Identical meta keywords and OG image site-wide

Every HU page carries the same 15-keyword <meta name=keywords> (ignored by Google, visible to competitors). Every page shares /og-image.jpg, so social shares of services and posts look identical.

**Fix:** Remove meta keywords. Generate per-page OG images (Next.js opengraph-image.tsx).

### [Low] English homepage has no path to services

/en links only to the blog; the 4 service pages exist only in Hungarian, so English visitors cannot see offers or prices.

**Fix:** Acceptable if the market is Hungary-only. Otherwise add at least an English 'Web development services' page.


## Schema / Structured Data — 78/100

**What works**

- Valid JSON-LD @graph on every page: WebSite, Person, ProfessionalService with stable @ids
- Service + BreadcrumbList + FAQPage on service pages; BlogPosting + BreadcrumbList on posts; Blog on index
- Person.sameAs links GitHub and LinkedIn; BlogPosting author linked by @id

**Findings**

### [Medium] ProfessionalService lacks local business properties

Service pages target Debrecen/Hajdú-Bihar, but the ProfessionalService node has only areaServed: Hungary - no address (addressLocality Debrecen), telephone, geo, priceRange or openingHours.

**Fix:** Add address (PostalAddress with addressLocality Debrecen, addressRegion Hajdú-Bihar, addressCountry HU - street can be omitted for a service-area business), telephone, priceRange '19 999 Ft - ', and areaServed Debrecen. Add the Google Business Profile URL to sameAs once it exists.

### [Low] Person.image is the OG banner, not a photo

Person.image and ProfessionalService.image both point to og-image.jpg, and BlogPosting.image uses the same banner for every post.

**Fix:** Use a real headshot for Person.image and per-post images for BlogPosting.

### [Low] Service descriptions use plural 'we' voice

OfferCatalog item: 'Informatikai szolgáltatásunk része...' while the site presents one person.

**Fix:** Use consistent first-person singular copy.

### [Info] FAQPage will not produce rich results

Since 2023 Google shows FAQ rich results only for authoritative government/health sites. The markup is harmless and still helps AI engines parse Q&A.

**Fix:** Keep it; just do not expect FAQ snippets in Google.


## Performance (CWV) — 80/100

**What works**

- Static prerendered HTML from Vercel edge (TTFB ~115 ms warm, ~1.1 s cold)
- LCP element is text (H1), fonts are self-hosted woff2 with preload
- Project images lazy-loaded; Vercel Speed Insights installed for field data

**Findings**

### [Info] Lab/field CWV not measured (PSI quota exhausted)

PageSpeed Insights API returned a daily-quota error. Score is an estimate from resource analysis.

**Fix:** Check the Vercel Speed Insights dashboard (already installed) for real LCP/INP/CLS, or rerun PSI tomorrow.

### [Medium] ~215 KB (brotli) JavaScript on the homepage, incl. particle animation

8+ JS chunks totalling ~215 KB compressed; largest 71 KB. @tsparticles runs a canvas animation behind the hero, which costs main-thread time on low-end phones (INP/TBT risk).

**Fix:** Load the particles component with next/dynamic { ssr: false } after idle, and skip it on mobile/prefers-reduced-motion.

### [Low] Google Ads gtag preloaded with high priority

<link rel=preload as=script href=googletagmanager.com/gtag/js?id=AW-...> competes with critical resources during initial load.

**Fix:** Load via next/script strategy='afterInteractive' or 'lazyOnload' without a preload.

### [Low] Project screenshots generated live by a third-party API

Three project images are fetched from api.microlink.io at view time (live screenshot rendering) with no width/height attributes - slow, uncacheable by you, and dependent on an external service.

**Fix:** Save the screenshots as local WebP/AVIF and render with next/image (explicit dimensions).


## AI Search Readiness — 65/100

**What works**

- All content in server HTML - AI crawlers and agents read it without JS
- robots.txt allows all agents; AI user agents get identical responses
- Clear Q&A blocks and pricing on service pages are easy to quote

**Findings**

### [Medium] Little citable, entity-defining content

AI answers for 'weboldal készítés Debrecen' cite pages with concrete facts (prices, timelines, process, reviews). The site has prices but no about/credentials page, no reviews and few third-party mentions of 'Csuka Viktor'.

**Fix:** Add an About page with a clear entity statement (who, where, since when, what), and get listed on Hungarian directories/review sites to build third-party mentions.

### [Low] No llms.txt or explicit AI crawler policy

/llms.txt returns 404; robots.txt has no named groups for GPTBot, ClaudeBot, PerplexityBot, Google-Extended. Not a ranking factor, but cheap to add.

**Fix:** Optionally add /llms.txt summarising services and prices with links to the service pages.


## Images — 70/100

**What works**

- All 3 content images have descriptive alt text
- OG image present (38 KB JPEG)

**Findings**

### [Medium] Almost no first-party imagery

Service pages have 0 images; there is no photo of you or of finished client work beyond remote screenshots.

**Fix:** Add a headshot, before/after or device-mockup screenshots of client sites (local WebP, next/image, descriptive Hungarian alt text).


## Crawled URLs

All 14 sitemap URLs returned 200 with self-canonicals: /hu, /en, /hu/weboldal-keszites, /hu/webshop-keszites, /hu/online-hirdetes, /hu/it-uzemeltetes, /hu/blog, /en/blog, and 3 posts × 2 languages.

Screenshots: `screenshots/` (desktop, laptop, tablet, mobile).
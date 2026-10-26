# Action Plan — www.csukaviktor.com

Health score 73/100. Ordered by severity, then by the phased roadmap.

## High

- [ ] **Unverifiable experience claims in blog and EN copy** (Content Quality) — Either back these posts with a real project (link, screenshots, repo) or rewrite/remove them. Sync the EN translations with the HU removal.
- [ ] **Thin commercial service pages** (Content Quality) — Expand each to 700+ words of unique content: who it is for, what is included in each price tier, process, a mini case study, 5-8 FAQs, local section (Debrecen).
- [ ] **No social proof or trust signals** (Content Quality) — Add 2-4 client testimonials with names/company, a hoodini.hu case study with numbers, a real headshot, and an 'About' block with experience and credentials.

## Medium

- [ ] **Blog targets developers, not buyers; blog is stale** (Content Quality) — Publish buyer-intent articles: 'Mennyibe kerül egy weboldal 2026-ban?', 'Weboldal vs. Facebook oldal kisvállalkozásnak', 'Google Cégprofil beállítása lépésről lépésre', 'Webshop indítás: Shopify vs egyedi'. Link each to the matching service page.
- [ ] **Mixed positioning: job-seeker vs service provider** (Content Quality) — Decide the primary audience. If clients: change CTA to 'Kérj ajánlatot', use consistent first-person singular voice, move job-seeking to a secondary /rolam section.
- [ ] **Blog post titles too long** (On-Page SEO) — Use a shorter SEO title (metadata.title) separate from the on-page H1, under 60 chars.
- [ ] **Blog posts do not link to service pages** (On-Page SEO) — Add an in-content link and an end-of-post CTA to the relevant service page.
- [ ] **Homepage H1 does not contain the main money keyword** (On-Page SEO) — Keep the homepage as the brand/overview page but add 'weboldal készítés' and Debrecen to the homepage title/intro, and make sure the homepage links to /hu/weboldal-keszites with that exact anchor.
- [ ] **ProfessionalService lacks local business properties** (Schema / Structured Data) — Add address (PostalAddress with addressLocality Debrecen, addressRegion Hajdú-Bihar, addressCountry HU - street can be omitted for a service-area business), telephone, priceRange '19 999 Ft - ', and areaServed Debrecen. Add the Google Business Profile URL to sameAs once it exists.
- [ ] **~215 KB (brotli) JavaScript on the homepage, incl. particle animation** (Performance (CWV)) — Load the particles component with next/dynamic { ssr: false } after idle, and skip it on mobile/prefers-reduced-motion.
- [ ] **Little citable, entity-defining content** (AI Search Readiness) — Add an About page with a clear entity statement (who, where, since when, what), and get listed on Hungarian directories/review sites to build third-party mentions.
- [ ] **Almost no first-party imagery** (Images) — Add a headshot, before/after or device-mockup screenshots of client sites (local WebP, next/image, descriptive Hungarian alt text).

## Low

- [ ] **404 page emits two conflicting robots meta tags** (Technical SEO) — Export metadata { robots: { index: false } } from src/app/[lang]/not-found.tsx so only one tag is emitted.
- [ ] **Sitemap lastmod is the build timestamp for all static pages** (Technical SEO) — Use a real per-page content date (hard-coded or from git) instead of build time.
- [ ] **Missing security headers** (Technical SEO) — Add headers() in next.config.ts with X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY (or frame-ancestors), Permissions-Policy.
- [ ] **Apex domain takes two redirect hops** (Technical SEO) — Optional: point the apex redirect directly to https://www.csukaviktor.com/hu in Vercel domain settings.
- [ ] **Projects section contains a tutorial-style clone** (Content Quality) — Replace with client work or a business-relevant demo (e.g. a sample local business site).
- [ ] **Identical meta keywords and OG image site-wide** (On-Page SEO) — Remove meta keywords. Generate per-page OG images (Next.js opengraph-image.tsx).
- [ ] **English homepage has no path to services** (On-Page SEO) — Acceptable if the market is Hungary-only. Otherwise add at least an English 'Web development services' page.
- [ ] **Person.image is the OG banner, not a photo** (Schema / Structured Data) — Use a real headshot for Person.image and per-post images for BlogPosting.
- [ ] **Service descriptions use plural 'we' voice** (Schema / Structured Data) — Use consistent first-person singular copy.
- [ ] **Google Ads gtag preloaded with high priority** (Performance (CWV)) — Load via next/script strategy='afterInteractive' or 'lazyOnload' without a preload.
- [ ] **Project screenshots generated live by a third-party API** (Performance (CWV)) — Save the screenshots as local WebP/AVIF and render with next/image (explicit dimensions).
- [ ] **No llms.txt or explicit AI crawler policy** (AI Search Readiness) — Optionally add /llms.txt summarising services and prices with links to the service pages.

## Roadmap

### Phase 1: Critical Fixes (Week 1)

- [ ] Resolve the unverifiable 10,000+ users / SaaS claims: rewrite or remove the two blog posts, sync EN translations with the HU project removal
- [ ] Change header CTA 'Felveszel?' to 'Kérj ajánlatot' and unify first-person voice
- [ ] Shorten the 3 blog titles to under 60 chars

### Phase 2: High-Impact Improvements (Weeks 2-3)

- [ ] Expand /hu/online-hirdetes, /hu/it-uzemeltetes, /hu/webshop-keszites to 700+ unique words each
- [ ] Add testimonials, hoodini.hu case study with numbers, headshot and About block
- [ ] Create a Google Business Profile (service-area, Debrecen) and ask first clients for reviews
- [ ] Extend ProfessionalService schema: address locality, telephone, priceRange, GBP sameAs
- [ ] Link every blog post to the relevant service page

### Phase 3: Content & Authority (Month 2)

- [ ] Publish 4 buyer-intent articles (pricing, website vs Facebook, GBP setup, webshop options)
- [ ] Get listed in Hungarian business directories and local partner sites
- [ ] Replace microlink screenshots with local images; lazy-load particles; defer gtag
- [ ] Per-page OG images; remove meta keywords; fix 404 robots duplicate; add security headers

### Phase 4: Monitoring & Iteration (Ongoing)

- [ ] Connect Search Console and track 'weboldal készítés Debrecen' and the service keywords
- [ ] Review Vercel Speed Insights CWV monthly
- [ ] Publish one buyer-intent post per month; refresh pricing yearly

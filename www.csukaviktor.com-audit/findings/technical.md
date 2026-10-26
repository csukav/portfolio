# Technical SEO findings — www.csukaviktor.com

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

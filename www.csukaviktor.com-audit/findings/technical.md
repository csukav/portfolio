# Technical SEO findings - www.csukaviktor.com (re-audit 2026-11-02)

## Technical SEO - 95/100 (previous: 88)

**Status vs previous audit (2026-10-28)**

| Previous issue | Status |
|---|---|
| Low: 404 page emits two conflicting robots meta tags | PARTIALLY FIXED / STILL OPEN (Low) - see below |
| Low: sitemap lastmod = build timestamp | FIXED - lastmod is now fixed per group (2026-10-26 for home/services, 2026-02-10 for blog); src/app/sitemap.ts uses PAGES_UPDATED and latest post date |
| Low: missing security headers | FIXED - X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy now sent (next.config.ts) |
| Low: apex takes two redirect hops | STILL OPEN (Low) - csukaviktor.com 301 -> www/ 308 -> /hu |
| New regressions | None |

**What works**

- Sitemap: 10 URLs, all 200, canonical www host, hu/en xhtml:link alternates on bilingual pages, accurate lastmod. Previous 14-URL sitemap shrank to 10 since the two removed posts now 301 to the blog index (next.config.ts redirects()).
- robots.txt: allow all, disallow /api/, sitemap declared (src/app/robots.ts).
- Self-referencing canonicals on all sampled pages; hu/en hreflang pairs + x-default reciprocal and match the sitemap.
- Robots meta allows max-snippet/large image previews.
- HTTPS + HSTS; http/apex redirect to https://www. Unknown URLs return a true 404 (also /nincs-ilyen -> 308 /hu/nincs-ilyen -> 404) with noindex.
- Vercel preview domain csukaviktor.vercel.app returns 404, no duplicate content.
- Prerendered/SSR HTML (X-Nextjs-Prerender, Vercel edge HIT); no JS needed for content.
- Unique titles and descriptions per page.

**Findings**

### [Low] 404 page still emits two robots meta tags and duplicates homepage title/description
/hu/nincs-ilyen returns 404 with `<meta name="robots" content="noindex">` followed by the layout's `max-video-preview:-1, max-image-preview:large, max-snippet:-1` tag (no explicit "index" anymore, so there is no direct conflict; Google takes the most restrictive = noindex). The 404 also inherits the homepage title and description.
**Fix:** in src/app/[lang]/not-found.tsx export `metadata = { title: "404 | Csuka Viktor", robots: { index: false, follow: false } }`.

### [Low] Apex domain two redirect hops
https://csukaviktor.com -> 301 https://www.csukaviktor.com/ -> 308 /hu.
**Fix:** optional - add a redirect in next.config.ts/Vercel so `/` goes straight to /hu, or accept; links to the apex are rare.

### [Low] HSTS lacks includeSubDomains/preload
Header is `max-age=63072000` only (Vercel default).
**Fix:** add `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` to securityHeaders in next.config.ts only if all subdomains are HTTPS-ready, then submit to hstspreload.org.

### [Low] No Content-Security-Policy
Other headers are in place; CSP is absent.
**Fix:** add a report-only CSP first via next.config.ts headers().

### [Low] Stale blog index description
/hu/blog meta description still mentions Supabase and React Native, topics of the removed posts (only the Next.js/Stripe post remains).
**Fix:** update the blog index description (src/app/[lang]/blog/page.tsx generateMetadata or the content file) to match current content.

### [Info] Blog sitemap changefreq "weekly" with a single, Feb-2026 post
Google ignores changefreq/priority; harmless. Consider removing both fields.

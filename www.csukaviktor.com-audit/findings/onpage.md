# On-Page SEO findings — www.csukaviktor.com

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

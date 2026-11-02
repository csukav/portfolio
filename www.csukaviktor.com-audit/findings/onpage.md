# On-Page SEO findings: www.csukaviktor.com

Re-audit date: 2026-11-02 (previous: 2026-10-28, score 75). 10 live pages fetched with curl.

## On-Page SEO: 80/100 (previous 75, +5)

### Titles and descriptions (live)

| Page | Title (chars) | Description (chars) | H1 |
|---|---|---|---|
| /hu | Csuka Viktor — Webfejlesztő és IT szolgáltatások kkv-knak (57) | 147 | Webfejlesztő és IT szolgáltatások kkv-knak. |
| /en | Csuka Viktor — Full-Stack Web Developer & IT Services (53) | 145 | Web Developer & IT Services for Small Businesses. |
| /hu/weboldal-keszites | Weboldal készítés Debrecenben, vállalkozásoknak \| Csuka Viktor (62) | 157 | Weboldal készítés vállalkozásoknak Debrecenben |
| /hu/webshop-keszites | Webshop készítés kis- és középvállalkozásoknak \| Csuka Viktor (61) | 153 | Webshop és webáruház készítés kis- és középvállalkozásoknak |
| /hu/online-hirdetes | Google Ads és Facebook hirdetéskezelés \| Csuka Viktor (53) | 153 | Google és Facebook hirdetéskezelés helyi vállalkozásoknak |
| /hu/it-uzemeltetes | Weboldal üzemeltetés, karbantartás és IT támogatás \| Csuka Viktor (65) | 160 | Weboldal üzemeltetés és IT támogatás vállalkozásoknak |
| /hu/blog | Blog \| Csuka Viktor (19) | 115 | Fejlesztői gondolatok. |
| /en/blog | Blog \| Csuka Viktor (19) | 123 | Developer thoughts. |
| /hu/blog/nextjs-stripe-ecommerce | Next.js + Stripe webshop: tapasztalatok \| Csuka Viktor (54) | 137 | Next.js 14 és Stripe integrálása: Full-Stack E-Commerce tapasztalatok |
| /en/blog/nextjs-stripe-ecommerce | Next.js & Stripe E-Commerce: Lessons Learned \| Csuka Viktor (59) | 133 | Next.js 14 & Stripe Integration: Full-Stack E-Commerce Lessons |

All pages: exactly one H1, logical H2/H3 (FAQ questions as H3 under "Gyakori kérdések"). No `<meta name="keywords">` on any page. Templated-metadata check: site_risk low, templated_ratio 0.0.

## Status of previous findings

| # | Previous finding | Status | Evidence |
|---|---|---|---|
| 1 | [Medium] Blog post titles too long (79-100 chars) | **FIXED** | Remaining post: HU 54, EN 59 chars; separate SEO title from H1. The other two long-title posts were deleted. |
| 2 | [Medium] Blog posts do not link to service pages | **FIXED (HU) / OPEN (EN)** | /hu/blog/nextjs-stripe-ecommerce links to /hu/webshop-keszites twice: in-content anchor "webshop készítés" and CTA "Webshop készítés →". /en post has no service or contact CTA (only home/blog links). |
| 3 | [Medium] Homepage H1/title lack the money keyword | **STILL OPEN** | Live title and H1 unchanged ("Webfejlesztő és IT szolgáltatások kkv-knak"); "Debrecen" appears 0 times in homepage visible text (only in JSON-LD). A fixed version exists in `homeHu` (content-hu.ts:23-27: title "Weboldal és webshop készítés Debrecenben \| Csuka Viktor", 55 chars) but `homeHu` is not imported anywhere in src/. Homepage does link to /hu/weboldal-keszites with the exact anchor "Weboldal készítés" (service list + footer), so the anchor half is done. |
| 4 | [Low] Identical meta keywords and OG image site-wide | **PARTIAL** | meta keywords removed on all 10 pages. og:image is still https://www.csukaviktor.com/og-image.jpg on every page. |
| 5 | [Low] English homepage has no path to services | **STILL OPEN** | /en internal links: /en, /en/blog, /hu, blog post, LinkedIn. No service pages or EN equivalents. |

## What works

- Service titles lead with the primary keyword (weboldal készítés, webshop készítés, Google Ads hirdetéskezelés, weboldal üzemeltetés), descriptions include price + region + CTA, all within 145-160 chars.
- H1s on service pages match search intent and include the city on the main money page.
- Question-form H2s/H3s ("Weboldal készítés árak – mennyibe kerül egy weboldal?") match long-tail queries and feed FAQ rich snippets.
- Internal linking: homepage links to all 4 service pages with keyword anchors (twice: service list and footer); each service page has breadcrumbs, a "Kapcsolódó szolgáltatások" block linking the other three, and footer links to all 4 + blog.
- HU blog post links to the webshop service page with a descriptive anchor.

## New and remaining findings

### [Medium] Homepage title/H1 still generic; ready-made fix unused (CARRIED)

See previous #3. The homepage competes with nothing for "weboldal készítés Debrecen" today because it does not mention Debrecen in visible text at all.

**Fix:** Import `homeHu` in src/app/[lang]/page.tsx for `lang === "hu"` and use its `title`, `description`, `h1` ("Weboldal és webshop készítés vállalkozásoknak Debrecenben és környékén") and `eyebrow`. Keep /hu/weboldal-keszites as the deeper page; the homepage then targets the broader "weboldal és webshop készítés Debrecen".

### [Medium] Homepage H2 section is "IT üzemeltetési szolgáltatások" with conflicting prices (NEW)

The only services H2 on the homepage is about IT operations ("IT üzemeltetési szolgáltatások kkv-knak"), with six cards priced 90 000-180 000 Ft. The four primary services appear only as bare arrow links underneath, with no H3, description or price. Heading emphasis therefore points the homepage at IT ops instead of web/webshop building, and the prices conflict with /hu/it-uzemeltetes (9999 Ft/hó) and with the homepage JSON-LD of the service pages.

**Fix:** Make the homepage services H2 "Szolgáltatások" with 4 H3 cards (weboldal készítés, webshop készítés, Google és Facebook hirdetések, üzemeltetés), each with a short text, price and link (the data is already in `homeHu.services`). Move the six IT items to /hu/it-uzemeltetes or drop them.

### [Medium] Blog hub is thin and has a non-descriptive H1 (NEW)

/hu/blog is about 54 words with H1 "Fejlesztői gondolatok." and title "Blog | Csuka Viktor" (19 chars). The description mentions Supabase and React Native, which no remaining post covers. With one post, the hub adds little and is a weak internal-link source.

**Fix:** Title e.g. "Blog: weboldal, webshop és online marketing tippek | Csuka Viktor"; H1 "Weboldal és webshop tippek kisvállalkozásoknak"; 2-3 sentence intro linking to the service pages; update the description. Grow the post count (see content.md).

### [Low] Service pages do not link to the blog (NEW)

Linking is one-way: the blog post links to /hu/webshop-keszites, but /hu/webshop-keszites does not link back to the Next.js+Stripe post, which is its best supporting content (it documents the Hoodini build). The Hoodini reference on that page is also plain text with no link.

**Fix:** In the "Referencia" section on /hu/webshop-keszites, link "hoodini.hu" externally and add "Hogyan készült: Next.js + Stripe webshop tapasztalatok" linking to the post. Add a "Kapcsolódó cikkek" block to each service page as posts are published.

### [Low] EN blog post has no conversion path (PARTIAL of previous #2)

**Fix:** Add an end-of-post CTA to /en#contact ("Need a custom online store? Get a quote") so EN readers have a next step.

### [Low] Blog post H1 still says "Next.js 14" (NEW)

Both blog post H1s and the homepage teaser use "Next.js 14". The SEO title already dropped the version. Dated version numbers in H1 signal staleness.

**Fix:** Change the H1 to "Next.js és Stripe webshop: full-stack e-commerce tapasztalatok" when the post is refreshed, and set `dateModified`.

### [Low] Same OG image on every page (CARRIED)

**Fix:** Add `opengraph-image.tsx` to `[lang]/[service]` and `[lang]/blog/[slug]` rendering the page H1 and price.

### [Low] English homepage has no path to services (CARRIED)

Acceptable if the target market is Hungary only. Otherwise add a short EN "Services" page or link /en to /hu service pages with an "available in Hungarian" note.

### [Low] /en/blog description repeats brand name (NEW, metadata_template.py)

"Articles by Csuka Viktor on..." spends SERP characters on the brand already in the title. Rewrite to lead with the topic.

## Structured findings (audit-data.json, On-Page SEO)

```json
{
  "category": "On-Page SEO",
  "score": 80,
  "previous_score": 75,
  "previous_status": {"blog_titles_too_long": "FIXED", "blog_no_service_links": "FIXED (HU), OPEN (EN)", "homepage_h1_keyword": "STILL OPEN", "meta_keywords_og_image": "PARTIAL", "en_no_services": "STILL OPEN"},
  "findings": [
    {"severity": "medium", "title": "Homepage title/H1 generic, no Debrecen; homeHu fix not wired", "new": false},
    {"severity": "medium", "title": "Homepage services H2 is IT ops with 90k-180k prices; 4 core services only bare links", "new": true},
    {"severity": "medium", "title": "Blog hub thin, non-descriptive H1, outdated description", "new": true},
    {"severity": "low", "title": "Service pages do not link to blog; Hoodini reference unlinked", "new": true},
    {"severity": "low", "title": "EN blog post has no CTA", "new": false},
    {"severity": "low", "title": "Blog H1 'Next.js 14' dated", "new": true},
    {"severity": "low", "title": "Single OG image site-wide", "new": false},
    {"severity": "low", "title": "EN homepage has no path to services", "new": false},
    {"severity": "low", "title": "/en/blog description repeats brand", "new": true}
  ]
}
```

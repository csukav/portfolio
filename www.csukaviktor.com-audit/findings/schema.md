# Schema / Structured Data findings — www.csukaviktor.com (re-audit 2026-11-02)

Method: source review of layout.tsx, [service]/page.tsx, blog/page.tsx, blog/[slug]/page.tsx, lib/site.ts, translations.ts (live fetch not performed; JSON-LD is server-rendered in React components, so it is present in raw HTML).

## Schema / Structured Data — 84/100 (previous 78)

## Previous issues
| # | Previous issue | Status |
|---|---|---|
| 1 | ProfessionalService lacked local properties | PARTIAL. Added address (Debrecen / Hajdú-Bihar / HU), telephone, email, priceRange, areaServed City+Admin+Country. Still missing: GBP in sameAs, ProfessionalService sameAs, geo, openingHours. priceRange text is not a real range (see F2). |
| 2 | Person/ProfessionalService/BlogPosting image = og-image.jpg | STILL OPEN |
| 3 | Plural "we" voice | FIXED (no "we/-unk" copy found in translations) |
| 4 | FAQPage info note | FIXED, but wording outdated: FAQ rich results retired for ALL sites on 2026-05-07 (see F5) |

## What works
- Site-wide @graph (WebSite, Person, ProfessionalService) with stable @ids, https context, absolute URLs, `<` escaped in layout output.
- Service pages: Service (provider -> #person) + BreadcrumbList; posts: BlogPosting + BreadcrumbList (3 levels); blog index: Blog + blogPost list + BreadcrumbList.
- ISO dates, inLanguage per locale, hreflang alternates on posts, OfferCatalog mirrors visible prices.
- No deprecated types (HowTo, SpecialAnnouncement).

## Findings

### [Medium] F1 Person.image / BlogPosting.image is the 1200x630 OG banner
Evidence: `image: SITE_URL + OG_IMAGE.url` in layout (Person, ProfessionalService) and in blog/[slug]. Google Article guidance wants images (ideally 16:9, 4:3 and 1:1 variants) and a person image should be a headshot.
Fix: add `/viktor.jpg` (square headshot) for Person.image; per-post `image` field in lib/blog.ts, ideally array of 1:1, 4:3, 16:9.

### [Low] F2 priceRange is free text and inconsistent with catalog
Evidence: `"19 999 Ft-tól"` while the lowest catalog minPrice is 90 000 HUF (and EUR set in EN). Google/Bing expect a range or $-symbols ("19 999–500 000 HUF").
Fix: `priceRange: "$$"` or derive from min of services.items minPrice, e.g. "90 000 Ft - 180 000 Ft+" (or correct the 19 999 figure if a cheaper package exists).

### [Low] F3 Entity gaps: ProfessionalService sameAs, GBP, WebPage nodes
Evidence: ProfessionalService has no sameAs/logo; Service nodes do not link to #service business node; no WebPage/CollectionPage node, no BreadcrumbList on home.
Fix: see snippets A and B.

### [Low] F4 Blog post schema detail
Evidence: dateModified = datePublished; publisher is Person (acceptable, but Organization/ProfessionalService with logo is the Google-preferred shape); author inlines a full Person duplicating @id with url = SITE_URL (differs from Person.url per locale); service/blog pages do not escape `<` in JSON.stringify (layout does); `timeRequired` fine. No `wordCount`/`articleSection`.
Fix: see snippet C; add an `updated` field; use `{ "@id": ".../#person" }` references only; apply the same `.replace(/</g,"\u003c")` in all three pages.

### [Info] F5 FAQPage on service pages
Evidence: FAQPage emitted on all 4 service pages. Google retired FAQ rich results for all sites on 2026-05-07; no SERP benefit, AI/GEO benefit unconfirmed.
Fix: harmless to keep as is; optionally remove to reduce payload. Do not expand it. Keep the visible FAQ content.

### [Info] F6 /en service pages absent
Service schema exists only for /hu (by design, /en/<slug> is 404). Consider EN service pages later with Service + inLanguage en.

## Ready-to-paste JSON-LD

### A. ProfessionalService additions (layout.tsx, inside the ProfessionalService node)
```json
{
  "sameAs": ["https://github.com/csukav", "https://www.linkedin.com/in/csukaviktor", "https://g.page/REPLACE_WITH_REAL_GBP_URL"],
  "logo": "https://www.csukaviktor.com/logo.png",
  "priceRange": "90 000 Ft - 180 000 Ft+",
  "geo": { "@type": "GeoCoordinates", "latitude": 47.5316, "longitude": 21.6273 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "17:00"
  }]
}
```
(Replace the GBP URL and hours with real values; omit what you cannot verify. Do not ship the placeholder.)

### B. Service page: link to business node + WebPage (add to @graph in [service]/page.tsx)
```json
[
  {
    "@type": "WebPage",
    "@id": "<url>#webpage",
    "url": "<url>",
    "name": "<page.title>",
    "inLanguage": "hu-HU",
    "isPartOf": { "@id": "https://www.csukaviktor.com/#website" },
    "breadcrumb": { "@id": "<url>#breadcrumb" },
    "mainEntity": { "@id": "<url>#service" }
  }
]
```
Also set on the Service node: `"provider": [{ "@id": "https://www.csukaviktor.com/#service" }, { "@id": "https://www.csukaviktor.com/#person" }]` and give the BreadcrumbList `"@id": "<url>#breadcrumb"`.

### C. BlogPosting corrected (blog/[slug]/page.tsx)
```json
{
  "@type": "BlogPosting",
  "@id": "<url>#post",
  "headline": "<title>",
  "description": "<description>",
  "datePublished": "2026-02-10",
  "dateModified": "<post.updated ?? post.date>",
  "inLanguage": "hu-HU",
  "url": "<url>",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "<url>" },
  "image": ["https://www.csukaviktor.com/blog/<slug>-16x9.jpg", "https://www.csukaviktor.com/blog/<slug>-4x3.jpg", "https://www.csukaviktor.com/blog/<slug>-1x1.jpg"],
  "author": { "@id": "https://www.csukaviktor.com/#person" },
  "publisher": { "@id": "https://www.csukaviktor.com/#service" },
  "isPartOf": { "@id": "<blogUrl>#blog" },
  "keywords": "<tags>",
  "timeRequired": "PT<n>M"
}
```

### D. Person headshot
```json
{ "@type": "Person", "@id": "https://www.csukaviktor.com/#person", "image": { "@type": "ImageObject", "url": "https://www.csukaviktor.com/viktor.jpg", "width": 800, "height": 800 } }
```

## Per-page summary
- /hu, /en: WebSite + Person + ProfessionalService - valid (F1-F3).
- /hu/weboldal-keszites, webshop-keszites, online-hirdetes, it-uzemeltetes: layout graph + Service, BreadcrumbList, FAQPage - valid (F3, F5).
- /hu/blog, /en/blog: layout graph + Blog, BreadcrumbList - valid.
- /hu|en/blog/nextjs-stripe-ecommerce: layout graph + BlogPosting, BreadcrumbList - valid (F1, F4).

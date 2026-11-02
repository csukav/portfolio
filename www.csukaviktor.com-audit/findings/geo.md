# AI Search Readiness findings: www.csukaviktor.com

Re-audit: 2026-11-02 (previous: 2026-10-26, 65/100). Live site after commit `34425ee szolg`.

## AI Search Readiness: 66/100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 74 | Service pages strong (question H2s, direct price/timeline answers); home page is generic portfolio copy |
| Structural Readability | 20% | 80 | One H1, question-style H2/H3, bullet lists, FAQPage + BreadcrumbList on all 4 service pages |
| Multi-Modal Content | 15% | 35 | 0 images, 0 tables, 0 video on all 4 service pages; home has 3 project images |
| Authority & Brand Signals | 20% | 42 | Person/ProfessionalService schema, 2 sameAs; no About page, no reviews, no dates on service pages, thin third-party footprint, name collision |
| Technical Accessibility | 20% | 85 | Full SSR (is_spa=false), robots allows all, identical 200 responses to AI UAs; no llms.txt |

Platform estimates: Google AIO 62, ChatGPT Search 58, Perplexity 60, Bing Copilot 60. Bing/ChatGPT lean on third-party entity data, which is the weakest area.

### Status of previous findings

| Previous finding | Status | Evidence |
|---|---|---|
| [Medium] Little citable, entity-defining content (no About page, no reviews, few third-party mentions) | PARTIAL | Service pages now have rich, quotable sections (process, Debrecen, "egyoldalas vagy többoldalas", maintenance rationale). Still no About page, no reviews/testimonials, no new third-party listings found |
| [Low] No llms.txt or explicit AI crawler policy | STILL OPEN | `/llms.txt` 404 (Next.js 404 page). robots.txt still only `User-Agent: *` |

## What works

- Every page is server-rendered; AI crawlers get full text without JS. OAI-SearchBot, Claude-SearchBot, PerplexityBot and GPTBot all get the same HTTP 200 response (111,052 bytes) for `/hu`
- robots.txt: `User-Agent: * / Allow: / / Disallow: /api/` plus a sitemap. All search and training crawlers are allowed by default
- The 4 service pages (/hu/weboldal-keszites, /hu/webshop-keszites, /hu/online-hirdetes, /hu/it-uzemeltetes) are well suited to AI answers:
  - question H2s ("Mennyibe kerül egy weboldal?", "Egyedi webshop vagy bérelt webshoprendszer?", "Google Ads vagy Facebook hirdetés – melyik kell neked?")
  - an answer in the first sentence with a concrete number ("Bemutatkozó weboldal 19999 Ft-tól", "általában 1 hét alatt elkészül", "9999 Ft/hó-tól")
  - 6-8 FAQ answers per page, marked up as FAQPage
- The service pages name the location clearly ("Debrecenben és Hajdú-Bihar vármegyében"), which helps local AI answers
- Sitewide JSON-LD `@graph` includes WebSite, Person (jobTitle, knowsAbout, telephone, sameAs GitHub and LinkedIn) and ProfessionalService (address Debrecen/Hajdú-Bihar, areaServed, founder). The entity graph is consistent
- Internal links: the home page links to all 4 service pages and the blog

## Findings

### [High] The new home page content was written but never shipped, so the live home page gives AI wrong prices and no location

`src/content/content-hu.ts` defines `homeHu`, which has:
- a Debrecen H1: "Weboldal és webshop készítés vállalkozásoknak Debrecenben és környékén"
- a services list with prices of 19999 / 49999 / 9999 Ft/hó
- a Hoodini reference, a "Miért velem dolgozz?" section and a 5-question FAQ

`homeHu` is not imported anywhere (grep finds only its definition). The live `/hu` still renders the old `src/lib/translations.ts` copy:
- the H1 is "Webfejlesztő és IT szolgáltatások kkv-knak."
- "Debrecen" appears 0 times in the visible text
- the only prices are IT services at "Ár: 180 000 Ft-tól", 120 000, 110 000 and 90 000 Ft

The sitewide ProfessionalService schema repeats those 90k-180k HUF `minPrice` offers. Meanwhile /hu/it-uzemeltetes says "Üzemeltetési csomag 9999 Ft/hó-tól". AI engines get two conflicting price sets for the same service, and the home page (the most-cited URL) has no quotable answer to "weboldal készítés Debrecen ár".

**Fix:** Render `homeHu` on `/hu`: H1, services with prices, references, process, why and FAQ (with FAQPage schema). Remove the 90k-180k IT price cards from `translations.ts`, or reconcile them, and update the `hasOfferCatalog` in the layout JSON-LD so it matches the service-page prices (19999 / 49999 / 9999 / 9999). Effort: 2-3 h.

### [Medium] No About / entity page, no credentials, no reviews

None of the audited pages say when Viktor started, how many sites he has delivered, what qualifications he has, or show testimonials. The home "Rólam" block is generic ("Szenvedéllyel, precizitással"). The schema has no `foundingDate` and no `aggregateRating`/`review`. Without this, AI answers have nothing to support recommending him over Debrecen agencies.

**Fix:**
- Add a /hu/rolam page that opens with a 2-3 sentence entity statement, for example: "Csuka Viktor debreceni full-stack webfejlesztő; [év] óta készít weboldalakat és webshopokat kkv-knak; [X] átadott projekt..."
- Add 2-3 named client testimonials (Hoodini, etc.) with measurable results. The `[Eredmény: ...]` placeholder in `homeHu` still needs real data
- Link the About page from Person.url / mainEntityOfPage

Effort: 3-4 h plus collecting testimonials.

### [Medium] Thin, ambiguous third-party footprint

A web search for "Csuka Viktor" weboldal and csukaviktor.com returned only:
- csukaviktor.com itself
- GitHub (csukav)
- LinkedIn (titled "Frontend developer", while the site says "Full-Stack")
- Instagram @csukaviktor
- two Facebook profiles
- a companywall.hu company record

The same results also include TikTok @csukaviktor.tattoo, a different person with the same name, so entity disambiguation is weak. No Google Business Profile reviews, Hungarian directory listings, Reddit, YouTube or Wikipedia/Wikidata presence turned up. "Csuka Viktor webfejlesztő Debrecen" returned no results.

**Fix:**
- Make the LinkedIn headline match the site ("Full-Stack webfejlesztő, Debrecen")
- Add Instagram, Facebook and the Google Business Profile URL to `sameAs`
- Claim or complete the Google Business Profile and collect reviews
- Get listed on Hungarian directories (e.g. Cylex, Arany Oldalak, Firmania) with an identical name, address and phone
- Publish 1-2 YouTube or short-video case studies, which have the strongest correlation with AI citations

Effort: ongoing, 1-2 h to start.

### [Medium] Service pages have no visuals, tables or freshness signals

All 4 service pages have 0 `<img>`, 0 `<table>` and 0 video. They also have no visible updated date (`publication_date` falls back to 2026-01-01; there is no `<time>` element). Comparison H2s like "Egyedi webshop vagy bérelt webshoprendszer?" and "Google Ads vagy Facebook hirdetés" are written as prose, but comparison tables are much easier for AI engines to quote.

**Fix:**
- Turn the comparison sections into small 2-column tables
- Add 1-2 real screenshots of client work with descriptive Hungarian alt text to each service page
- Show "Frissítve: 2026. október" and add `dateModified` to the Service/WebPage schema

Effort: 2-3 h.

### [Low] No llms.txt (still open)

`/llms.txt` returns a 404. robots.txt has no named AI crawler groups. That is fine because `*` allows everything, but there is no explicit policy. There is also no RSL licence (`/license.xml` returns 404). None of this is a ranking factor.

**Fix:** Add `public/llms.txt` containing:
- a one-line entity summary (name, role, Debrecen/Hajdú-Bihar)
- the 4 services with "from" prices and URLs
- contact details and the blog link

Optionally, add explicit `Allow` groups for OAI-SearchBot, Claude-SearchBot and PerplexityBot. Effort: 15 min.

### [Low] The English site has no service pages

`/en/weboldal-keszites` returns a 404, and the sitemap lists no English service URLs. English-language AI queries ("web developer Debrecen") can only cite the generic `/en` portfolio page. Effort: 2-4 h if the English market matters, otherwise ignore.

## Top 5 changes by impact

1. Ship `homeHu` on `/hu` and reconcile the prices in the home page and schema (High, 2-3 h)
2. Add a /hu/rolam entity page and real testimonials (Medium, 3-4 h)
3. Build the Google Business Profile, directory listings and consistent sameAs/LinkedIn headline (Medium, ongoing)
4. Add comparison tables, project screenshots and dateModified to the service pages (Medium, 2-3 h)
5. Add `public/llms.txt` (Low, 15 min)

## audit-data.json (AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 66,
  "previous_score": 65,
  "dimensions": {"citability": 74, "structure": 80, "multimodal": 35, "authority": 42, "technical": 85},
  "crawlers": {"OAI-SearchBot": "allowed", "Claude-SearchBot": "allowed", "PerplexityBot": "allowed", "GPTBot": "allowed", "ClaudeBot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed"},
  "llms_txt": "missing",
  "rsl": "missing",
  "findings": [
    {"severity": "High", "title": "New homeHu content never rendered; live home shows conflicting IT prices (90k-180k Ft) and no Debrecen", "status": "new"},
    {"severity": "Medium", "title": "No About/entity page, credentials or reviews", "status": "partial"},
    {"severity": "Medium", "title": "Thin, ambiguous third-party footprint (name collision, LinkedIn title mismatch)", "status": "partial"},
    {"severity": "Medium", "title": "Service pages lack images, tables and dates", "status": "new"},
    {"severity": "Low", "title": "No llms.txt", "status": "still_open"},
    {"severity": "Low", "title": "No English service pages", "status": "new"}
  ]
}
```

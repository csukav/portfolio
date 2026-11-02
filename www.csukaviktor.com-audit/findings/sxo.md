# Search Experience (SXO) Findings: www.csukaviktor.com

**SXO Gap Score: 51 / 100** (separate from the SEO Health Score)
Date: 2026-11-02 | Pages analyzed: 4 Hungarian service pages | Renderer: render_page.py --mode auto (is_spa=false, server-rendered HTML; all pages HTTP 200)

| Page | Target keyword | Expected SERP type | Page type | Mismatch | Page score |
|---|---|---|---|---|---|
| /hu/it-uzemeltetes | IT üzemeltetés kisvállalkozás | Hybrid / Service (office managed IT) | Service: *website* maintenance | **HIGH (topic/intent)** | 43 |
| /hu/online-hirdetes | online hirdetés kezelés | Mixed: Informational + Service (Hybrid) | Service | **MEDIUM** | 51 |
| /hu/webshop-keszites | webshop készítés Debrecen | Local Page (map pack + local providers) | Generic service page, weak local signals | **HIGH** | 54 |
| /hu/weboldal-keszites | weboldal készítés Debrecen | Local Page (map pack + local providers) | Local service page | **ALIGNED (gaps in proof)** | 55 |

Average = 50.75, rounded to **51**.

---

## 1. SERP backwards analysis

**Method caveat:** the available WebSearch tool does not return a google.hu SERP. It does not show the local pack, ads, PAA, or the real rank order. For the two Debrecen queries it returned mostly off-topic results (unideb.hu theses, PDFs, news). So the observed results are used only as weak intent signals. The expected SERP types below are inferred from those signals plus the normal pattern for Hungarian "[service] + [city]" queries. **Confidence: medium for the local queries, medium-high for the IT and ads queries.**

| Keyword | Observed signals | Inferred dominant type | Consensus |
|---|---|---|---|
| weboldal készítés Debrecen | No relevant organic local provider was returned. The tool's summary itself pointed users to "Google Térkép / helyi cégkereső (Firmania, Cylex)". It also returned price/DIY guides (websiteplanet "mennyibe kerül", hvg how-to). | Local Page / local service page. Local pack likely dominates above the fold, with directories and some price guides. | ~70% local/service |
| webshop készítés Debrecen | Same pattern. Shopify partner directory, platform/DIY articles (Telex Shoptet, vg.hu "egyedi vs bérelt"), and the websiteplanet e-commerce builder top list. | Local/service pages mixed with "custom vs rented platform" comparison content | ~60% service, ~30% comparison/guide |
| online hirdetés kezelés | Results were mostly informational or tool-oriented: Google Ad Manager help, ClickUp "hirdetéskezelő eszköz" list, Meta Ads Manager glossary, profession.hu job role, plus one agency service page (hostragons "Professzionális hirdetéskezelés"). | Mixed or informational. "Hirdetéskezelő" is also the Hungarian name of Meta Ads Manager. | ~25% service, ~75% info/tool |
| IT üzemeltetés kisvállalkozás | Managed IT / outsourcing content: Invitech IT outsourcing, Ranktracker "managed IT for small business", ITIL (KPMG), monthly-fee model, SLA, helpdesk, network, workstations, security, disaster recovery | Hybrid (service plus educational) about **office IT operations**, not website hosting | ~80% managed-IT topic |

---

## 2. Findings (severity / evidence / fix)

### F1. HIGH: /hu/it-uzemeltetes does not match the search intent of "IT üzemeltetés kisvállalkozás"
- **Evidence:**
  - Title: "Weboldal üzemeltetés, karbantartás és IT támogatás". H1: "Weboldal üzemeltetés és IT támogatás vállalkozásoknak".
  - Meta description: "Havidíjas weboldal üzemeltetés és karbantartás…".
  - 5 of the 6 included items are about websites or servers: domain, backup, SSL, AWS/Azure/Vercel/Proxmox.
  - Nothing covers what SERP results describe for SMB IT ops: workstations and laptops, network and Wi-Fi, Microsoft 365 / Google Workspace, printers, endpoint security and antivirus, helpdesk, an SLA or response time, or on-site support.
  - The URL slug promises "IT üzemeltetés", but the content is about website maintenance.
- **Fix (pick one):**
  - (a) **Retarget:** rename to "Weboldal üzemeltetés és karbantartás". Change the slug to /hu/weboldal-uzemeltetes with a 301 redirect, and target "weboldal karbantartás / üzemeltetés havidíj".
  - (b) **Expand to real SMB IT ops.** Add H2s for "Munkaállomások és felhasználók", "Hálózat, Wi-Fi, VPN", "Microsoft 365 / Google Workspace", "Mentés és katasztrófa-helyreállítás", "Biztonság (vírusvédelem, jelszókezelés, MFA)", and "Válaszidő / SLA (pl. 4 órán belüli reakció munkanapon)". Add a package table (per user/per device monthly fee) and an on-site Debrecen support note.
  - Option (b) only makes sense if the service is really offered. Otherwise use (a).

### F2. HIGH: /hu/webshop-keszites has almost no local signals for a "[service] Debrecen" query
- **Evidence:**
  - Title: "Webshop készítés kis- és középvállalkozásoknak | Csuka Viktor", with no city.
  - H1: "Webshop és webáruház készítés kis- és középvállalkozásoknak", with no city.
  - "Debrecen" appears only in the meta description and one boilerplate H2 ("Webshop készítés Debrecenben és környékén").
  - The taxonomy rule "Generic Service Page missing local signals" applies, which is rated HIGH.
- **Fix:**
  - Title: "Webshop készítés Debrecen – egyedi webáruház 49 999 Ft-tól | Csuka Viktor".
  - H1: "Webshop készítés Debrecenben, kis- és középvállalkozásoknak".
  - Add a local proof block: Debrecen or Hajdú-Bihar client(s), "személyes egyeztetés Debrecenben", embedded Google Business Profile map and reviews.
  - See /seo local for GBP work.

### F3. HIGH (systemic): no visual or social proof on any service page
- **Evidence:**
  - parse_html reports **Images: 0** on all four pages.
  - No portfolio screenshots, no photo of Viktor, and no client logos.
  - There are no testimonials or reviews (grep for vélemény/értékelés/review found nothing relevant). There is no aggregateRating, and no Google review count.
  - The only reference is a single text line, "Hoodini – streetwear webshop (hoodini.hu)", on the webshop page, and it is **not linked**.
  - The website page has no reference at all.
  - Local-pack competitors win on star ratings and review counts. This page cannot show either.
- **Fix:**
  - Add a "Referenciák" section to each page: 2-4 cards with a screenshot (WebP), client and city, the problem, what was built, and a result (e.g., "PageSpeed 98, +X ajánlatkérés/hó"). Link to the live site.
  - Add 2-3 Google reviews (quoted with name and business) and a "Google értékelés ★ x.x (n)" badge that links to the GBP.
  - Add a headshot near the "Végig egy emberrel beszélsz" line.

### F4. MEDIUM: very low "from" prices are not backed by a scope breakdown
- **Evidence:**
  - Prices shown: 19 999 Ft-tól (website), 49 999 Ft-tól (webshop), 9 999 Ft/hó (ads management and operations).
  - These are well below what Hungarian market guides imply. For a price-shopper they read as "too good to be true".
  - There is no package table, and nothing says what the entry price includes (pages, revisions, copywriting, domain or hosting).
- **Fix:**
  - Add a 3-tier package table to each page, e.g. "Bemutatkozó (19 999 Ft): 1 oldal, 1 kör javítás, …" / "Céges (xx Ft): 5 oldal, blog…" / "Egyedi: ajánlat alapján".
  - State what is **not** included.
  - Add an "Miért ilyen kedvező az ár?" FAQ: one person, no agency overhead, modern stack, no plugin licences.
  - Keep Offer/PriceSpecification schema in sync with the table.

### F5. MEDIUM: /hu/online-hirdetes faces a mixed-intent SERP and lacks the exact phrase
- **Evidence:**
  - Observed results are mostly informational or tool pages (Ad Manager help, ClickUp tool list, Meta "Hirdetéskezelő" glossary, job description). Only one agency service page appeared.
  - The page is a pure service page.
  - Title and H1 use "Google Ads és Facebook hirdetéskezelés". "Online hirdetés" is not in the title or the H1.
- **Fix:**
  - Treat it as a Hybrid page. Add a short educational block: "Mit jelent az online hirdetéskezelés?" and "Kampánykezelés lépései", with a sample monthly report screenshot.
  - Add a worked example: budget, CPC, leads, cost per lead.
  - Put "online hirdetéskezelés" in the H1 or the intro.
  - Consider making "Google Ads kezelés Debrecen" / "Facebook hirdetés kezelés Debrecen" the primary commercial target, because the generic phrase leans informational. Use /seo content or a blog post to capture the informational part.

### F6. MEDIUM: content depth is thin compared with ranking service and local pages
- **Evidence:**
  - Word counts: 584 (weboldal), 572 (webshop), 606 (hirdetés), 526 (IT).
  - All four pages use the same template: intro, includes, for whom, process, price, Debrecen, FAQ, related.
  - The Debrecen paragraph is almost identical on every page.
- **Fix:**
  - Add page-specific depth (target about 1 000-1 400 words): a case study, a "custom vs rented platform" comparison table on the webshop page, and a timeline with deliverables.
  - Write a unique local paragraph per service: Debrecen industries served, travel radius, meeting location.

### F7. MEDIUM: conversion path is generic and has a tone mismatch
- **Evidence:**
  - The above-the-fold CTA is good: "Ingyenes ajánlatkérés" plus a tel: link.
  - The shared contact block says "Legyen szó új projektről, együttműködésről vagy csak egy kávés csevejről". That is portfolio/developer tone on a commercial page.
  - It also contains a typo: "együttműközésről".
  - The form only has name, email and message. There is no service selector, no budget or timeline fields, and no phone field.
  - The email is a gmail.com address, which is a trust signal for B2B buyers.
- **Fix:**
  - Use a service-specific form heading ("Kérj ajánlatot weboldalra – 24 órán belül válaszolok").
  - Pre-select the service, add optional budget and deadline fields and a phone field, and fix the typo.
  - Use a domain email (e.g. info@csukaviktor.com).
  - Add a response-time promise next to the CTA.

### F8. LOW: schema is strong but not a differentiator
- **Evidence:**
  - Each page has ProfessionalService (with priceRange, telephone, areaServed), OfferCatalog with 7 Offers, Service, BreadcrumbList, and FAQPage (6-8 Q&A).
  - FAQ rich results are limited to government and health sites since 2023, so FAQPage gives no SERP feature.
  - PostalAddress is city-level only (Debrecen, Hajdú-Bihar). There is no visible NAP block on the page.
- **Fix:**
  - Keep the current schema. Once real reviews exist, add review/Review markup only where it is policy-compliant.
  - Add a visible NAP and service-area line that matches the GBP. See /seo schema and /seo local.

### F9. LOW: freshness signal
- **Evidence:** htmldate returned 2026-01-01 for all pages, which looks like a template default. No "Frissítve" date is visible, and the prices have no "2026-os árak" framing.
- **Fix:** Add a "Árak frissítve: 2026. november" line in the price section and keep dateModified accurate.

---

## 3. User stories (derived from SERP signals)

1. **Awareness/consideration.** *Signal: price-guide results ("mennyibe kerül elkészíteni egy weboldalt") rank for local queries.* "As a Debrecen shop owner, I want to know what a business website realistically costs and what is included, so I can budget before I call anyone."
2. **Consideration.** *Signal: directory and map-pack redirection ("Google Térkép, Firmania, Cylex" with reviews).* "As a local business owner comparing nearby providers, I want reviews and examples of similar local clients, so I can trust a one-person provider over an agency."
3. **Consideration.** *Signal: "egyedi vs bérelt webshop" and Shoptet DIY articles for the webshop query.* "As a small retailer, I want to understand whether a custom webshop beats Shoprenter/UNAS/Shoptet for me, so I don't overpay or lock myself in."
4. **Awareness.** *Signal: tool and definition results for "online hirdetés kezelés".* "As an owner who has never run ads, I want to understand what ad management includes and what budget I need, before I hand my money to someone."
5. **Decision.** *Signal: SLA, helpdesk and monthly-fee themes in the IT ops results.* "As a 5-15 person company without an IT person, I want a fixed monthly fee with a guaranteed response time covering our PCs, network and M365, so that problems get fixed fast."

---

## 4. Persona scoring (Relevance / Clarity / Trust / Action, 25 each)

| Persona | R | C | T | A | Total |
|---|---|---|---|---|---|
| SMB office seeking IT ops ("nincs informatikusunk") | 6 | 12 | 6 | 15 | **39** |
| Hiring a developer (agency/startup looking for a React/Next.js freelancer) | 8 | 12 | 12 | 12 | **44** |
| Price-shopper | 19 | 13 | 8 | 16 | **56** |
| Local small-business owner (Debrecen) | 20 | 18 | 9 | 18 | **65** |
| **Average** | | | | | **51** |

Weakest first:
1. **IT-ops seeker (39):** the page talks about websites, not office IT. Apply F1. Either retarget or add PC, network, M365, SLA and per-device pricing.
2. **Hiring a developer (44):** the service pages address end clients only. The stack is mentioned once ("React, Next.js"). There is no availability, day rate or contract-work CTA, and no code or case-study depth.
   - Add a "Fejlesztőt keresel? / Alvállalkozói együttműködés" block (or a dedicated /hu/freelance-fejleszto page) with stack, availability, hourly or daily rate and GitHub highlights.
   - Link to it from the footer.
3. **Price-shopper (56):** prices are visible (good), but only as "from" values with no scope, so trust is low. Apply F4: tier table, inclusions and exclusions, and a "miért kedvező" FAQ.
4. **Local SMB owner (65):** clear copy, a phone CTA and Debrecen mentions, but there is no proof (F3) and the webshop page has weak local signals (F2). Add local references, Google reviews, a headshot and a GBP map embed.

**Systemic issues:** zero images, zero reviews, one unlinked reference, an identical template across all pages, and a generic contact block.

---

## 5. Gap scores per page (7 dimensions)

| Dimension (max) | weboldal | webshop | hirdetés | IT |
|---|---|---|---|---|
| Page type (15) | 11 | 8 | 8 | 4 |
| Content depth (15) | 9 | 9 | 9 | 7 |
| UX signals (15) | 11 | 11 | 11 | 10 |
| Schema (15) | 12 | 12 | 12 | 11 |
| Media (15) | 2 | 2 | 2 | 2 |
| Authority (15) | 4 | 6 | 3 | 3 |
| Freshness (10) | 6 | 6 | 6 | 6 |
| **Total (100)** | **55** | **54** | **51** | **43** |

---

## 6. Structured findings (for audit-data.json, category "Search Experience")

```json
{
  "category": "Search Experience",
  "score": 51,
  "findings": [
    {"id":"SXO-1","severity":"high","page":"/hu/it-uzemeltetes","title":"Content is website maintenance; keyword intent is SMB office IT operations","fix":"Retarget to 'weboldal üzemeltetés' (+301) or expand with PC/network/M365/backup/security/SLA sections and per-device pricing"},
    {"id":"SXO-2","severity":"high","page":"/hu/webshop-keszites","title":"No 'Debrecen' in title/H1 for local query","fix":"Add city to title/H1, local proof block, GBP map/reviews"},
    {"id":"SXO-3","severity":"high","page":"all","title":"0 images, no reviews/testimonials, single unlinked reference","fix":"Add reference cards with screenshots, Google reviews, headshot"},
    {"id":"SXO-4","severity":"medium","page":"all","title":"Very low from-prices without scope/tier table hurt trust","fix":"3-tier package tables with inclusions/exclusions + 'why affordable' FAQ"},
    {"id":"SXO-5","severity":"medium","page":"/hu/online-hirdetes","title":"Mixed/informational SERP; exact phrase absent from title/H1","fix":"Hybrid content block, worked example, add phrase; consider 'Google Ads kezelés Debrecen' as primary"},
    {"id":"SXO-6","severity":"medium","page":"all","title":"Thin, templated content (526-606 words)","fix":"Expand to ~1000-1400 words with page-specific case studies/comparisons"},
    {"id":"SXO-7","severity":"medium","page":"all","title":"Generic contact block, portfolio tone, typo 'együttműközésről', gmail address","fix":"Service-specific form, budget/deadline fields, domain email, response-time promise"},
    {"id":"SXO-8","severity":"low","page":"all","title":"FAQPage schema yields no rich result; no visible NAP","fix":"Visible NAP matching GBP; review markup once real reviews exist"},
    {"id":"SXO-9","severity":"low","page":"all","title":"Template default date 2026-01-01, no visible update date","fix":"Add 'Árak frissítve' line and accurate dateModified"}
  ]
}
```

---

## 7. Limitations

- **A live google.hu SERP was not available.** The WebSearch tool does not return the local pack, Ads, PAA, AI Overview, or true positions 1-10. For the Debrecen queries it returned mostly irrelevant documents. SERP consensus figures are inferred estimates, not measured.
- No ranking or impression data was available (Search Console was not connected), so "why it fails to rank" cannot be tied to actual positions.
- Google Business Profile, review counts and map-pack presence were not checked. See /seo local.
- Above-the-fold assessment comes from DOM order. Viewport screenshots and mobile layout were not visually checked here.
- Competitor pages could not be fetched (none were identified in results), so content-depth benchmarks use typical ranges for Hungarian service pages.

Cross-skill follow-ups: `/seo local` (GBP and reviews for the map pack), `/seo content` (E-E-A-T, case studies), `/seo schema` (review/NAP), `/seo page` (depth).
Generate a PDF report? Use `/seo google report`.

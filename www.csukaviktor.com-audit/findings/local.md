# Local SEO findings - csukaviktor.com

Business type: service-area business (no storefront). Vertical: professional/IT services (web development). Local SEO score: **58/100**

| Dimension | Weight | Score |
|---|---|---|
| GBP signals | 25 | 8/25 (not verifiable, no on-page link) |
| Reviews & reputation | 20 | 2/20 (none on page or in schema) |
| Local on-page | 20 | 16/20 |
| NAP & citations | 15 | 8/15 |
| Local schema | 10 | 7/10 |
| Local links & authority | 10 | 4/10 |
Note: the dimension sub-scores are approximate and sum to 45. Overall 58 reflects the benefit of the doubt on unverifiable GBP and citation items.

## What works
- ProfessionalService node in JSON-LD (layout.tsx:166-209) with a locality-only PostalAddress (Debrecen, Hajdú-Bihar, HU), areaServed (City, AdministrativeArea, Country), telephone, email, priceRange, OfferCatalog and founder linking to the Person @id. Correct approach for an SAB (no fake street address).
- NAP data comes from one source (lib/site.ts: PHONE, PHONE_DISPLAY, EMAIL). Footer and ContactSection reuse it with tel: links, so phone consistency between footer, contact section and schema is structurally guaranteed.
- Strong local copy on the Hungarian service pages (content-hu.ts): "Debrecenben és Hajdú-Bihar vármegyében" in titles, H1s, meta descriptions and per-service H2 sections. Dedicated service pages (the top local organic factor) exist, each with Service + FAQPage + BreadcrumbList schema and areaServed.
- Person node has sameAs (GitHub, LinkedIn).

## Findings

### High
1. **No evidence of a Google Business Profile.** No GBP/Maps URL, `hasMap`, place ID or review link anywhere in the code or in the sameAs list. GBP primary category is the #1 local ranking factor. Fix: create or claim an SAB profile (hide the address, set the service area to Debrecen and Hajdú-Bihar, primary category "Web designer" or "Website developer", secondary "Software company" or "Internet marketing service"), verify it, then add the share URL to `sameAs` and `hasMap`. I could not confirm via search or Maps whether one exists, so verify manually.
2. **No reviews or ratings anywhere.** No aggregateRating or Review in the schema and no testimonials were found. Fix: collect 5-10 Google reviews from past clients, ask for ongoing reviews, and show real testimonials on the site. Only add aggregateRating if it reflects genuine, visible reviews (otherwise it risks a manual action).
3. **ProfessionalService has no `sameAs`.** sameAs sits only on the Person node, so the business entity has no link to GBP or directories. Fix: add sameAs (GBP, Facebook if any, Cylex, Firmania, etc.) to the `#service` node.

### Medium
4. **Local signal is missing in the visible NAP blocks.** Footer.tsx and ContactSection.tsx show phone and email but no "Debrecen" or service-area line (Debrecen appears only in translations/content, not in those components). Fix: add a visible "Debrecen és Hajdú-Bihar, személyes egyeztetés és online az egész országban" line to the footer and contact section, matching the schema wording exactly.
5. **Schema lacks `geo` and `openingHoursSpecification`.** Fix: add `geo` (GeoCoordinates, 5 decimals, city-centre coordinates are fine for an SAB, never a home address) and opening hours or contact availability. Also add `logo`, `contactPoint` and a `@type` array such as `["ProfessionalService","LocalBusiness"]` if desired.
6. **Citations are unconfirmed and probably absent.** Not verified (no paid tooling). Fix: create consistent listings (identical name, phone, locality) on Cylex.hu, Firmania.hu, Aranyoldalak.hu, Hupont, Yellowpages.hu, Facebook business page, Bing Places, Apple Business Connect, plus industry sources (Clutch, Upwork or Freelancer profile, Cégkapu/e-cegjegyzek style business registers if registered). Add the Google Maps profile link.
7. **Inconsistent entity naming and data.** The business name (`m.serviceName`) differs from the Person name (FULL_NAME), and the EMAIL is a gmail address. Use one exact business name string across GBP, citations, schema and footer. A domain email improves trust. Consider listing the business name verbatim in the footer.
8. **Regional wording mismatch.** The service-page schema uses "Hajdú-Bihar vármegye" and "Magyarország" while the root schema uses "Hajdú-Bihar" and "Hungary". Harmonise (a `@id`-linked areaServed or the same strings).

### Low
9. **Service-page areaServed is attached to Service, not to the business node.** Fine, but `provider` points to the Person, not the `#service` ProfessionalService. Point `provider` at `${SITE_URL}/#service` to tie the local entity to each service.
10. **English locale has no dedicated local service pages** (service pages are hu only). Acceptable given the audience, but English pages carry less local signal.
11. **Local link signals are thin.** Seek links from Debrecen chambers (HBKIK), local business blogs, university or startup communities and client sites ("Készítette: Csuka Viktor") with a Debrecen-relevant anchor.

## Review health
Rating: none found. Count: 0 detected. Velocity: n/a. Response rate: n/a.

## Citation presence (Tier 1 and Hungarian)
Not verified (no live search or DataForSEO). Treat as missing until checked: Google Maps, Bing Places, Apple Business Connect, Facebook, Cylex, Firmania, Arany Oldalak, Yelp (low value in HU).

## GBP checklist
Detected: none on page (no Maps embed, no place link, no review widget). Missing: verified profile, category, service area, photos, posts, Q&A, reviews, `hasMap`/sameAs link. Note: SAB should not embed a Maps pin of a home address.

## NAP audit
| Source | Name | Address | Phone |
|---|---|---|---|
| Footer / Contact (code) | Csuka Viktor | none (OK for SAB) | +36 20 953 9379 |
| JSON-LD ProfessionalService | m.serviceName | Debrecen, Hajdú-Bihar, HU (locality only) | +36209539379 |
| JSON-LD Person | Csuka Viktor | none | +36209539379 |
No phone discrepancy (display vs E.164 only). Web-wide NAP not verifiable.

## Limitations
No live GBP, Maps, citation or local-pack data was available (no DataForSEO). Proximity (about 55% of ranking variance) cannot be influenced by the site. Review and citation conclusions are based on the absence of any on-site reference. Rendered HTML was only spot-checked; analysis is mostly from source code.

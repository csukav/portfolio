# Content Quality findings: www.csukaviktor.com

Re-audit date: 2026-11-02 (previous: 2026-10-28, score 55). Live pages fetched with curl. Source: src/content/content-hu.ts, src/lib/translations.ts, src/lib/blog.ts (HEAD 34425ee "szolg").

## Content Quality: 66/100 (previous 55, +11)

| E-E-A-T factor | Weight | Score | Note |
|---|---|---|---|
| Experience | 20% | 60 | Own webshop run ("üzemeltetek is egyet"), hoodini.hu build documented in the blog post. No case-study numbers. |
| Expertise | 25% | 70 | Service copy is specific and correct (Barion/SimplePay/Számlázz.hu, Google Ads conversion tracking, Proxmox, ownership of ad accounts and domains). |
| Authoritativeness | 25% | 45 | No testimonials, reviews, client logos or external mentions. One linked client project. |
| Trustworthiness | 30% | 62 | Phone, email and LinkedIn now on every page, clear "from" prices. Pulled down by conflicting IT prices and unbacked "10+ satisfied clients" and "24/7" claims. |

Weighted E-E-A-T: about 59/100. AI citation readiness: 68/100 (FAQ blocks with direct answers, prices stated as plain facts, clear H2 question headings; but no dated or sourced statistics and only one blog post).

Templated metadata check (metadata_template.py, 10 pages): site_risk **low**, templated_ratio **0.0**, shared_cta_phrases **none**. Only one low flag: /en/blog description repeats the brand "Csuka Viktor".

Readability: service pages average 9.9-10.6 words per sentence, max 29. Easy to read, conversational second-person ("te") voice, consistent first-person singular.

## Status of previous findings

| # | Previous finding (2026-10-28) | Status | Evidence |
|---|---|---|---|
| 1 | [High] Unverifiable experience claims (10 000+ users React Native post, SaaS post, EN "10,000+ active users") | **FIXED** | Commit 8258b0c removed both posts from blog.ts (-152 lines). /hu/blog and /en/blog now list only the Next.js+Stripe post. "10,000" no longer appears in translations.ts or on /en. |
| 2 | [High] Thin commercial service pages | **PARTIAL (largely fixed)** | Unique body words (H1 to FAQ end, excl. nav/contact/footer): weboldal-keszites 576 (was ~460 incl. chrome), webshop-keszites 560 (was ~355), online-hirdetes 598 (was ~198), it-uzemeltetes 512 (was ~209). Each now has who-it-is-for, process, pricing, local Debrecen section and 6-8 FAQs. Still below the 800-word service-page floor and none has a mini case study. |
| 3 | [High] No social proof or trust signals | **PARTIAL** | Added: phone +36 20 953 9379 (tel: links in header CTA area, contact block, footer, every service page), "hívj" CTA under every H1. Still missing: testimonials, Google reviews, headshot, measurable results. Homepage shows "10+ Elégedett ügyfél" with zero testimonials backing it. |
| 4 | [Medium] Blog targets developers, not buyers; stale | **STILL OPEN (worse in volume)** | Blog is now 1 post (2026-02-10, almost 9 months old, dateModified = datePublished), still developer-focused, still "Next.js 14". The buyer-intent topic list exists only as unused code (`blogIdeasHu` in content-hu.ts:408). |
| 5 | [Medium] Mixed positioning: job-seeker vs service provider | **PARTIAL** | Header CTA is now "Kérj ajánlatot" ("Felveszel?" gone), service pages use consistent "én" voice. But the homepage hero is still portfolio-style ("Szia! Én vagyok a fejlesztőd", skill-percentage bars, "∞ kávé") and the contact text says "...vagy csak egy kávés csevejről". |
| 6 | [Low] Spotify Clone in projects | **STILL OPEN** | Still project #02 on /hu and /en. |

## What works

- Service pages are now real landing pages: specific inclusions, honest comparisons ("Egyedi webshop vagy bérelt webshoprendszer?" admits custom is not always right), ownership answers ("Kié lesz a hirdetési fiók? A tiéd."), clear "from" prices.
- First-hand experience signal on /hu/webshop-keszites: "Nemcsak fejlesztek webshopot, hanem üzemeltetek is egyet".
- Blog post now links to /hu/webshop-keszites in-content and with an end CTA; it cites a real, linked project (hoodini.hu), contains code, and has a visible byline and date.
- No AI-boilerplate markers on service pages: concrete local examples ("vízszerelő Debrecen"), Hungarian-specific vendors, no filler.
- Metadata is hand-written per page, no templating.

## New and remaining findings

### [High] Homepage IT prices contradict the IT service page (NEW)

/hu homepage section "IT üzemeltetési szolgáltatások kkv-knak" shows "Ár: 180 000 Ft-tól", "120 000", "110 000", "90 000", "130 000", "140 000 Ft-tól" (translations.ts:97-133), and the homepage JSON-LD carries the same minPrice 90000-180000. /hu/it-uzemeltetes says "Üzemeltetési csomag 9999 Ft/hó-tól". A visitor, or a quality rater, sees prices that differ by 10-18x for the same service, with no explanation of one-off vs monthly. This is the biggest trust problem on the site now. The EN homepage shows €250-€450 for the same items.

**Fix:** Replace the homepage IT block with the 4 service cards and their prices from `homeHu.services` (19999 / 49999 / 9999 Ft/hó / 9999 Ft/hó). If the 90k-180k projects are real, label them as one-off project prices ("egyszeri projektár, pl. teljes szerver-migráció") on /hu/it-uzemeltetes and keep the schema in sync.

### [High] Unbacked trust claims: "10+ Elégedett ügyfél", "24/7 monitoring" (NEW)

Homepage stats claim 10+ delivered projects and 10+ satisfied clients, yet only one client project (Hoodini) is shown, and the other two showcased projects are personal (Spotify Clone, közös). "24/7 rendszer-monitoring" (translations.ts:117) is a promise a solo freelancer cannot staff. /hu/it-uzemeltetes itself is more careful ("a hibát általában hamar észreveszem"). Claims that cannot be verified or contradict each other lower Trust, which the QRG treats as the most important factor.

**Fix:** Either show the 10 clients (logos, 2-4 named testimonials, Google reviews link) or change the stats to what can be proven. Change "24/7" to "automatikus elérhetőség-figyelés, riasztással".

### [High] No testimonials, reviews or headshot (CARRIED, previously #3)

No page has a client quote, review count or photo of Viktor. For a local service business these are the core Authoritativeness and Trust signals.

**Fix:** Add a testimonials block (name, company, city) to the homepage and each service page, link the Google Business Profile reviews, add a real headshot with a 3-4 sentence "Rólam" bio (years, where based, what kind of clients).

### [Medium] Hoodini reference is thin and unlinked on the webshop page (NEW)

/hu/webshop-keszites "Referencia" section is a single sentence with no hyperlink, no screenshot and no result. The placeholder in `homeHu.references` ("[Eredmény: pl. 20% gyorsabb betöltés / 20-25 rendelés havonta – ha van mérhető adat.]") shows the intent but it was never filled.

**Fix:** Turn it into a mini case study: problem, what was built, 1-2 real numbers (Lighthouse score, load time, monthly orders), screenshot, link to hoodini.hu. Reuse on /hu/weboldal-keszites (which has no reference at all).

### [Medium] Blog: one stale developer post, inaccurate reading time (CARRIED + NEW detail)

1 post total, 9 months old, about 300 words, but labelled "8 perc olvasás" (realistic: 2 minutes). The inflated reading time is a small but visible accuracy error. "Next.js 14" is outdated. The /hu/blog and /en/blog pages are 54-59 words of content.

**Fix:** Publish 2 buyer-intent posts per month from `blogIdeasHu` (800-1500 words each), each linking to its service page; start with "Mennyibe kerül egy weboldal 2026-ban?" (supports /hu/weboldal-keszites) and "Google Ads vagy Facebook hirdetés" (supports /hu/online-hirdetes). Compute reading time from word count. Update the Next.js post (expand to 800+ words, refresh to current Next.js, set dateModified).

### [Medium] Service pages still under the 800-word floor and lack proof (PARTIAL, previously #2)

512-598 unique words each. Topical coverage is decent; what is missing is depth that only Viktor can add: a worked example, a sample price breakdown, a screenshot of a monthly ad report, a before/after speed test.

**Fix:** Add one 150-250 word "Példa" section per page with a real or anonymised project, and a short price-tier table (what 19999 Ft includes vs a typical 5-page site).

### [Low] Homepage hero and copy still portfolio-oriented (PARTIAL, previously #5)

"Szia! Én vagyok a fejlesztőd", skill percentage bars (React 95%, TypeScript 90%), "∞ Kávé elfogyasztva", and "kávés csevej" contact copy speak to recruiters and developers, not small-business buyers. A buyer-oriented version already exists in `homeHu` (content-hu.ts:22-123: Debrecen H1, services with prices, process, "Miért velem dolgozz?", FAQ) but is not imported anywhere.

**Fix:** Wire `homeHu` into src/app/[lang]/page.tsx for the HU homepage; move skills to a lower section or /rolam.

### [Low] Typo in site-wide contact block (NEW)

"együttműközésről" (translations.ts:147) appears on every HU page. Correct: "együttműködésről".

### [Low] Spotify Clone still showcased (CARRIED)

Replace with client work or a demo local-business site.

### [Low] Blog index description lists topics that no longer exist (NEW)

/hu/blog and /en/blog descriptions mention "Supabase, React Native", but the only remaining post covers Next.js, Prisma and Stripe.

**Fix:** Rewrite to describe what the blog will cover for buyers ("weboldal, webshop és online hirdetés tippek kisvállalkozásoknak").

## Structured findings (audit-data.json, Content Quality)

```json
{
  "category": "Content Quality",
  "score": 66,
  "previous_score": 55,
  "eeat": {"experience": 60, "expertise": 70, "authoritativeness": 45, "trustworthiness": 62, "weighted": 59},
  "ai_citation_readiness": 68,
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "word_counts_unique_body": {"/hu/weboldal-keszites": 576, "/hu/webshop-keszites": 560, "/hu/online-hirdetes": 598, "/hu/it-uzemeltetes": 512, "/hu/blog/nextjs-stripe-ecommerce": 307, "/hu": 499},
  "previous_status": {"unverifiable_claims": "FIXED", "thin_service_pages": "PARTIAL", "no_social_proof": "PARTIAL", "blog_stale_dev_focused": "STILL OPEN", "mixed_positioning": "PARTIAL", "spotify_clone": "STILL OPEN"},
  "findings": [
    {"severity": "high", "title": "Homepage IT prices (90 000-180 000 Ft) contradict /hu/it-uzemeltetes (9999 Ft/hó)", "new": true},
    {"severity": "high", "title": "Unbacked claims: 10+ satisfied clients, 24/7 monitoring", "new": true},
    {"severity": "high", "title": "No testimonials, reviews or headshot", "new": false},
    {"severity": "medium", "title": "Hoodini reference unlinked, no results", "new": true},
    {"severity": "medium", "title": "Blog: 1 stale post, 8 min reading time for ~300 words", "new": false},
    {"severity": "medium", "title": "Service pages 512-598 words, no case study", "new": false},
    {"severity": "low", "title": "Homepage portfolio tone; homeHu buyer copy unused", "new": false},
    {"severity": "low", "title": "Typo 'együttműközésről' site-wide", "new": true},
    {"severity": "low", "title": "Spotify Clone showcased", "new": false},
    {"severity": "low", "title": "Blog index description mentions removed topics", "new": true}
  ]
}
```

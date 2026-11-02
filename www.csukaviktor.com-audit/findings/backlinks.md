# Backlink Profile - csukaviktor.com

Tier 0 (Common Crawl + verify crawler only). No Moz, Bing or DataForSEO keys configured.

## Score: INSUFFICIENT DATA (indicative 15-25/100, not a measured score)

Fewer than 4 scoring factors have data. Referring domain count, domain quality, anchors, toxicity, velocity, follow ratio and geo all need Moz, Bing or DataForSEO. No numeric score is claimed. The indicative band is an inference from the site type (new personal freelancer site) and from the known linking assets below. It is not observed data.

## Data collected

| Metric | Result | Source |
|---|---|---|
| Auth tier | 0 | backlinks_auth.py (observed) |
| Common Crawl (release cc-main-2026-jan-feb-mar) | Domain NOT in crawl or rankings (no PageRank/harmonic centrality). Too new/small to be in the graph; expected, not a penalty. | CC (0.50) |
| Referring domains, anchors, spam score | Unavailable (no API keys) | n/a |
| Verified backlinks | None supplied to verify; nothing checked | Verify (0.95) |

Site-side signals observed in source (`src/lib/site.ts`, `src/content/content-hu.ts`), Parsed (0.95):
- Outbound profile links exist to github.com/csukav (GITHUB_URL) and linkedin.com/in/csukaviktor. These are links the site makes. They are not confirmed inbound links.
- The portfolio mentions Hoodini (hoodini.hu). Whether hoodini.hu links back was not verified.

## Findings

| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| 1 | High | Backlink data is blind: no way to measure referring domains or toxicity | Tier 0, no API keys | Register csukaviktor.com in Google Search Console (Links report) and Bing Webmaster Tools (free, owner-verified). Add a free Moz API key. Re-run the audit. |
| 2 | High | Profile is probably very thin (inference, unverified) | New personal site, no external data | Execute the link plan below. Aim for 15-30 genuine referring domains in 6 months. |
| 3 | Medium | Client work link is likely an unclaimed asset | Hoodini is referenced in content; reverse link unverified | Run `verify_backlinks.py --target https://csukaviktor.com --links <file>` on hoodini.hu and other client sites. If missing, add a "Weboldal: Csuka Viktor" footer credit (dofollow, branded anchor). |
| 4 | Medium | Profile links may not point back with a consistent anchor/URL | GitHub and LinkedIn URLs configured in site.ts | Put https://csukaviktor.com in the GitHub profile and repo READMEs, the LinkedIn website field and the Facebook/Instagram bio. Use identical name/URL (NAP) everywhere. |
| 5 | Low | Anchor profile cannot be assessed | No anchor data | Aim for mostly branded ("Csuka Viktor", "csukaviktor.com") and partial-match ("weboldal készítés Csuka Viktor") anchors. Avoid exact-match keyword anchors. |
| 6 | Low | Not present in Common Crawl graph (2026 Q1 release) | in_crawl=false, in_rankings=false | Expected for a small site; recheck after links are earned. |

## Realistic link-building plan (Hungarian freelance web developer)

1. Quick wins (week 1-2, free):
   - Google Business Profile, with the website field filled.
   - GitHub profile and README links, LinkedIn website field, and the Facebook/Instagram bios.
   - Hungarian directories: Aranyoldalak, Firmajelzo/Cylex.hu, Startlap-style catalogues, Opten/Ceginformacio, Webfejlesztő/freelancer listings (Workana, Upwork, Fiverr profile pages). Many are nofollow but add citation consistency.
2. Client credits (week 2-4): add a footer credit "Készítette: Csuka Viktor" linking to csukaviktor.com on hoodini.hu and every past client site. Use a branded anchor, and vary the target between the homepage and the services page.
3. Local and professional (month 1-3): local chamber of commerce (megyei kereskedelmi és iparkamara) member directory, local business networks (BNI, Startup/coworking communities), and co-working or meetup speaker pages.
4. Content-led (month 2-6): publish 1-2 case studies, for example the Hoodini project. Ask clients for a testimonial exchange on their site. Write guest posts or comments on Hungarian dev/marketing blogs. Publish an open-source or small free tool on GitHub that links to the site.
5. Avoid: paid link packages, PBNs and mass directory submissions.

## Next steps
- Retry Common Crawl and check Search Console and Bing Webmaster for real link data.
- Run `/seo technical` and `/seo content` for crawlability and E-E-A-T (not duplicated here).
- Re-run `/seo backlinks` after keys or GSC data exist, to produce a real score.

# Content Quality findings — www.csukaviktor.com

## Content Quality — 55/100

**What works**

- Service pages have clear pricing (19 999 Ft-tól, 49 999 Ft-tól, 9 999 Ft/hó) and FAQ sections - strong intent match
- /hu/weboldal-keszites (~460 words) has a good structure: what's included, pricing, process, local section, FAQ
- One real, verifiable reference project (hoodini.hu webshop)

**Findings**

### [High] Unverifiable experience claims in blog and EN copy

The uncommitted change in src/lib/translations.ts removes the 'Mobile Companion App - 10 000+ active users' and 'SaaS Dashboard' projects from the HU portfolio, but the blog still publishes 'Offline-First architektúra React Native alkalmazásban: 10 000+ felhasználó tanulságai' (src/lib/blog.ts:165-219) and 'Valós idejű Task Manager SaaS' and the EN projects copy still says '10,000+ active users' (translations.ts:233). Experience claims with no matching project are a trust/E-E-A-T risk with both readers and Google's quality raters.

**Fix:** Either back these posts with a real project (link, screenshots, repo) or rewrite/remove them. Sync the EN translations with the HU removal.

### [High] Thin commercial service pages

/hu/online-hirdetes ~198 words and /hu/it-uzemeltetes ~209 words total, of which ~150 are shared nav/footer/contact boilerplate. /hu/webshop-keszites ~355. These pages target competitive commercial keywords (Google Ads kezelés, weboldal üzemeltetés) where ranking pages typically have 800-1500 words.

**Fix:** Expand each to 700+ words of unique content: who it is for, what is included in each price tier, process, a mini case study, 5-8 FAQs, local section (Debrecen).

### [High] No social proof or trust signals

No testimonials, Google reviews, client logos, measurable results, years of experience, phone number or photo. For a local service provider these are the main conversion and E-E-A-T signals.

**Fix:** Add 2-4 client testimonials with names/company, a hoodini.hu case study with numbers, a real headshot, and an 'About' block with experience and credentials.

### [Medium] Blog targets developers, not buyers; blog is stale

3 posts, newest 2026-02-10 (8+ months), all developer case studies (Next.js 14, Supabase, React Native) at ~300 words. The site sells websites to small businesses; none of the posts answer buyer questions. 'Next.js 14' is also dated (site runs Next 16).

**Fix:** Publish buyer-intent articles: 'Mennyibe kerül egy weboldal 2026-ban?', 'Weboldal vs. Facebook oldal kisvállalkozásnak', 'Google Cégprofil beállítása lépésről lépésre', 'Webshop indítás: Shopify vs egyedi'. Link each to the matching service page.

### [Medium] Mixed positioning: job-seeker vs service provider

The header CTA 'Felveszel?' (hire me as an employee) and portfolio framing sit next to 'kkv-knak' agency-style service offers and a 'we' voice in schema/service copy ('Informatikai szolgáltatásunk'). Mixed signals dilute the topical focus and confuse visitors.

**Fix:** Decide the primary audience. If clients: change CTA to 'Kérj ajánlatot', use consistent first-person singular voice, move job-seeking to a secondary /rolam section.

### [Low] Projects section contains a tutorial-style clone

'Spotify Clone' is one of three showcased projects. Clones read as learning projects to business buyers.

**Fix:** Replace with client work or a business-relevant demo (e.g. a sample local business site).

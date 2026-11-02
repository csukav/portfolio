# Performance (CWV) findings - www.csukaviktor.com

Audit date: 2026-11-02. Lab data only (Lighthouse 12.8.2 CLI, simulated mobile throttling and desktop preset). PSI API was rate-limited and there is no CrUX access, so field data is not available.

## Performance (CWV) - 88/100

(Lighthouse mobile /hu: 86, desktop /hu: 100. Mobile scores of the other pages: 83 and 93.)

## Metrics (lab)

| Page | Device | Perf | FCP | LCP | TBT | CLS | JS transfer |
|---|---|---|---|---|---|---|---|
| /hu | mobile | 86 | 1.9 s | 2.8 s (Needs improvement) | 360 ms | 0 | 163 KB |
| /hu | desktop | 100 | 0.5 s | 0.6 s | 30 ms | 0 | 167 KB |
| /hu/weboldal-keszites | mobile | 83 | 1.2 s | 3.1 s (Needs improvement) | 410 ms | 0 | 172 KB |
| /hu/blog/nextjs-stripe-ecommerce | mobile | 93 | 1.1 s | 2.7 s (Needs improvement) | 200 ms | 0 | 160 KB |

- TTFB 20-70 ms (Vercel edge). DOM 348 elements on /hu (180 and 74 on the others).
- TBT is the lab proxy for INP. Mobile TBT of 200-410 ms suggests INP risk on slow phones. Validate in Vercel Speed Insights.
- Lighthouse reports 2-6 long tasks per page on mobile.
- LCP element: H1 on /hu and the blog post; a paragraph (`p.text-[19px]`) on /hu/weboldal-keszites. All are text, no image LCP.
- /hu mobile LCP breakdown: TTFB 87 ms, element render delay about 830 ms. The delay is main-thread and render work after the HTML arrives, not network.
- Third-party requests during load: none. The only non-first-party script is the Vercel Analytics and Speed Insights loader (`/c33eec34de6dd78b/script.js`, `/e07f036302f725c7/script.js`, 7 KB total, proxied first-party). gtag no longer loads before the first interaction.

## Previous issues: before vs now

| # | Previous issue | Status | Before | Now |
|---|---|---|---|---|
| 0 | Lab/field CWV not measured (PSI quota) | PARTIAL | no numbers | Lab numbers via local Lighthouse. Field data still missing. |
| 1 | ~215 KB brotli JS on homepage, incl. particles (INP/TBT risk) | PARTIAL | about 215 KB, 8+ chunks, largest 71 KB | 163 KB transferred (mobile), 10 chunks, largest still 71 KB (`69be39811437728d.js`). Particles are now `next/dynamic` with `ssr:false`, loaded on idle, and skipped on mobile, coarse pointer and reduced-motion (`src/components/ParticlesBackground.tsx`). Section components and the translations module moved off the client bundle. Mobile TBT is still 360 ms. |
| 2 | Google Ads gtag preloaded with high priority | FIXED | `<link rel=preload>` for gtag/js, loaded after hydration | No preload and no `<Script src>`. gtag/js is injected on first pointer, key, touch or scroll event, or 4 s after `load` (`src/app/[lang]/layout.tsx`). Zero third-party requests in the Lighthouse trace. |
| 3 | Project screenshots from api.microlink.io, no dimensions | FIXED | 3 live microlink images | No microlink URL in the HTML. Images are served through `/_next/image` (local JPGs, `w=750&q=75`, 9-55 KB, `sizes` set, `fill` layout so no CLS). |

Other changes in commit 8b53354 (2026-10-28):
- `favicon.ico` shrunk from 1,023,940 to 8,045 bytes.
- The hero `fadeUp` animation no longer fades opacity, so the H1 counts as painted at once (`src/app/globals.css`).
- Radix Separator replaced with a plain div.

## Findings

### [Medium] Mobile LCP 2.7-3.1 s (above the 2.5 s "good" limit), mostly render delay

Evidence: /hu mobile LCP 2.8 s, with about 830 ms element render delay after TTFB 87 ms. FCP is 1.9 s on /hu, so the page is held up by CSS and JS on the simulated 4x CPU slowdown. /hu/weboldal-keszites has LCP 3.1 s on a plain paragraph (FCP is only 1.2 s). The LCP candidate is a text node that is still running the `animate-fade-up` slide (`translateY(30px)` over 0.8 s), and the paragraph is likely painted late.

Fix:
1. Remove the entrance animation from above-the-fold text: `animate-fade-up` in `src/components/HeroSection.tsx`, and the lead paragraph on the service page template `src/app/[lang]/[service]/page.tsx`. Or run it only for non-LCP elements.
2. Check the render-blocking CSS in the Lighthouse report. With Tailwind, a single stylesheet of 10-20 KB is normal. Consider `experimental.inlineCss` in `next.config.ts` to remove the CSS request from the critical path.
3. Check that fonts are not delaying the first paint. Fonts are self-hosted with preload and `font-display: swap` (see `src/app/[lang]/layout.tsx`).

### [Medium] Mobile TBT 200-410 ms (INP proxy) and a 71 KB shared chunk

Evidence: the largest chunk `69be39811437728d.js` (71 KB) is the React and Next runtime, and it is loaded on every page (the blog post still ships 160 KB of JS for a mostly static article). Bootup time is dominated by that chunk plus unattributable work. The Vercel Analytics and Speed Insights scripts add about 7 KB. Particles are no longer the cause on mobile.

Fix:
- `src/app/[lang]/page.tsx` and the `[service]` page still import `SpeedInsights` and `Analytics` statically. Keep them but confirm they load after hydration. They are small.
- Navbar and ContactSection are the remaining client components. Check whether Navbar needs its full client code at load, or whether only the mobile-menu toggle does. Split the contact form (`src/components/ContactSection.tsx`) with `next/dynamic` (it also mounts `ParticlesBackground`).
- Run `ANALYZE=true next build` with `@next/bundle-analyzer` to see what is in the 33 KB chunk `ea80403269d20319.js`.

### [Low] gtag is deferred, so Google Ads conversion tracking may miss very short visits

Evidence: gtag/js loads only on first interaction or 4 s after `load`. Visitors who leave before that never load it (the `dataLayer` queue is lost). This is a tracking tradeoff, not a speed problem, and the Ads tag checker should still find the tag.

Fix: if conversions drop, shorten the timeout to about 2 s in `src/app/[lang]/layout.tsx`.

### [Low] Hero image `hoodini.jpg` is 55 KB at w=750

Evidence: it is the largest image (`/_next/image?url=/projects/hoodini.jpg&w=750&q=75`). It is lazy-loaded and below the fold, so there is no LCP impact. Possible saving: about 20 KB.

Fix: re-export the source as a smaller JPG or add `images.formats: ["image/avif","image/webp"]` in `next.config.ts` (Next serves WebP by default, AVIF only if enabled).

### [Info] No CrUX or PSI field data

Evidence: PSI returned a rate-limit error. Lighthouse simulated throttling is harsher than most real devices. The 75th-percentile field result is probably better than the lab LCP.

Fix: read real LCP, INP and CLS in the Vercel Speed Insights dashboard (already installed), or rerun PSI later.

## Summary

CLS is 0 on all pages, TTFB is under 100 ms, desktop is 100, and no third-party request runs on load. The gtag and microlink issues are fixed, and JS fell from about 215 KB to 163 KB. Remaining work: mobile LCP slightly above 2.5 s and mobile TBT around 200-400 ms.

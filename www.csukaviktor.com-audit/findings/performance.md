# Performance (CWV) findings — www.csukaviktor.com

## Performance (CWV) — 80/100

**What works**

- Static prerendered HTML from Vercel edge (TTFB ~115 ms warm, ~1.1 s cold)
- LCP element is text (H1), fonts are self-hosted woff2 with preload
- Project images lazy-loaded; Vercel Speed Insights installed for field data

**Findings**

### [Info] Lab/field CWV not measured (PSI quota exhausted)

PageSpeed Insights API returned a daily-quota error. Score is an estimate from resource analysis.

**Fix:** Check the Vercel Speed Insights dashboard (already installed) for real LCP/INP/CLS, or rerun PSI tomorrow.

### [Medium] ~215 KB (brotli) JavaScript on the homepage, incl. particle animation

8+ JS chunks totalling ~215 KB compressed; largest 71 KB. @tsparticles runs a canvas animation behind the hero, which costs main-thread time on low-end phones (INP/TBT risk).

**Fix:** Load the particles component with next/dynamic { ssr: false } after idle, and skip it on mobile/prefers-reduced-motion.

### [Low] Google Ads gtag preloaded with high priority

<link rel=preload as=script href=googletagmanager.com/gtag/js?id=AW-...> competes with critical resources during initial load.

**Fix:** Load via next/script strategy='afterInteractive' or 'lazyOnload' without a preload.

### [Low] Project screenshots generated live by a third-party API

Three project images are fetched from api.microlink.io at view time (live screenshot rendering) with no width/height attributes - slow, uncacheable by you, and dependent on an external service.

**Fix:** Save the screenshots as local WebP/AVIF and render with next/image (explicit dimensions).

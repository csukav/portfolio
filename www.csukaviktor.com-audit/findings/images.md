# Images findings — www.csukaviktor.com (re-audit 2026-11-02)

## Images — 82/100

### Previous issues
- [Medium] Almost no first-party imagery (service pages 0 images, no headshot, no client work): **PARTIAL**. Three local project screenshots now exist in /public/projects (hoodini.jpg, spotify-clone.jpg, kozos.jpg) and are served through next/image on /hu. Still no headshot or photo of you, and /hu/weboldal-keszites still has 0 `<img>` elements.

**What works**
- 3 project screenshots, local first-party files, rendered with next/image (`fill`, `sizes`, auto AVIF/WebP via /_next/image, srcset 384/640w+, lazy, async decode).
- Descriptive, keyword-relevant, localized alt text (hu and en variants in translations).
- Parent containers have fixed heights (h-48/h-56 and so on), so no CLS.
- og-image.jpg (38 KB) present.
- Below-the-fold placement, so lazy loading is right and LCP is text, not an image.

**Findings**

### [Medium] No headshot / personal photo
Evidence: no person image in the source or the rendered HTML; the hero is text only. For a freelance site, trust and E-E-A-T signals are weaker, and a Person image is missing from the schema.
Fix: add a WebP headshot (about 600x600) in the About section with next/image, `priority` only if above the fold, alt "Csuka Viktor, webfejlesztő Debrecenben", and reference it in the Person JSON-LD `image`.

### [Medium] Service page /hu/weboldal-keszites has zero images
Evidence: curl returns no `<img>`.
Fix: reuse the project screenshots (or device mockups) as proof of work with descriptive alt text; this also supports image search.

### [Low] Oversized source files
Evidence: hoodini.jpg 490 KB, kozos.jpg 203 KB. The optimizer serves smaller AVIF/WebP, but the repo and the first uncached optimization are heavier than needed.
Fix: pre-compress or convert to WebP at about 1280px wide (target under 120 KB each).

### [Low] `fill` images have no intrinsic width/height
Evidence: `<Image fill>` in src/components/ProjectsSection.tsx line 68. CLS is safe because of the fixed-height wrappers, but there are no explicit dimensions.
Fix: optional; use width/height with aspect-ratio classes.

### [Low] Generic OG image
Fix: confirm og-image.jpg is 1200x630 and carries your name and brand. Add an og:image:alt.

### [Info] Unused default assets
public/file.svg, globe.svg, next.svg, vercel.svg, window.svg are create-next-app leftovers. Delete them.

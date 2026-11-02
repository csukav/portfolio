# Agent readiness: www.csukaviktor.com (checked 2026-11-02)

Agent-UX heuristic (0-100, separate from Lighthouse): **100, complete** (page /hu; 747 a11y nodes, 37 interactive, 0 unnamed).
Lighthouse Agentic Browsing: **unavailable** (PSI HTTP 429 daily quota for mobile and desktop; no API key). No X/N reported.
Overall agent-readiness estimate: **78/100** (heuristic judgment: strong baseline, minor form-label gap, optional extras absent).

## What works
- Primary content server-rendered (550 words without JS, no JS shell marker).
- robots.txt 200: `User-agent: *` Allow /, Disallow /api/, Sitemap declared. No AI agent blocked.
- Real 404s (no soft-404).
- Semantic markup: 13 landmarks, real buttons/anchors, 0 div-onclick widgets.

## Access policy lines
- Training crawlers: allowed by default (fall through to `*`); no explicit policy.
- Search crawlers: allowed.
- User-triggered agents: allowed (none blocked). Vendor docs: Claude-User honours robots.txt; ChatGPT-User may not apply; Perplexity-User and Google-Agent generally ignore it.

## Findings
- **P2 Contact form labels not programmatically associated.** Evidence: src/components/ContactSection.tsx lines ~140-175: `<label>` has no `htmlFor`, inputs have no `id`/`aria-label`/`name`; the accessible name currently comes only from placeholder. The heuristic flagged `inputs_without_aria: 2`. Fix: add `id` + `htmlFor` (or `useId`), plus `name` and `autoComplete` (name, email) attributes; keep placeholders as hints only.
- **P2 Error message not announced.** The `{error}` paragraph has no `role="alert"`; success state also lacks `aria-live`. Fix: add `role="alert"` / `aria-live="polite"` so agents and screen readers see the result.
- **P2 Form gets no per-field `autocomplete`/`name`**, which hurts agent form-filling reliability (same file).
- **P3 No Content-Signal** in robots.txt (draft/preference only; Google does not act on it, facts checked 2026-09-23). Optional: add `Content-Signal: search=yes, ai-input=yes, ai-train=no` per group if that is the policy. No named AI groups: acceptable if the policy is uniform.
- **P3 No llms.txt** (404). Lighthouse drops the audit from the fraction when absent; publishing a valid one (H1, `>` summary, Markdown links to /hu, /hu/weboldal-keszites, contact) adds a counted pass. Google Search ignores it. Opportunity, not a defect. Could be generated via src/app route handler.
- **P3 No Markdown delivery** (no Accept: text/markdown, no .md sibling, no alternate link). Opportunity.
- **P3 WebMCP absent** (0 registerTool, 1 form unannotated; W3C Community Group draft, not a standard, checked 2026-09-23). Optional: declarative annotations on the contact form.
- **P3 /.well-known discovery files absent** (api-catalog, ai-catalog.json, agent-card.json, oauth, ucp all 404). Not applicable: the site operates no API or agent service. ai-catalog.json is a draft proposal.

## Recommendations
1. Fix form label association, `name`/`autocomplete`, and `role="alert"` (quick win, benefits accessibility too).
2. Re-run Lighthouse Agentic once a PSI API key is configured (`/seo google setup`) to obtain the X/N fraction.
3. Optionally add llms.txt and a Content-Signal line. No ranking, citation or traffic effects are promised.

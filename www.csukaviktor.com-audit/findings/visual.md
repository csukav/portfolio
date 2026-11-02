# Visual / mobile / above-the-fold findings — www.csukaviktor.com (2026-11-02)

## Visual — 80/100

Screenshots: /hu in screenshots/www_csukaviktor_com_{desktop,laptop,tablet,mobile}.png. /hu/weboldal-keszites in screenshots/svc/ (same names).
Limitation: the DOM measurement tooling was unavailable (Playwright is only reachable through the bundled scripts). Tap-target size and horizontal scroll were judged from screenshots and source, not measured.

**What works**
- Hero is clear: one H1 ("Webfejlesztő és IT szolgáltatások kkv-knak."), a sub-line, then two CTAs, all above the fold on desktop (1920x1080) and mobile (375x812).
- Mobile: the primary CTA "Ismerj meg" (filled blue) and the secondary CTA are full-width pills about 55px tall, comfortably above 48px. Hamburger menu is present. The hero text is large and readable.
- Desktop nav has a persistent "Kérj ajánlatot" CTA button.
- No visible horizontal scroll or overlap in any viewport; screenshots look clean.
- Service page: breadcrumb, eyebrow, H1, intro, a prominent "Ingyenes ajánlatkérés" button plus a click-to-call phone number, all above the fold on mobile.

**Findings**

### [Medium] Hero wording and personality dilute the value proposition
Evidence: "kkv-knak" (jargon abbreviation) and "Szia! Én vagyok a fejlesztőd." together with "Teljes körű webfejlesztés és informatikai szolgáltatások" send three overlapping messages. No location (Debrecen) or proof (client count, years) is in the hero.
Fix: use one concrete line, for example "Weboldal készítés vállalkozásoknak Debrecenben", and move the friendly line into the body copy.

### [Medium] Low-contrast text
Evidence: the hero paragraph is light grey on white (about #6e6e73 or lighter, thin weight). The "GÖRGESS" label and the secondary CTA's light blue border are very faint.
Fix: darken body grey to at least #4b4b50 and use weight 400 or heavier. Make sure the label reaches 4.5:1.

### [Low] Desktop hero has a lot of dead space and low-value particles
Evidence: the 1920px hero content sits in the middle with large empty areas. The ParticlesBackground canvas adds visual noise and some JS cost.
Fix: tighten the hero height, or drop or lighten the particles on mobile (the mobile view already omits them).

### [Low] Mobile header gap on the service page
Evidence: the service page mobile screenshot shows about 230px of blank space above the breadcrumb and no visible logo or hamburger. The header may be hidden or fading in at capture time, or the top padding may be excessive.
Fix: confirm the header renders on first paint on /hu/weboldal-keszites, and reduce the top padding.

### [Low] Hero secondary CTA competes on desktop
Evidence: "Ismerj meg" leads to About, not to contact. The conversion CTA is the weaker outline button.
Fix: make the primary hero CTA the contact/quote action ("Kérj ajánlatot"), and keep "Ismerj meg" as the secondary.

### [Info] Small links
The desktop nav links are 14px text with small hit areas (not an issue for mouse input). Check that footer and inline mobile links reach about 44px height.

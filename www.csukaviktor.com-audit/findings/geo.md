# AI Search Readiness findings — www.csukaviktor.com

## AI Search Readiness — 65/100

**What works**

- All content in server HTML - AI crawlers and agents read it without JS
- robots.txt allows all agents; AI user agents get identical responses
- Clear Q&A blocks and pricing on service pages are easy to quote

**Findings**

### [Medium] Little citable, entity-defining content

AI answers for 'weboldal készítés Debrecen' cite pages with concrete facts (prices, timelines, process, reviews). The site has prices but no about/credentials page, no reviews and few third-party mentions of 'Csuka Viktor'.

**Fix:** Add an About page with a clear entity statement (who, where, since when, what), and get listed on Hungarian directories/review sites to build third-party mentions.

### [Low] No llms.txt or explicit AI crawler policy

/llms.txt returns 404; robots.txt has no named groups for GPTBot, ClaudeBot, PerplexityBot, Google-Extended. Not a ranking factor, but cheap to add.

**Fix:** Optionally add /llms.txt summarising services and prices with links to the service pages.

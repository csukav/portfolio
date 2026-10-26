# Schema / Structured Data findings — www.csukaviktor.com

## Schema / Structured Data — 78/100

**What works**

- Valid JSON-LD @graph on every page: WebSite, Person, ProfessionalService with stable @ids
- Service + BreadcrumbList + FAQPage on service pages; BlogPosting + BreadcrumbList on posts; Blog on index
- Person.sameAs links GitHub and LinkedIn; BlogPosting author linked by @id

**Findings**

### [Medium] ProfessionalService lacks local business properties

Service pages target Debrecen/Hajdú-Bihar, but the ProfessionalService node has only areaServed: Hungary - no address (addressLocality Debrecen), telephone, geo, priceRange or openingHours.

**Fix:** Add address (PostalAddress with addressLocality Debrecen, addressRegion Hajdú-Bihar, addressCountry HU - street can be omitted for a service-area business), telephone, priceRange '19 999 Ft - ', and areaServed Debrecen. Add the Google Business Profile URL to sameAs once it exists.

### [Low] Person.image is the OG banner, not a photo

Person.image and ProfessionalService.image both point to og-image.jpg, and BlogPosting.image uses the same banner for every post.

**Fix:** Use a real headshot for Person.image and per-post images for BlogPosting.

### [Low] Service descriptions use plural 'we' voice

OfferCatalog item: 'Informatikai szolgáltatásunk része...' while the site presents one person.

**Fix:** Use consistent first-person singular copy.

### [Info] FAQPage will not produce rich results

Since 2023 Google shows FAQ rich results only for authoritative government/health sites. The markup is harmless and still helps AI engines parse Q&A.

**Fix:** Keep it; just do not expect FAQ snippets in Google.

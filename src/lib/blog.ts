import type { ServiceKey } from "@/content/content-hu";

export interface BlogPost {
  slug: string;
  titleHu: string;
  titleEn: string;
  /** Shorter <title> (the layout appends " | Csuka Viktor"); the H1 stays the full title. */
  seoTitleHu?: string;
  seoTitleEn?: string;
  /** Hungarian service page the post links to at the end (see content-hu.ts). */
  relatedService?: ServiceKey;
  date: string; // ISO
  summaryHu: string;
  summaryEn: string;
  tags: string[];
  readingTimeMin: number;
  contentHu: string; // HTML
  contentEn: string; // HTML
}

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-stripe-ecommerce",
    titleHu:
      "Next.js 14 és Stripe integrálása: Full-Stack E-Commerce tapasztalatok",
    titleEn: "Next.js 14 & Stripe Integration: Full-Stack E-Commerce Lessons",
    seoTitleHu: "Next.js + Stripe webshop: tapasztalatok",
    seoTitleEn: "Next.js & Stripe E-Commerce: Lessons Learned",
    relatedService: "webshop",
    date: "2026-02-10",
    summaryHu:
      "Hogyan építettem fel egy teljes körű webáruházat Next.js App Router, Prisma ORM és Stripe Checkout segítségével — és mit tanultam belőle.",
    summaryEn:
      "How I built a full-stack e-commerce store with Next.js App Router, Prisma ORM and Stripe Checkout — and what I learned along the way.",
    tags: ["Next.js", "Stripe", "Prisma", "TypeScript", "Full-Stack"],
    readingTimeMin: 8,
    contentHu: `
<h2>Miért Next.js és Stripe?</h2>
<p>Amikor elkezdtem a <a href="https://www.hoodini.hu/" target="_blank" rel="noopener noreferrer">Hoodini webshop</a> fejlesztését, az volt a fő szempontom, hogy egy olyan stack-et válasszak, ami production-ready, jól skálázható és fejlesztőbarát egyszerre. A Next.js 14 App Router tökéletes választásnak bizonyult: a Server Components lehetővé teszik, hogy az adatokat szerver oldalon töltsük be (nincs kliens oldali flickering), míg a Client Components ott lépnek be, ahol interaktivitásra van szükség.</p>

<h2>Adatbázis réteg: Prisma + PostgreSQL</h2>
<p>A Prisma ORM-et választottam, mert a type-safe query API drámaian csökkenti a runtime hibák számát. A séma definiálása egyszerű, a migrációk automatizáltak. Egy termék-entitás például így néz ki:</p>
<pre><code>model Product {
  id          String   @id @default(cuid())
  name        String
  price       Int      // fillérekben tárolva
  stock       Int      @default(0)
  createdAt   DateTime @default(now())
  orders      OrderItem[]
}</code></pre>
<p>Az árat mindig egész számban (fillér/cent) tároltam, hogy elkerüljem a lebegőpontos kerekítési hibákat — ez egy kritikus szempont pénzügyeknél.</p>

<h2>Stripe Checkout integráció</h2>
<p>A Stripe Checkout API meglepően egyszerűen integrálható Next.js Route Handler-rel. A fizetési folyamat lépései:</p>
<ol>
  <li>A kliens POST kérést küld a <code>/api/checkout</code> végpontra a kosár tartalommal</li>
  <li>A server-side handler létrehozza a Stripe Session-t</li>
  <li>A kliens átirányul a Stripe hosted payment page-re</li>
  <li>Sikeres fizetés után a <code>/api/webhook</code> endpoint fogadja a <code>checkout.session.completed</code> event-et</li>
  <li>A webhook frissíti az adatbázist és elküldi a visszaigazoló emailt</li>
</ol>
<p>Fontos: a webhook signature validációját soha ne hagyd ki! A <code>stripe.webhooks.constructEvent()</code> megvéd a replay attack-októl.</p>

<h2>Tanulságok</h2>
<p>A legnagyobb meglepetés a caching stratégia volt. A Next.js alapértelmezetten agresszívan cache-el, ami kiválóan hat a statikus oldalakra, viszont a termék-készlet adatoknál problémát okozhat. A megoldás: <code>revalidate: 60</code> beállítása az adatkérő fetch hívásoknál, illetve <code>dynamic = 'force-dynamic'</code> a kosár és a checkout oldalakon.</p>
<p>Összességében a Next.js + Prisma + Stripe kombináció az egyik legjobb stack e-commerce fejlesztéshez — erősen ajánlom mindenkinek, aki komolyabb webshopot épít. Ha neked is egyedi webáruházra van szükséged, nézd meg a <a href="/hu/webshop-keszites">webshop készítés</a> szolgáltatásomat.</p>
    `.trim(),
    contentEn: `
<h2>Why Next.js and Stripe?</h2>
<p>When I started building the <a href="https://www.hoodini.hu/" target="_blank" rel="noopener noreferrer">Hoodini online store</a>, my main goal was to choose a stack that is production-ready, scalable, and developer-friendly at the same time. Next.js 14 App Router turned out to be a perfect fit: Server Components allow loading data on the server side (no client-side flickering), while Client Components step in where interactivity is needed.</p>

<h2>Data Layer: Prisma + PostgreSQL</h2>
<p>I chose Prisma ORM because its type-safe query API dramatically reduces runtime errors. Schema definition is straightforward, and migrations are automated. A product entity looks like this:</p>
<pre><code>model Product {
  id          String   @id @default(cuid())
  name        String
  price       Int      // stored in cents
  stock       Int      @default(0)
  createdAt   DateTime @default(now())
  orders      OrderItem[]
}</code></pre>
<p>I always store prices as integers (cents) to avoid floating-point rounding errors — a critical consideration for financial data.</p>

<h2>Stripe Checkout Integration</h2>
<p>The Stripe Checkout API integrates surprisingly easily with a Next.js Route Handler. The payment flow steps:</p>
<ol>
  <li>Client sends a POST request to <code>/api/checkout</code> with cart contents</li>
  <li>The server-side handler creates a Stripe Session</li>
  <li>Client is redirected to the Stripe hosted payment page</li>
  <li>After successful payment, the <code>/api/webhook</code> endpoint receives the <code>checkout.session.completed</code> event</li>
  <li>The webhook updates the database and sends a confirmation email</li>
</ol>
<p>Important: never skip webhook signature validation! <code>stripe.webhooks.constructEvent()</code> protects against replay attacks.</p>

<h2>Key Takeaways</h2>
<p>The biggest surprise was the caching strategy. Next.js caches aggressively by default, which is great for static pages but can cause issues with product inventory data. The solution: set <code>revalidate: 60</code> on data-fetching calls, and use <code>dynamic = 'force-dynamic'</code> on cart and checkout pages.</p>
<p>Overall, the Next.js + Prisma + Stripe combination is one of the best stacks for e-commerce development — I highly recommend it to anyone building a serious online store.</p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

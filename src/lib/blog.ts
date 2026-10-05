export interface BlogPost {
  slug: string;
  titleHu: string;
  titleEn: string;
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
    date: "2026-02-10",
    summaryHu:
      "Hogyan építettem fel egy teljes körű webáruházat Next.js App Router, Prisma ORM és Stripe Checkout segítségével — és mit tanultam belőle.",
    summaryEn:
      "How I built a full-stack e-commerce store with Next.js App Router, Prisma ORM and Stripe Checkout — and what I learned along the way.",
    tags: ["Next.js", "Stripe", "Prisma", "TypeScript", "Full-Stack"],
    readingTimeMin: 8,
    contentHu: `
<h2>Miért Next.js és Stripe?</h2>
<p>Amikor elkezdtem az E-Commerce Platform projektet, az volt a fő szempontom, hogy egy olyan stack-et válasszak, ami production-ready, jól skálázható és fejlesztőbarát egyszerre. A Next.js 14 App Router tökéletes választásnak bizonyult: a Server Components lehetővé teszik, hogy az adatokat szerver oldalon töltsük be (nincs kliens oldali flickering), míg a Client Components ott lépnek be, ahol interaktivitásra van szükség.</p>

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
<p>Összességében a Next.js + Prisma + Stripe kombináció az egyik legjobb stack e-commerce fejlesztéshez 2024-ben — erősen ajánlom mindenkinek, aki komolyabb webshopot épít.</p>
    `.trim(),
    contentEn: `
<h2>Why Next.js and Stripe?</h2>
<p>When I started the E-Commerce Platform project, my main goal was to choose a stack that is production-ready, scalable, and developer-friendly at the same time. Next.js 14 App Router turned out to be a perfect fit: Server Components allow loading data on the server side (no client-side flickering), while Client Components step in where interactivity is needed.</p>

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
  {
    slug: "taskflow-react-supabase",
    titleHu: "Valós idejű Task Manager SaaS építése React és Supabase alapokon",
    titleEn: "Building a Real-Time Task Manager SaaS with React & Supabase",
    date: "2026-01-15",
    summaryHu:
      "Egy valós idejű csapatkezelő alkalmazás fejlesztési folyamata: Supabase realtime subscriptions, Row Level Security és optimista UI frissítések.",
    summaryEn:
      "The development journey of a real-time team management app: Supabase realtime subscriptions, Row Level Security, and optimistic UI updates.",
    tags: ["React", "Supabase", "TypeScript", "Real-Time", "SaaS"],
    readingTimeMin: 6,
    contentHu: `
<h2>A Supabase mint Backend-as-a-Service</h2>
<p>A TaskFlow projektnél a Supabase mellett döntöttem, mert egy integrált megoldást kínál: PostgreSQL adatbázis, autentikáció, valós idejű subscriptions és storage egyben. Ez különösen SaaS alkalmazásoknál értékes, ahol gyorsan kell haladni, és nem akarunk külön auth-szerveren, websocket-infrastruktúrán gondolkodni.</p>

<h2>Valós idejű frissítések</h2>
<p>A Supabase Realtime a PostgreSQL logical replication-t használja az adatbázis változások stream-elésére. A kliens oldalon ez így néz ki:</p>
<pre><code>const channel = supabase
  .channel('tasks')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'tasks', filter: \`project_id=eq.\${projectId}\` },
    (payload) => updateLocalState(payload)
  )
  .subscribe();</code></pre>
<p>A filter paraméter kulcsfontosságú: csak az adott projekt változásait kaptuk meg, így nem terheltük feleslegesen a hálózatot.</p>

<h2>Row Level Security (RLS)</h2>
<p>A Supabase egyik legfontosabb biztonsági funkciója a Row Level Security. Ezzel adatbázis szinten szabályozható, hogy melyik felhasználó melyik sorokat láthatja vagy módosíthatja — a kliens oldali szűrés nem elegendő, mert egy rosszindulatú kérés könnyen megkerülheti.</p>
<pre><code>CREATE POLICY "Users can only see their own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id OR project_id IN (
    SELECT project_id FROM project_members WHERE user_id = auth.uid()
  ));</code></pre>

<h2>Optimista UI frissítések</h2>
<p>Nettó UX javulást hoz, ha a felhasználói műveleteket azonnal tükrözzük a felületen, még mielőtt a szerver válaszol. React Query <code>useMutation</code> hookban az <code>onMutate</code> callback-et használtam az optimista frissítéshez, az <code>onError</code>-ban pedig visszaállítottam a korábbi állapotot hiba esetén.</p>

<h2>Összefoglalás</h2>
<p>A Supabase + React kombináció rendkívül produktív SaaS fejlesztéshez. Az RLS megvalósítása igényel némi PostgreSQL ismeretet, de a biztonság szempontjából nem elhagyható lépés. A valós idejű subscriptions-t takarékosan érdemes használni — célzott filter-ekkel, hogy elkerüljük a felesleges adatátvitelt.</p>
    `.trim(),
    contentEn: `
<h2>Supabase as a Backend-as-a-Service</h2>
<p>For the TaskFlow project, I chose Supabase because it offers an integrated solution: PostgreSQL database, authentication, real-time subscriptions, and storage all in one. This is especially valuable for SaaS applications where you need to move fast and don't want to think separately about auth servers or WebSocket infrastructure.</p>

<h2>Real-Time Updates</h2>
<p>Supabase Realtime uses PostgreSQL logical replication to stream database changes. On the client side, it looks like this:</p>
<pre><code>const channel = supabase
  .channel('tasks')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'tasks', filter: \`project_id=eq.\${projectId}\` },
    (payload) => updateLocalState(payload)
  )
  .subscribe();</code></pre>
<p>The filter parameter is crucial: we only receive changes for the given project, avoiding unnecessary network load.</p>

<h2>Row Level Security (RLS)</h2>
<p>One of the most important security features of Supabase is Row Level Security. This allows you to control at the database level which user can see or modify which rows — client-side filtering is not sufficient, as a malicious request can easily bypass it.</p>
<pre><code>CREATE POLICY "Users can only see their own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id OR project_id IN (
    SELECT project_id FROM project_members WHERE user_id = auth.uid()
  ));</code></pre>

<h2>Optimistic UI Updates</h2>
<p>A net UX improvement comes from immediately reflecting user actions in the UI before the server responds. I used React Query's <code>useMutation</code> hook with the <code>onMutate</code> callback for optimistic updates, and rolled back to the previous state in <code>onError</code> on failure.</p>

<h2>Summary</h2>
<p>The Supabase + React combination is extremely productive for SaaS development. Implementing RLS requires some PostgreSQL knowledge, but it's a non-negotiable step for security. Use real-time subscriptions sparingly — with targeted filters to avoid unnecessary data transfer.</p>
    `.trim(),
  },
  {
    slug: "offline-first-react-native",
    titleHu:
      "Offline-First architektúra React Native alkalmazásban: 10 000+ felhasználó tanulságai",
    titleEn:
      "Offline-First Architecture in React Native: Lessons from 10,000+ Users",
    date: "2025-12-05",
    summaryHu:
      "Hogyan terveztem meg egy megbízható offline-first mobil alkalmazást Redux, SQLite és szinkronizációs stratégiák segítségével — és mit jelent ez a valóságban.",
    summaryEn:
      "How I designed a reliable offline-first mobile app with Redux, SQLite, and sync strategies — and what that means in practice.",
    tags: ["React Native", "Expo", "SQLite", "Redux", "Offline-First"],
    readingTimeMin: 7,
    contentHu: `
<h2>Miért offline-first?</h2>
<p>Az ügyfelünk egy mezőgazdasági területen dolgozó csapatnak fejlesztett appot, ahol mobilinternet egyáltalán nem megbízható. Az "online-first" megközelítés — ahol az alkalmazás API hívásokra vár — ebben a környezetben elfogadhatatlan. Az offline-first azt jelenti: az alkalmazás elsődlegesen a lokális adatbázisból dolgozik, és a szinkronizáció háttérben történik, amikor elérhető a kapcsolat.</p>

<h2>Lokális adatbázis: SQLite Expo-val</h2>
<p>Az Expo SQLite csomagja egy teljes értékű relációs adatbázist biztosít a mobileszközön. Az adatmodell megőrzi az összes szükséges entitást — rekordok, képek metaadatai, szinkronizációs státusz. Minden rekordhoz tároltam egy <code>syncStatus</code> mezőt (<code>'pending' | 'synced' | 'conflict'</code>), ami nyomon követi, mit kell még feltölteni.</p>

<h2>Redux mint állapot réteg</h2>
<p>A Redux Toolkit + Redux Persist páros biztosítja, hogy az alkalmazás állapota eszközök újraindítása után is megmarad. A slice-ok a lokális SQLite adatbázisból dolgoznak, nem közvetlenül az API-tól. Az <code>extraReducers</code>-ben kezelem a szinkronizációs thunk-ok eredményét.</p>

<h2>Szinkronizációs stratégia</h2>
<p>A szinkronizáció három esetben indul el:</p>
<ul>
  <li>Alkalmazás előtérbe kerülésekor (<code>AppState</code> listener)</li>
  <li>Hálózati kapcsolat visszaállásakor (<code>NetInfo</code> event)</li>
  <li>Háttérfeladatként (<code>expo-background-fetch</code>), 15 percenként</li>
</ul>
<p>Konfliktus esetén — amikor ugyanazt a rekordot offline módban módosítottuk, miközben a szerveren is változott — egy "last-write-wins" stratégiát alkalmaztam timestamp alapján, de kritikus adatoknál manuális konfliktusfeloldó UI-t mutattam a felhasználónak.</p>

<h2>Teljesítmény 10 000+ felhasználónál</h2>
<p>A legnagyobb tanulság: az SQLite lekérdezések optimalizálása elengedhetetlen. Index nélküli JOIN-ok ezernél több rekordnál érzékelhető lassulást okoznak. A <code>EXPLAIN QUERY PLAN</code> parancs nagy segítség volt a szűk keresztmetszetek azonosításában. Emellett a képeket nem az adatbázisban tároltuk, hanem a fájlrendszeren, az adatbázisban csak az elérési utat.</p>

<h2>Összefoglalás</h2>
<p>Az offline-first fejlesztés komplex, de megéri: az alkalmazás megbízhatóan működik ott is, ahol az internet luxusnak számít. A kulcs: robusztus lokális séma tervezése, precíz szinkronizációs logika, és a konfliktuskezelés előre átgondolva.</p>
    `.trim(),
    contentEn: `
<h2>Why Offline-First?</h2>
<p>Our client was building an app for a team working in agricultural areas where mobile internet is completely unreliable. The "online-first" approach — where the app waits for API calls — is unacceptable in this environment. Offline-first means: the app primarily works from a local database, and synchronization happens in the background when a connection is available.</p>

<h2>Local Database: SQLite with Expo</h2>
<p>The Expo SQLite package provides a full-featured relational database on the mobile device. The data model retains all necessary entities — records, image metadata, sync status. For each record, I stored a <code>syncStatus</code> field (<code>'pending' | 'synced' | 'conflict'</code>) to track what still needs to be uploaded.</p>

<h2>Redux as State Layer</h2>
<p>Redux Toolkit + Redux Persist ensures that the app state persists across device restarts. Slices work from the local SQLite database, not directly from the API. I handle sync thunk results in <code>extraReducers</code>.</p>

<h2>Synchronization Strategy</h2>
<p>Synchronization triggers in three cases:</p>
<ul>
  <li>When the app comes to the foreground (<code>AppState</code> listener)</li>
  <li>When network connection is restored (<code>NetInfo</code> event)</li>
  <li>As a background task (<code>expo-background-fetch</code>), every 15 minutes</li>
</ul>
<p>For conflicts — when the same record was modified offline while also changed on the server — I applied a "last-write-wins" strategy based on timestamps, but for critical data I showed the user a manual conflict resolution UI.</p>

<h2>Performance with 10,000+ Users</h2>
<p>The biggest lesson: optimizing SQLite queries is essential. JOIN operations without indexes cause noticeable slowdowns with more than a thousand records. The <code>EXPLAIN QUERY PLAN</code> command was very helpful in identifying bottlenecks. Additionally, we didn't store images in the database but on the filesystem, keeping only the path in the database.</p>

<h2>Summary</h2>
<p>Offline-first development is complex but worth it: the app works reliably even where internet is a luxury. The key: robust local schema design, precise sync logic, and conflict handling thought through in advance.</p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

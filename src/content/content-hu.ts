// content-hu.ts – magyar oldalszövegek (pl. src/content/content-hu.ts)
//
// [ÁR] és [X] helyére írd be a valós számokat. Csak igaz állítás maradjon bent:
// a Google és az ügyfél is a hitelességet díjazza.
// A régió (Debrecen / Hajdú-Bihar) cserélhető, de MINDENHOL ugyanaz legyen,
// a Google Cégprofilban is.

export type Faq = { q: string; a: string };
export type PageContent = {
  slug: string;
  title: string;        // <title>, ~50–60 karakter
  description: string;  // meta description, ~140–160 karakter
  h1: string;
  intro: string;
  sections: { h2: string; body: string; bullets?: string[] }[];
  faq: Faq[];
  cta: { text: string; button: string };
};

// ───────────────────────── FŐOLDAL ─────────────────────────
export const homeHu = {
  title: "Weboldal és webshop készítés Debrecenben | Csuka Viktor",
  description:
    "Gyors, mobilbarát weboldalak és webshopok kis- és középvállalkozásoknak Debrecenben és Hajdú-Biharban. Hirdetéskezelés és üzemeltetés is. Kérj ajánlatot!",
  eyebrow: "Webfejlesztő • Debrecen és Hajdú-Bihar",
  h1: "Weboldal és webshop készítés vállalkozásoknak Debrecenben és környékén",
  intro:
    "Olyan weboldalt készítek, ami nemcsak jól néz ki, hanem ügyfelet is hoz: gyorsan betölt mobilon, megtalálható a Google-ben, és világosan elmondja, miért téged válasszanak. Egy emberrel beszélsz végig – az első egyeztetéstől az átadás utáni támogatásig.",
  primaryCta: "Kérj ingyenes ajánlatot",
  secondaryCta: "Nézd meg a munkáimat",

  services: {
    h2: "Szolgáltatások",
    items: [
      {
        route: "webdev",
        h3: "Weboldal készítés",
        text: "Bemutatkozó oldal vállalkozásoknak, amit a Google is megtalál. Mobilbarát, gyors, könnyen frissíthető.",
        price: "[ÁR] Ft-tól",
      },
      {
        route: "webshop",
        h3: "Webshop készítés",
        text: "Online bolt bankkártyás fizetéssel, számlázással és egyszerű termékkezeléssel.",
        price: "[ÁR] Ft-tól",
      },
      {
        route: "ads",
        h3: "Google és Facebook hirdetések",
        text: "Hirdetések beállítása és kezelése, hogy a weboldalad mielőbb érdeklődőket hozzon.",
        price: "[ÁR] Ft/hó-tól",
      },
      {
        route: "it",
        h3: "Üzemeltetés és karbantartás",
        text: "Tárhely, domain, biztonsági mentés, frissítések – hogy ne neked kelljen ezzel foglalkoznod.",
        price: "[ÁR] Ft/hó-tól",
      },
    ],
  },

  references: {
    h2: "Referenciák",
    intro: "Néhány projekt, amin dolgoztam – rövid leírással, hogy mi volt a cél és mi lett az eredmény.",
    // Csak valós projekt kerüljön ide, működő linkkel.
    items: [
      {
        name: "Hoodini – streetwear webshop",
        url: "https://www.hoodini.hu/",
        text: "Teljes webshop fejlesztés Next.js-sel, online fizetéssel és saját admin felülettel. [Eredmény: pl. X% gyorsabb betöltés / Y rendelés havonta – ha van mérhető adat.]",
      },
    ],
  },

  process: {
    h2: "Így dolgozom",
    steps: [
      { h3: "1. Egyeztetés", text: "Megbeszéljük, mit szeretnél elérni, kik az ügyfeleid, és mire van szükséged. Ingyenes." },
      { h3: "2. Ajánlat", text: "Fix árajánlatot és határidőt kapsz, rejtett költségek nélkül." },
      { h3: "3. Tervezés és fejlesztés", text: "Menet közben látod, hogyan halad az oldal, és bármikor jelezhetsz." },
      { h3: "4. Átadás és támogatás", text: "Megmutatom, hogyan frissítheted, és az átadás után is elérsz, ha kérdésed van." },
    ],
  },

  why: {
    h2: "Miért velem dolgozz?",
    bullets: [
      "Egy kapcsolattartó: azzal beszélsz, aki az oldalt építi",
      "Gyors, modern technológia – jobb helyezés a Google-ben, kevesebb lemorzsolódó látogató",
      "Webshop-üzemeltetési tapasztalat: saját webáruházat is működtetek",
      "Helyi vagyok: személyesen is találkozhatunk Debrecenben és környékén",
    ],
  },

  faq: [
    {
      q: "Mennyibe kerül egy weboldal?",
      a: "Egy bemutatkozó weboldal [ÁR] Ft-tól, egy webshop [ÁR] Ft-tól készül. A pontos ár az oldalak számától és a funkcióktól függ – az első egyeztetés után fix ajánlatot adok.",
    },
    {
      q: "Mennyi idő alatt készül el?",
      a: "Egy bemutatkozó oldal általában [X] hét, egy webshop [X] hét alatt készül el, attól függően, mikor állnak rendelkezésre a szövegek és képek.",
    },
    {
      q: "Személyesen is találkozhatunk?",
      a: "Igen, Debrecenben és Hajdú-Bihar vármegyében szívesen egyeztetek személyesen is, máshonnan online.",
    },
    {
      q: "Én is tudom majd szerkeszteni az oldalt?",
      a: "Igen. Ha szeretnéd, olyan felületet kapsz, amin a szövegeket, képeket és termékeket magad is frissítheted, és megmutatom a használatát.",
    },
    {
      q: "Segítesz abban, hogy megtaláljanak a Google-ben?",
      a: "Igen. Minden oldalt keresőoptimalizáltan adok át, és segítek beállítani a Google Cégprofilt és a Search Console-t is.",
    },
  ] as Faq[],

  contact: {
    h2: "Kérj ingyenes ajánlatot",
    text: "Írd meg röviden, milyen oldalt szeretnél – 1 munkanapon belül válaszolok.",
  },
};

// ─────────────────── SZOLGÁLTATÁSOLDALAK ───────────────────
export const pagesHu: Record<"webdev" | "webshop" | "ads" | "it", PageContent> = {
  webdev: {
    slug: "/weboldal-keszites",
    title: "Weboldal készítés Debrecenben, vállalkozásoknak | Csuka Viktor",
    description:
      "Egyedi, mobilbarát weboldal készítés kis- és középvállalkozásoknak Debrecenben és Hajdú-Biharban. Gyors betöltés, Google-optimalizálás, fix ár. Kérj ajánlatot!",
    h1: "Weboldal készítés vállalkozásoknak Debrecenben",
    intro:
      "A weboldal sokszor az első benyomás, amit egy leendő ügyfél kap rólad. Olyan oldalt készítek, ami gyorsan betölt telefonon, megtalálható a Google-ben, és egyértelművé teszi, mit kínálsz és hogyan érnek el.",
    sections: [
      {
        h2: "Mit tartalmaz a weboldal?",
        body: "Minden weboldal alapból tartalmazza, ami egy vállalkozásnak kell:",
        bullets: [
          "Egyedi design, sablonok nélkül",
          "Mobilra és tabletre optimalizált megjelenés",
          "Keresőoptimalizálás (SEO) alapbeállítások",
          "Kapcsolatfelvételi űrlap és kattintható telefonszám",
          "Google Térkép, Google Cégprofil összekötés",
          "SSL tanúsítvány (https), GDPR-kompatibilis adatkezelés",
          "Mérés beállítása (Google Analytics / Search Console)",
        ],
      },
      {
        h2: "Kinek ajánlom?",
        body: "Helyi vállalkozásoknak – szolgáltatóknak, kereskedőknek, vendéglátóhelyeknek, szakembereknek –, akiknek még nincs weboldaluk, vagy a mostani elavult, lassú, és nem hoz érdeklődőt.",
      },
      {
        h2: "Árak",
        body: "Bemutatkozó weboldal [ÁR] Ft-tól. Az első egyeztetés ingyenes, utána fix árajánlatot kapsz, rejtett költségek nélkül.",
      },
    ],
    faq: [
      { q: "Mi kell tőlem a weboldalhoz?", a: "A logód, néhány fotó és a szolgáltatásaid leírása. Ha nincs kész szöveged, segítek megírni." },
      { q: "Ki fizeti a domaint és a tárhelyet?", a: "A domain a te nevedre kerül. A tárhely és a karbantartás havidíjas csomagban is kérhető tőlem." },
      { q: "A régi oldalamat át tudod alakítani?", a: "Igen, a meglévő tartalmat átköltöztetem, és beállítom az átirányításokat, hogy a Google-helyezésed ne vesszen el." },
    ],
    cta: { text: "Beszéljük meg, milyen weboldal kell a vállalkozásodnak.", button: "Ingyenes ajánlatkérés" },
  },

  webshop: {
    slug: "/webshop-keszites",
    title: "Webshop készítés kis- és középvállalkozásoknak | Csuka Viktor",
    description:
      "Gyors, biztonságos webshop készítés bankkártyás fizetéssel, számlázással és könnyű termékkezeléssel. Debrecen és Hajdú-Bihar. Kérj ajánlatot!",
    h1: "Webshop készítés kis- és középvállalkozásoknak",
    intro:
      "Nemcsak fejlesztek webshopot, hanem üzemeltetek is egyet – ezért tudom, mi kell ahhoz, hogy a látogatóból vásárló legyen: gyors oldal, egyszerű kosár, megbízható fizetés.",
    sections: [
      {
        h2: "Mit tud a webshop?",
        body: "",
        bullets: [
          "Bankkártyás fizetés (pl. Stripe, Barion, SimplePay) és utánvét",
          "Automatikus számlázás (pl. Számlázz.hu, Billingo)",
          "Futárszolgálat és csomagautomata integráció",
          "Egyszerű termék- és készletkezelés",
          "Kuponok, akciók, kosárelhagyó e-mailek",
          "Google Shopping és Facebook katalógus feed",
        ],
      },
      {
        h2: "Miért gyors webshop?",
        body: "A lassú webshop pénzbe kerül: minden plusz másodperc betöltési idő elveszített vásárlókat jelent. Modern technológiával építek, hogy az oldal mobilon is azonnal betöltsön.",
      },
      {
        h2: "Referencia",
        body: "Hoodini – streetwear webshop (hoodini.hu): teljes fejlesztés online fizetéssel és saját admin felülettel.",
      },
      {
        h2: "Árak",
        body: "Webshop [ÁR] Ft-tól. A pontos ár a termékek számától és a szükséges integrációktól függ.",
      },
    ],
    faq: [
      { q: "Hány termékkel indulhat a webshop?", a: "Akár néhány termékkel is. A rendszer később több ezer termékig bővíthető." },
      { q: "Tudom magam feltölteni a termékeket?", a: "Igen, egyszerű admin felületen te kezeled a termékeket, árakat és rendeléseket." },
      { q: "Segítesz a forgalom beindításában is?", a: "Igen, Google és Facebook hirdetések beállításában és kezelésében is tudok segíteni." },
    ],
    cta: { text: "Indítsd el a webshopodat – kérj ajánlatot.", button: "Webshop ajánlatkérés" },
  },

  ads: {
    slug: "/online-hirdetes",
    title: "Google és Facebook hirdetéskezelés | Csuka Viktor",
    description:
      "Google Ads és Facebook/Instagram hirdetések beállítása és kezelése helyi vállalkozásoknak. Átlátható riportok, mérhető eredmények. Kérj ajánlatot!",
    h1: "Google és Facebook hirdetéskezelés helyi vállalkozásoknak",
    intro:
      "A jó weboldal akkor hoz ügyfelet, ha látják. Hirdetésekkel már az első naptól megjelenhetsz azoknál, akik éppen a szolgáltatásodat keresik a környéken.",
    sections: [
      {
        h2: "Mit csinálok?",
        body: "",
        bullets: [
          "Hirdetési fiókok és konverziómérés beállítása",
          "Kulcsszó- és célcsoport-kutatás",
          "Hirdetésszövegek és kreatívok elkészítése",
          "Folyamatos optimalizálás a költségkeret alapján",
          "Havi riport közérthető nyelven",
        ],
      },
      {
        h2: "Árak",
        body: "Hirdetéskezelés [ÁR] Ft/hó-tól + a hirdetési keret, amit közvetlenül a Google-nek / Metának fizetsz.",
      },
    ],
    faq: [
      { q: "Mekkora hirdetési keret kell?", a: "Helyi vállalkozásnál már havi [ÁR] Ft-ból is lehet érdemben indulni. A keretet közösen határozzuk meg." },
      { q: "Mikor jönnek az első eredmények?", a: "A hirdetések pár napon belül futnak. Az optimalizáláshoz általában néhány hét adatgyűjtés kell." },
    ],
    cta: { text: "Nézzük meg, hogyan hozhatnál több érdeklődőt.", button: "Ingyenes konzultáció" },
  },

  it: {
    slug: "/it-uzemeltetes",
    title: "Weboldal üzemeltetés és IT támogatás | Csuka Viktor",
    description:
      "Tárhely, domain, biztonsági mentés, frissítések és szerverüzemeltetés kis- és középvállalkozásoknak. Megbízható IT támogatás havidíjas csomagban.",
    h1: "Weboldal üzemeltetés és IT támogatás vállalkozásoknak",
    intro:
      "Hogy a weboldalad és a rendszereid mindig működjenek – és ne neked kelljen tárhellyel, frissítésekkel és mentésekkel foglalkoznod.",
    sections: [
      {
        h2: "Szolgáltatások",
        body: "",
        bullets: [
          "Tárhely és domain kezelés",
          "Rendszeres biztonsági mentés és visszaállítás",
          "Frissítések, biztonsági javítások, SSL tanúsítvány",
          "Folyamatos felügyelet és hibaelhárítás",
          "Szerver- és felhőüzemeltetés (AWS, Azure, Vercel, Proxmox)",
          "Adatbázis-kezelés és teljesítményoptimalizálás",
        ],
      },
      {
        h2: "Árak",
        body: "Üzemeltetési csomag [ÁR] Ft/hó-tól. Egyedi infrastruktúrához egyedi ajánlatot adok.",
      },
    ],
    faq: [
      { q: "Más által készített oldalt is üzemeltetsz?", a: "Igen, átvizsgálás után átveszem a meglévő oldal üzemeltetését is." },
      { q: "Mi történik, ha leáll az oldal?", a: "A felügyelet riaszt, és munkaidőben [X] órán belül megkezdem a hibaelhárítást." },
    ],
    cta: { text: "Bízd rám a technikát, te foglalkozz a vállalkozásoddal.", button: "Ajánlatkérés" },
  },
};

// ─────────────────── BLOGTÉMÁK (magyarul) ───────────────────
// Ezekre keresnek a leendő ügyfelek. Havonta 1–2 cikk is elég, 800–1500 szóval.
export const blogIdeasHu = [
  "Mennyibe kerül egy weboldal 2026-ban? Árak és mitől függenek",
  "Weboldal vagy Facebook-oldal: mire van szüksége egy kis vállalkozásnak?",
  "Google Cégprofil beállítása lépésről lépésre",
  "Webshop indítása: mire figyelj az első 30 napban?",
  "Barion, SimplePay vagy Stripe – melyik fizetési rendszert válaszd?",
  "Miért lassú a weboldalam, és mennyi vásárlót veszítek emiatt?",
  "Hogyan kerülj fel a Google első oldalára helyi keresésekben?",
  "Google Ads vagy Facebook hirdetés – melyik éri meg jobban helyi vállalkozásnak?",
];
export type Locale = "hu" | "en";

export const translations = {
  hu: {
    nav: {
      about: "Rólam",
      projects: "Projektek",
      skills: "Képességek",
      contact: "Kapcsolat",
      cta: "Felveszel?",
      menuLabel: "Menü",
      blog: "Blog",
    },
    hero: {
      badge: "Teljes körű webfejlesztés és informatikai szolgáltatások",
      title1: "Webfejlesztő és IT szolgáltatások",
      title2: "kkv-knak.",
      headline1: "Szia! Én vagyok",
      headline2: "a fejlesztőd.",
      subheadline:
        "Szenvedéllyel készítek letisztult, gyors és intuitív webes élményeket — az ötlettől a kész projektekig.",
      cta1: "Ismerj meg",
      cta2: "Kezdjünk el együtt →",
      scroll: "Görgess",
    },
    about: {
      label: "Rólam",
      headline: "Szenvedéllyel, precizitással.",
      subheadline:
        "Full-stack fejlesztőként hiszek abban, hogy a legjobb szoftver ott születik, ahol a technikai kiválóság találkozik az esztétikai érzékenységgel.",
      body: "React, Next.js, TypeScript és Node.js eszközökkel dolgozom nap mint nap. Szeretem a tiszta kódot, az átgondolt UI-t és az olyan megoldásokat, amelyek valóban megoldanak egy problémát — nem csak komplikálják azt.",
      stats: [
        { value: "2+", label: "Év tapasztalat" },
        { value: "10+", label: "Projekt leszállítva" },
        { value: "10+", label: "Elégedett ügyfél" },
        { value: "∞", label: "Kávé elfogyasztva" },
      ],
      values: [
        {
          icon: "◈",
          title: "Tiszta kód",
          desc: "Olvasható, karbantartható és jól dokumentált. A kódom holnap is érthető legyen.",
        },
        {
          icon: "◎",
          title: "Teljesítmény",
          desc: "Milliszekundumok számítanak. Minden projektet optimalizálva szállítok.",
        },
        {
          icon: "◉",
          title: "Részletek",
          desc: "Az ördög a részletekben lakik — és a kiváló felhasználói élmény is.",
        },
      ],
    },
    projects: {
      label: "Projektek",
      headline: "Webfejlesztési projektek, amikre büszke vagyok.",
      subheadline: "Válogatott projektek az elmúlt évekből.",
      items: [
        {
          description:
            "Teljes körű webáruház Next.js, Stripe és Prisma alapokon. Adminisztrációs felület, termékkezelés, analitika.",
          alt: "Hoodini webshop – Next.js e-commerce admin felület",
        },
        {
          description:
            "Zenelejátszó webalkalmazás Next.js és Supabase alapokon: bejelentkezés, saját dalok feltöltése, kedvencek és Stripe-os prémium előfizetés.",
          alt: "Spotify Clone – Next.js és Supabase zenelejátszó webalkalmazás",
        },
        {
          description:
            "Közösségi eseményplatform: kis létszámú gasztro-, workshop-, kulturális és sportprogramok böngészése kategóriák szerint, regisztráció és saját esemény szervezése.",
          alt: "közös – közösségi eseményplatform Next.js alapokon",
        },
      ],
    },
    skills: {
      label: "Képességek",
      headline1: "A technológiai",
      headline2: "eszköztáram.",
      subheadline:
        "Elsősorban a modern web ökoszisztémában dolgozom, de nem ijedek meg az ismeretlen technológiáktól sem.",
      toolsCategory: "Eszközök & Egyéb",
    },
    services: {
      label: "Szolgáltatások",
      currency: "HUF",
      headline1: "IT üzemeltetési",
      headline2: "szolgáltatások kkv-knak.",
      subheadline:
        "Megbízható informatikai szolgáltatások és rendszergazdai támogatás kis- és középvállalkozásoknak — a szerverüzemeltetéstől a cloud-infrastruktúráig, hogy IT-rendszerei mindig zavartalanul működjenek.",
      items: [
        {
          title: "Szerver- és Cloud-menedzsment",
          desc: "Informatikai szolgáltatásunk része az AWS, Azure és Vercel infrastruktúra kezelése, frissítése és optimalizálása.",
          price: "Ár: 180 000 Ft-tól",
          minPrice: 180_000,
          icon: "☁️",
        },
        {
          title: "Biztonság és adatvédelem",
          desc: "IT biztonsági szolgáltatás: SSL/TLS tanúsítványok, tűzfal konfigurálás, hálózati biztonság és GDPR-kompatibilitás.",
          price: "Ár: 120 000 Ft-tól",
          minPrice: 120_000,
          icon: "🔐",
        },
        {
          title: "Adatbázis-menedzsment",
          desc: "PostgreSQL, MySQL, NoSQL adatbázisok üzemeltetése, biztonsági mentés és optimalizálás — megbízható informatikai háttérrel.",
          price: "Ár: 110 000 Ft-tól",
          minPrice: 110_000,
          icon: "🗄️",
        },
        {
          title: "Monitoring és rendszergazdai támogatás",
          desc: "24/7 rendszer-monitoring, alerting, hibaelhárítás és proaktív karbantartás — folyamatos informatikai támogatás.",
          price: "Ár: 90 000 Ft-tól",
          minPrice: 90_000,
          icon: "📊",
        },
        {
          title: "CI/CD pipeline felállítása",
          desc: "Automatikus deployment, tesztelés és release menedzsment GitHub Actions és GitLab CI-vel.",
          price: "Ár: 130 000 Ft-tól",
          minPrice: 130_000,
          icon: "⚙️",
        },
        {
          title: "Teljesítmény-optimalizálás",
          desc: "Load balancing, caching stratégiák, CDN konfigurálás és alkalmazás-optimalizálás vállalati rendszerekhez.",
          price: "Ár: 140 000 Ft-tól",
          minPrice: 140_000,
          icon: "⚡",
        },
      ],
    },
    blog: {
      headline: "Friss cikkek a blogról.",
      seeAll: "Összes cikk",
    },
    contact: {
      label: "Kapcsolat",
      headline1: "Kezdjük el",
      headline2: "együtt.",
      subheadline:
        "Legyen szó új projektről, együttműközésről vagy csak egy kávés csevejről — szívesen hallom tőled.",
      form: {
        nameLabel: "Neved",
        namePlaceholder: "Kis Péter",
        emailLabel: "Email cím",
        emailPlaceholder: "kis.peter@email.hu",
        messageLabel: "Üzenet",
        messagePlaceholder: "Szia! Szeretnék veled dolgozni...",
        submit: "Üzenet küldése",
        sending: "Küldés...",
        successTitle: "Üzenet elküldve!",
        successBody: "Hamarosan visszajelzek.",
        newMessage: "Új üzenet küldése",
        errorMsg: "Az üzenet küldése sikertelen. Kérlek próbáld újra.",
      },
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      cta: "Hire me?",
      menuLabel: "Menu",
      blog: "Blog",
    },
    hero: {
      badge: "Full-Stack Web Developer",
      title1: "Web Developer & IT Services",
      title2: "for Small Businesses.",
      headline1: "Hi, I'm",
      headline2: "your developer.",
      subheadline:
        "I build clean, fast, and intuitive web experiences with a focus on quality, usability, and meaningful results.",
      cta1: "Get to know me",
      cta2: "Let's start together →",
      scroll: "Scroll",
    },
    about: {
      label: "About",
      headline: "With passion, with precision.",
      subheadline:
        "As a full-stack developer, I believe the best software is born where technical excellence meets aesthetic sensibility.",
      body: "I work with React, Next.js, TypeScript, and Node.js every day. I love clean code, thoughtful UI, and solutions that actually solve a problem — not just complicate it.",
      stats: [
        { value: "2+", label: "Years of experience" },
        { value: "10+", label: "Projects delivered" },
        { value: "10+", label: "Happy clients" },
        { value: "∞", label: "Coffees consumed" },
      ],
      values: [
        {
          icon: "◈",
          title: "Clean Code",
          desc: "Readable, maintainable, and well-structured. My code should still make sense tomorrow.",
        },
        {
          icon: "◎",
          title: "Performance",
          desc: "Milliseconds matter. I deliver every project optimized from the ground up.",
        },
        {
          icon: "◉",
          title: "Details",
          desc: "The devil is in the details — and so is the exceptional user experience.",
        },
      ],
    },
    projects: {
      label: "Projects",
      headline: "Web development projects I am proud of.",
      subheadline: "Selected projects from the past years.",
      items: [
        {
          description:
            "Full-stack e-commerce store built with Next.js, Stripe, and Prisma. Admin panel, product management, analytics.",
          alt: "Hoodini web shop – Next.js e-commerce admin panel",
        },
        {
          description:
            "Music streaming web app built with Next.js and Supabase: authentication, song uploads, liked songs and a Stripe premium subscription.",
          alt: "Spotify Clone – Next.js and Supabase music streaming web app",
        },
        {
          description:
            "Community event platform for Budapest: browse small food, workshop, culture and sports events by category, sign up, and organize your own gatherings.",
          alt: "közös – Budapest community event platform built with Next.js",
        },
      ],
    },
    skills: {
      label: "Skills",
      headline1: "My technology",
      headline2: "toolkit.",
      subheadline:
        "I primarily work in the modern web ecosystem, but I am always ready to pick up new technologies.",
      toolsCategory: "Tools & Other",
    },
    services: {
      label: "Services",
      currency: "EUR",
      headline1: "IT operations",
      headline2: "services.",
      subheadline:
        "Reliable IT services and system administration support for small and medium businesses — from server operations to cloud infrastructure, keeping your systems running smoothly.",
      items: [
        {
          title: "Server & Cloud Management",
          desc: "AWS, Azure, and Vercel infrastructure management, updates, and optimization.",
          price: "Price: from €450",
          minPrice: 450,
          icon: "☁️",
        },
        {
          title: "Security & Data Protection",
          desc: "SSL/TLS certificates, firewall configuration, network security, and GDPR compliance.",
          price: "Price: from €350",
          minPrice: 350,
          icon: "🔐",
        },
        {
          title: "Database Management",
          desc: "PostgreSQL, MySQL, NoSQL database operations, backups, and optimization.",
          price: "Price: from €320",
          minPrice: 320,
          icon: "🗄️",
        },
        {
          title: "Monitoring & Support",
          desc: "24/7 system monitoring, alerting, troubleshooting, and proactive maintenance.",
          price: "Price: from €250",
          minPrice: 250,
          icon: "📊",
        },
        {
          title: "CI/CD Pipeline Setup",
          desc: "Automated deployment, testing, and release management with GitHub Actions and GitLab CI.",
          price: "Price: from €400",
          minPrice: 400,
          icon: "⚙️",
        },
        {
          title: "Performance Optimization",
          desc: "Load balancing, caching strategies, CDN configuration, and application optimization.",
          price: "Price: from €380",
          minPrice: 380,
          icon: "⚡",
        },
      ],
    },
    blog: {
      headline: "Latest from the blog.",
      seeAll: "All articles",
    },
    contact: {
      label: "Contact",
      headline1: "Let's start",
      headline2: "together.",
      subheadline:
        "Whether it's a new project, a collaboration, or just a coffee chat — I'd love to hear from you.",
      form: {
        nameLabel: "Your name",
        namePlaceholder: "John Doe",
        emailLabel: "Email address",
        emailPlaceholder: "john.doe@email.com",
        messageLabel: "Message",
        messagePlaceholder: "Hi! I would like to work with you...",
        submit: "Send message",
        sending: "Sending...",
        successTitle: "Message sent!",
        successBody: "I'll get back to you soon.",
        newMessage: "Send a new message",
        errorMsg: "Failed to send the message. Please try again.",
      },
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];

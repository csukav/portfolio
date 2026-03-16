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
    },
    hero: {
      badge: "Teljes körű webfejlesztő",
      headline1: "Kód, amit",
      headline2: "érezni lehet.",
      subheadline:
        "Letisztult, gyors és intuitív digitális élményeket tervezek és fejlesztek — a koncepcióktól a kész termékig.",
      cta1: "Projektjeim",
      cta2: "Lépj kapcsolatba →",
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
      headline: "Munkák, amikre büszke vagyok.",
      subheadline: "Válogatott projektek az elmúlt évekből.",
      items: [
        {
          description:
            "Teljes körű webáruház Next.js, Stripe és Prisma alapokon. Adminisztrációs felület, termékkezelés, analitika.",
        },
        {
          description:
            "Valós idejű adatvizualizáció és csapatkezelési eszközök enterprise ügyfeleknek. 50+ komponens.",
        },
        {
          description:
            "GPT-4 alapú tartalomgeneráló alkalmazás marketing csapatok számára. Sablon-rendszer és exportálás.",
        },
        {
          description:
            "React Native cross-platform alkalmazás 10 000+ aktív felhasználóval. Offline-first architektúra.",
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
    },
    hero: {
      badge: "Full-Stack Web Developer",
      headline1: "Code you can",
      headline2: "feel.",
      subheadline:
        "I design and build clean, fast, and intuitive digital experiences — from concept to finished product.",
      cta1: "My Projects",
      cta2: "Get in touch →",
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
      headline: "Work I am proud of.",
      subheadline: "Selected projects from the past years.",
      items: [
        {
          description:
            "Full-stack e-commerce store built with Next.js, Stripe, and Prisma. Admin panel, product management, analytics.",
        },
        {
          description:
            "Real-time data visualization and team management tools for enterprise clients. 50+ components.",
        },
        {
          description:
            "GPT-4 powered content generation app for marketing teams. Template system and export functionality.",
        },
        {
          description:
            "React Native cross-platform app with 10,000+ active users. Offline-first architecture.",
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

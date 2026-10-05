import createMiddleware from "next-intl/middleware";
 
export default createMiddleware({
  locales: ["hu", "en"],
  defaultLocale: "hu",
  localePrefix: "as-needed",
  localeDetection: false,
  // Ha az angol oldalaknak saját slugjuk van (lásd ROUTES a seo.ts-ben):
  pathnames: {
    "/": "/",
    "/weboldal-keszites": { hu: "/weboldal-keszites", en: "/web-development" },
    "/webshop-keszites": { hu: "/webshop-keszites", en: "/ecommerce-development" },
    "/online-hirdetes": { hu: "/online-hirdetes", en: "/online-advertising" },
    "/it-uzemeltetes": { hu: "/it-uzemeltetes", en: "/it-services" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});
 
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
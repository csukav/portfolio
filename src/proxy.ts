import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE, defaultLocale } from "@/lib/i18n";

// Crawlers and link-preview bots must always get the URL they asked for,
// otherwise the Hungarian pages (US-based Googlebot) would never be indexed.
const BOT_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|lighthouse|embedly|whatsapp|telegram|discord|linkedin|vercel/i;

function prefersEnglish(request: NextRequest): boolean {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen) return chosen === "en";

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return false;

  const country = request.headers.get("x-vercel-ip-country");
  return !!country && country !== "HU";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // English lives under /en and is served as-is.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  // /hu/... is a duplicate of the unprefixed Hungarian URL → permanent redirect.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // First visit from abroad (or explicit English choice): suggest /en.
  // Temporary redirect, so search engines keep the Hungarian URL indexed.
  if (prefersEnglish(request)) {
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Vary", "Cookie, User-Agent");
    return response;
  }

  // Unprefixed URL → Hungarian page, internally.
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension
  // (robots.txt, sitemap.xml, og-image.jpg, favicon.ico, ...).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};

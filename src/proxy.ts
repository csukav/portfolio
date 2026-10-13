import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

// No language detection: the language is always the one in the URL, for
// visitors and crawlers alike. English visitors switch with the language
// switcher (which links to /en).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /hu/... and /en/... are served as-is.
  const first = pathname.split("/")[1];
  if (isLocale(first)) {
    return NextResponse.next();
  }

  // / → /hu, and old unprefixed Hungarian URLs (/blog/...) → /hu/blog/...
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension
  // (robots.txt, sitemap.xml, og-image.jpg, favicon.ico, ...).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};

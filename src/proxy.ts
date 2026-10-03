import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? "";

  const locale = country === "HU" ? "hu" : "en";

  // Forward locale via request header so server components (layout) can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Also set a cookie so client components can read it
  response.cookies.set("locale", locale, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

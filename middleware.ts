import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { supportedLanguages } from "./app/data";

const isProtectedRoute = createRouteMatcher(["/"]);
const supportedLocales = supportedLanguages.map(({ value }) => value); // English, Spanish, French

function getLocale(req: NextRequest) {
  const acceptLanguage = req.headers.get("accept-language") || "";

  const defaultLocale = "en"; // Default to English

  const userLanguages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages();
  const bestMatch = match(userLanguages, supportedLocales, defaultLocale);

  return bestMatch;
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  const { pathname } = req.nextUrl;
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming req is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(req.nextUrl);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

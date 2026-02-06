import { type NextRequest, NextResponse } from "next/server";

/**
 * The cookie name used by the Outseta SDK when tokenStorage is set to "cookie".
 * If Outseta changes this name, update it here.
 */
const OUTSETA_COOKIE_NAME = "Outseta.nocode.accessToken";

/**
 * Routes that require authentication.
 * Unauthenticated users will be redirected to the login page.
 */
const PROTECTED_ROUTES = ["/app"];

/**
 * Routes that are only for unauthenticated users.
 * Authenticated users will be redirected to the app.
 */
const AUTH_ROUTES = ["/login", "/sign-up"];

/**
 * Finds the Outseta access token from cookies.
 * First checks the known cookie name, then falls back to
 * scanning for any cookie containing a JWT.
 */
function getAccessToken(request: NextRequest): string | null {
  // Check the known Outseta cookie name first
  const knownCookie = request.cookies.get(OUTSETA_COOKIE_NAME);
  if (knownCookie?.value) {
    return knownCookie.value;
  }

  // Fallback: scan all cookies for a JWT (starts with "eyJ")
  for (const cookie of request.cookies.getAll()) {
    if (cookie.value.startsWith("eyJ")) {
      return cookie.value;
    }
  }

  return null;
}

/**
 * Checks if a JWT token is expired by decoding the payload.
 * Returns true if the token is expired or cannot be decoded.
 */
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;

    // Add a 60-second buffer to account for clock skew
    return Date.now() >= payload.exp * 1000 - 60_000;
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getAccessToken(request);
  const hasValidToken = token !== null && !isTokenExpired(token);

  // Protected routes: redirect unauthenticated users to login
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !hasValidToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Auth routes: redirect authenticated users to app
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && hasValidToken) {
    const appUrl = new URL("/app", request.url);
    return NextResponse.redirect(appUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/sign-up"],
};

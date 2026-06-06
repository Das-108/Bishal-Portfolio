// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Perimeter Guard: Protect all sub-routes nested under the /admin workspace path
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    
    // Safely look up token payload headers directly from encryption cookies (Edge-compatible)
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      // Re-route user back to secure log-in gateway page if token doesn't exist
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Optimization Config: Ensure proxy matches only administrative route spaces
export const config = {
  matcher: ["/admin/:path*"],
};
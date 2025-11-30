import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware is disabled for static export
// For static export, we don't need route protection
export function middleware(request: NextRequest) {
  // Allow all requests in static export
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

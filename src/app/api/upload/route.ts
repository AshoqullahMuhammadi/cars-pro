import { NextRequest, NextResponse } from "next/server";

// This route is disabled for static export
export async function POST() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

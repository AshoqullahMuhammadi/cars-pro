import { NextRequest, NextResponse } from "next/server";

// This route is disabled for static export
// API routes don't work with static export (GitHub Pages)
export async function GET() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

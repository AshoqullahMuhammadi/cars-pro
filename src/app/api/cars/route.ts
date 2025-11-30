import { NextRequest, NextResponse } from "next/server";

// This route is disabled for static export
// For static export, use /cars.json instead
export async function GET() {
  return NextResponse.json({ error: "API routes are not available in static export. Use /cars.json instead." }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

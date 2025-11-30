import { NextRequest, NextResponse } from "next/server";

// This route is disabled for static export
export async function GET() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

export async function PUT() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

export async function DELETE() {
  return NextResponse.json({ error: "API routes are not available in static export" }, { status: 404 });
}

import { NextResponse } from "next/server";
import {
  GUESTBOOK_MESSAGE_MAX,
  GUESTBOOK_NAME_MAX,
  addEntry,
  isConfigured,
  listEntries,
} from "@/lib/guestbook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export async function GET() {
  try {
    const entries = await listEntries();
    return NextResponse.json({
      entries,
      configured: isConfigured(),
    });
  } catch {
    return NextResponse.json({ error: "Could not load guestbook." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 4096) {
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }
    body = text ? (JSON.parse(text) as unknown) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { name, message, website } = body as Record<string, unknown>;

  // Honeypot — bots fill this; humans never see it
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (typeof name !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
  }

  if (name.length > GUESTBOOK_NAME_MAX + 20 || message.length > GUESTBOOK_MESSAGE_MAX + 40) {
    return NextResponse.json({ error: "Name or message is too long." }, { status: 400 });
  }

  try {
    const result = await addEntry({
      name,
      message,
      ip: clientIp(request),
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true, entry: result.entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save your note." }, { status: 500 });
  }
}

/**
 * Guestbook storage via Upstash Redis.
 * Requires env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 * (Vercel Marketplace Upstash Redis, or console.upstash.com → .env.local).
 */

import { Redis } from "@upstash/redis";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export const GUESTBOOK_NAME_MAX = 40;
export const GUESTBOOK_MESSAGE_MAX = 280;
export const GUESTBOOK_LIST_CAP = 200;
export const GUESTBOOK_RATE_LIMIT = 3;
export const GUESTBOOK_RATE_WINDOW_SEC = 600; // 10 minutes

const ENTRIES_KEY = "guestbook:entries";
const RATE_KEY_PREFIX = "guestbook:rl:";

const WELCOME_ENTRY: GuestbookEntry = {
  id: "welcome",
  name: "Rudra",
  message: "Hey — leave a note. Say hi, roast my stack, or tell me what you’re building.",
  createdAt: "2026-08-05T00:00:00.000Z",
};

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function parseEntry(raw: unknown): GuestbookEntry | null {
  let value: unknown = raw;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value) as unknown;
    } catch {
      return null;
    }
  }
  if (!value || typeof value !== "object") return null;
  const obj = value as Record<string, unknown>;
  if (
    typeof obj.id !== "string" ||
    typeof obj.name !== "string" ||
    typeof obj.message !== "string" ||
    typeof obj.createdAt !== "string"
  ) {
    return null;
  }
  return {
    id: obj.id,
    name: obj.name,
    message: obj.message,
    createdAt: obj.createdAt,
  };
}

/** Strip tags / angle brackets so messages stay plain text. */
export function sanitizePlainText(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
}

export function isConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

export async function listEntries(): Promise<GuestbookEntry[]> {
  const redis = getRedis();
  if (!redis) return [WELCOME_ENTRY];

  const raw = await redis.lrange<unknown>(ENTRIES_KEY, 0, GUESTBOOK_LIST_CAP - 1);
  const entries = raw.map(parseEntry).filter((e): e is GuestbookEntry => e !== null);

  if (entries.length === 0) return [WELCOME_ENTRY];
  return entries;
}

export type AddEntryResult =
  | { ok: true; entry: GuestbookEntry }
  | { ok: false; error: string; status: number };

export async function addEntry(input: {
  name: string;
  message: string;
  ip: string;
}): Promise<AddEntryResult> {
  const redis = getRedis();
  if (!redis) {
    return {
      ok: false,
      error: "Guestbook is temporarily offline — Redis isn’t configured yet.",
      status: 503,
    };
  }

  const name = sanitizePlainText(input.name).slice(0, GUESTBOOK_NAME_MAX);
  const message = sanitizePlainText(input.message).slice(0, GUESTBOOK_MESSAGE_MAX);

  if (!name || name.length < 1) {
    return { ok: false, error: "Name is required.", status: 400 };
  }
  if (!message || message.length < 1) {
    return { ok: false, error: "Message is required.", status: 400 };
  }

  // Light URL / script stuffing filter
  const combined = `${name} ${message}`.toLowerCase();
  if (
    /https?:\/\//i.test(combined) ||
    /www\./i.test(combined) ||
    /javascript:/i.test(combined) ||
    /<script/i.test(combined)
  ) {
    return { ok: false, error: "Links and scripts aren’t allowed — keep it a plain hi.", status: 400 };
  }

  const ipKey = `${RATE_KEY_PREFIX}${input.ip || "unknown"}`;
  const count = await redis.incr(ipKey);
  if (count === 1) {
    await redis.expire(ipKey, GUESTBOOK_RATE_WINDOW_SEC);
  }
  if (count > GUESTBOOK_RATE_LIMIT) {
    return {
      ok: false,
      error: "Easy there — a few notes per stretch is enough. Try again in a bit.",
      status: 429,
    };
  }

  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  await redis.lpush(ENTRIES_KEY, entry);
  await redis.ltrim(ENTRIES_KEY, 0, GUESTBOOK_LIST_CAP - 1);

  return { ok: true, entry };
}

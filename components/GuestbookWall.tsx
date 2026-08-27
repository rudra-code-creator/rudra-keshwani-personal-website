"use client";

import { useCallback, useState, type FormEvent } from "react";
import {
  GUESTBOOK_MESSAGE_MAX,
  GUESTBOOK_NAME_MAX,
  type GuestbookEntry,
} from "@/lib/guestbook";

function formatWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export function GuestbookWall({ initialEntries }: { initialEntries: GuestbookEntry[] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("submitting");
      setError(null);

      try {
        const res = await fetch("/api/guestbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message, website }),
        });
        const data = (await res.json()) as { ok?: boolean; entry?: GuestbookEntry; error?: string };

        if (!res.ok || !data.ok) {
          setStatus("error");
          setError(data.error ?? "Could not post — try again.");
          return;
        }

        if (data.entry) {
          setEntries((prev) => {
            const withoutWelcome =
              prev.length === 1 && prev[0]?.id === "welcome"
                ? []
                : prev.filter((e) => e.id !== "welcome");
            return [data.entry!, ...withoutWelcome];
          });
        }
        setName("");
        setMessage("");
        setStatus("success");
      } catch {
        setStatus("error");
        setError("Network hiccup — try again in a sec.");
      }
    },
    [name, message, website],
  );

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-hairline bg-surface-elevated p-6 lg:p-8">
        <h2 className="text-heading-md text-on-dark">Leave a note</h2>
        <p className="mt-2 text-body-sm text-mute">
          Name + a short message. No links, no spam — just a hi on the wall.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          {/* Honeypot — hidden from humans */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
            <label htmlFor="guestbook-website">Website</label>
            <input
              id="guestbook-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="guestbook-name" className="mb-1.5 block text-body-sm-strong text-on-dark">
              Name
            </label>
            <input
              id="guestbook-name"
              name="name"
              type="text"
              required
              maxLength={GUESTBOOK_NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should we call you?"
              className="focus-ring w-full rounded-md border border-hairline bg-surface px-3 py-2 text-body-md text-on-dark placeholder:text-mute"
              disabled={status === "submitting"}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <label htmlFor="guestbook-message" className="text-body-sm-strong text-on-dark">
                Message
              </label>
              <span className="text-caption-md text-mute">
                {message.length}/{GUESTBOOK_MESSAGE_MAX}
              </span>
            </div>
            <textarea
              id="guestbook-message"
              name="message"
              required
              rows={3}
              maxLength={GUESTBOOK_MESSAGE_MAX}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say hi, drop a roast, or share what you’re building…"
              className="focus-ring w-full resize-y rounded-md border border-hairline bg-surface px-3 py-2 text-body-md text-on-dark placeholder:text-mute"
              disabled={status === "submitting"}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="focus-ring btn-primary"
              disabled={status === "submitting" || !name.trim() || !message.trim()}
            >
              {status === "submitting" ? "Posting…" : "Say hi"}
            </button>
            {status === "success" ? (
              <p className="text-body-sm text-accent-green" role="status">
                Posted — thanks for stopping by.
              </p>
            ) : null}
            {status === "error" && error ? (
              <p className="text-body-sm text-accent-red" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-heading-md text-on-dark">The wall</h2>
        <p className="mt-2 text-body-sm text-mute">
          {entries.length} note{entries.length === 1 ? "" : "s"} so far.
        </p>

        {entries.length === 0 ? (
          <p className="mt-6 rounded-lg border border-dashed border-hairline bg-surface px-4 py-8 text-center text-body-md text-mute">
            Nobody here yet — be the first to say hi.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg border border-hairline bg-surface px-4 py-4 sm:px-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-body-sm-strong text-on-dark">{entry.name}</p>
                  <time
                    dateTime={entry.createdAt}
                    className="text-caption-md text-mute"
                    title={entry.createdAt}
                  >
                    {formatWhen(entry.createdAt)}
                  </time>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-body-md text-body">{entry.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

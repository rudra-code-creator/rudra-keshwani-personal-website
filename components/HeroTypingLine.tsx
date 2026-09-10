"use client";

import { useEffect, useState } from "react";

const PRECINCT_URL = "https://precinctqld.com.au/";

type Phrase =
  | { kind: "text"; value: string }
  | {
      kind: "linked";
      before: string;
      linkLabel: string;
      href: string;
      after?: string;
    };

const phrases: Phrase[] = [
  { kind: "text", value: "The TIBER guy" },
  { kind: "text", value: "lives in Brisbane" },
  { kind: "text", value: "Entrepreneur" },
  { kind: "text", value: "Student technologist" },
  {
    kind: "linked",
    before: "Member at ",
    linkLabel: "the Precinct",
    href: PRECINCT_URL,
  },
  { kind: "text", value: "Future Y Combinator founder" },
];

function phraseFullText(phrase: Phrase): string {
  switch (phrase.kind) {
    case "text":
      return phrase.value;
    case "linked":
      return `${phrase.before}${phrase.linkLabel}${phrase.after ?? ""}`;
    default: {
      const _exhaustive: never = phrase;
      return _exhaustive;
    }
  }
}

function renderTyped(phrase: Phrase, length: number) {
  const full = phraseFullText(phrase);
  const visible = full.slice(0, length);

  if (phrase.kind === "text") {
    return <span>{visible}</span>;
  }

  const beforeLen = phrase.before.length;
  const linkEnd = beforeLen + phrase.linkLabel.length;
  const before = visible.slice(0, Math.min(visible.length, beforeLen));
  const linkPart =
    visible.length > beforeLen
      ? visible.slice(beforeLen, Math.min(visible.length, linkEnd))
      : "";
  const after =
    visible.length > linkEnd ? visible.slice(linkEnd) : "";

  return (
    <span>
      {before}
      {linkPart ? (
        <a
          href={phrase.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {linkPart}
        </a>
      ) : null}
      {after}
    </span>
  );
}

const TYPE_MS = 42;
const DELETE_MS = 28;
const HOLD_MS = 1600;
const GAP_MS = 320;

/** Single-line typewriter that cycles hero identity phrases. */
export function HeroTypingLine() {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[index] ?? phrases[0];
  const full = phraseFullText(phrase);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && length < full.length) {
      timer = setTimeout(() => setLength((n) => n + 1), TYPE_MS);
    } else if (!deleting && length === full.length) {
      timer = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && length > 0) {
      timer = setTimeout(() => setLength((n) => n - 1), DELETE_MS);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, GAP_MS);
    }

    return () => clearTimeout(timer);
  }, [deleting, full.length, length]);

  return (
    <p
      className="mt-3 min-h-[1.6em] text-[clamp(1.05rem,2.4vw,1.45rem)] font-medium leading-snug text-on-dark"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">{full}</span>
      <span aria-hidden="true" className="inline">
        {renderTyped(phrase, length)}
        <span className="ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.12em] animate-pulse bg-primary align-baseline" />
      </span>
    </p>
  );
}

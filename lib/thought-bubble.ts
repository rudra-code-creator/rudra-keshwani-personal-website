import fs from "fs";
import path from "path";

const THOUGHT_BUBBLE_PATH = path.join(process.cwd(), "thought-bubble.txt");

/** Use markdown links in thought-bubble.txt: [label](https://example.com) */
const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

export type ThoughtBubbleSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

function stripComments(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("#"))
    .join("\n")
    .trim();
}

/** Parse plain text + markdown links into renderable segments. */
export function parseThoughtBubbleMarkdown(raw: string): ThoughtBubbleSegment[] {
  const source = stripComments(raw);
  if (!source) return [];

  const segments: ThoughtBubbleSegment[] = [];
  let cursor = 0;

  for (const match of source.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ type: "text", value: source.slice(cursor, index) });
    }
    segments.push({ type: "link", label: match[1], href: match[2] });
    cursor = index + match[0].length;
  }

  if (cursor < source.length) {
    segments.push({ type: "text", value: source.slice(cursor) });
  }

  return segments;
}

/** Read root thought-bubble.txt for the hero Instagram-style note. */
export function getThoughtBubbleSegments(): ThoughtBubbleSegment[] {
  if (!fs.existsSync(THOUGHT_BUBBLE_PATH)) return [];
  const raw = fs.readFileSync(THOUGHT_BUBBLE_PATH, "utf8");
  return parseThoughtBubbleMarkdown(raw);
}

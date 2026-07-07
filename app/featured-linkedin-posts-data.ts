/**
 * Featured LinkedIn posts — paste embed iframe `src` URLs from LinkedIn's embed code.
 * Example: https://www.linkedin.com/embed/feed/update/urn:li:activity:1234567890
 *
 * Set `position` to control carousel order (1 = first, 2 = second, etc.).
 */
export type FeaturedLinkedInPost = {
  id: string;
  position: number;
  embedSrc: string;
  title?: string;
};

export const featuredLinkedInPosts: readonly FeaturedLinkedInPost[] = [
  {
    id: "2500-followers",
    position: 1,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7477622728586543104",
    title: "Six months ago, I started January 2026 with just over 200 LinkedIn followers. Today, I've OFFICIALLY CROSSED 2,500 followers. 🥳🥳🥳🥳",
  },
  {
    id: "2025 — The year I finally locked in.",
    position: 2,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7416500869162119168",
    title: "2025 — The year I finally locked in. If I had to describe this year in one sentence",
  },
  {
    id: "Diploma of business",
    position: 3,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7344254759660343296",
    title: "I know I am about a month late 😂. But I'm excited to celebrate the completion of my BSB50120 Diploma of Business",
  },
  {
    id: "vietnam-masterplan",
    position: 4,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7479389850929135616",
    title: "Vietnam has just announced something that completely redefines long-term urban planning: A US$2.5 trillion, 100-year masterplan for Hanoi 🤯.",
  },
  {
    id: "the biggest advantage i've ever had is being willing to be embarrassingly early",
    position: 5,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7474446250096926721",
    title: "the biggest advantage i've ever had is being willing to be embarrassingly early. most people spend years waiting for permission.",
  },
  {
    id: "PRO TIP: Make Claude say your name before every response.",
    position: 5,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7473262021996666880",
    title: "PRO TIP: Make Claude (or cursor) say your name before every response. Here's why:",
  },
  {
    id: "quick-intro",
    position: 7,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7416285003342299137",
    title: "Quick intro because I realized I dont really have a “who I am” post on here yet 🙂",
  },
  {
    id: "If youre scared to hit Post today,",
    position: 8,
    embedSrc:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7412591961146064896",
    title: "If youre scared to hit Post today, I need to talk to you. Your first 10 posts will get zero likes. Your friends might think its cringe.",
  },

];

/** Posts sorted by `position` ascending for display. */
export function getFeaturedLinkedInPosts(): readonly FeaturedLinkedInPost[] {
  return [...featuredLinkedInPosts].sort((a, b) => a.position - b.position);
}

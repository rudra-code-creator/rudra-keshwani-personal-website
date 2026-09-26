/** Fetch GitHub contribution calendar for the live heatmap. */

export const GITHUB_USERNAME = "rudra-code-creator";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: (ContributionDay | null)[];
};

export type GithubContributionCalendar = {
  total: number;
  weeks: ContributionWeek[];
  username: string;
  profileUrl: string;
};

type ApiDay = {
  date: string;
  count: number;
  level: number;
};

type ApiResponse = {
  total: { lastYear?: number } & Record<string, number>;
  contributions: ApiDay[];
};

function clampLevel(level: number): 0 | 1 | 2 | 3 | 4 {
  if (level <= 0) return 0;
  if (level === 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  return 4;
}

function startOfWeekSunday(date: Date): Date {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() - d.getUTCDay());
  return d;
}

function toUtcDate(iso: string): Date {
  const [y, m, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, day!));
}

function formatIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Group last-year days into Sunday-start weeks (GitHub-style). */
export function buildWeeks(days: ContributionDay[]): ContributionWeek[] {
  if (days.length === 0) return [];

  const byDate = new Map(days.map((d) => [d.date, d]));
  const first = toUtcDate(days[0]!.date);
  const last = toUtcDate(days[days.length - 1]!.date);
  let cursor = startOfWeekSunday(first);
  const end = startOfWeekSunday(last);
  end.setUTCDate(end.getUTCDate() + 6);

  const weeks: ContributionWeek[] = [];
  while (cursor <= end) {
    const weekDays: (ContributionDay | null)[] = [];
    for (let i = 0; i < 7; i += 1) {
      const key = formatIso(cursor);
      weekDays.push(byDate.get(key) ?? null);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push({ days: weekDays });
  }
  return weeks;
}

export async function getGithubContributionCalendar(
  username = GITHUB_USERNAME,
): Promise<GithubContributionCalendar | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as ApiResponse;
    const days: ContributionDay[] = (data.contributions ?? []).map((day) => ({
      date: day.date,
      count: day.count,
      level: clampLevel(day.level),
    }));

    const total =
      data.total?.lastYear ??
      days.reduce((sum, day) => sum + day.count, 0);

    return {
      total,
      weeks: buildWeeks(days),
      username,
      profileUrl: `https://github.com/${username}`,
    };
  } catch {
    return null;
  }
}

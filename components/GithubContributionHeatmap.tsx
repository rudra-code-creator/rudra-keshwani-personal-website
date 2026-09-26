import { contact } from "@/app/content";
import type { ContributionDay, GithubContributionCalendar } from "@/lib/github-contributions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVEL_CLASS = [
  "bg-[rgb(var(--color-hairline))]",
  "bg-[rgb(var(--color-accent-green)/0.28)]",
  "bg-[rgb(var(--color-accent-green)/0.5)]",
  "bg-[rgb(var(--color-accent-green)/0.75)]",
  "bg-[rgb(var(--color-accent-green))]",
] as const;

function monthLabels(weeks: GithubContributionCalendar["weeks"]): { index: number; label: string }[] {
  const labels: { index: number; label: string }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const firstDay = week.days.find((d): d is ContributionDay => d !== null);
    if (!firstDay) return;
    const month = Number(firstDay.date.slice(5, 7)) - 1;
    if (month !== lastMonth) {
      labels.push({ index, label: MONTHS[month]! });
      lastMonth = month;
    }
  });

  return labels;
}

function dayTitle(day: ContributionDay): string {
  const when = new Date(`${day.date}T12:00:00Z`).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  if (day.count === 0) return `No contributions on ${when}`;
  if (day.count === 1) return `1 contribution on ${when}`;
  return `${day.count} contributions on ${when}`;
}

/** GitHub-style contribution heatmap for the last 12 months. */
export function GithubContributionHeatmap({
  calendar,
}: {
  calendar: GithubContributionCalendar;
}) {
  const labels = monthLabels(calendar.weeks);
  const cell = "h-[11px] w-[11px] rounded-[2px] border border-hairline/40";

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-body-md text-on-dark">
          <span className="font-semibold text-ink">{calendar.total.toLocaleString("en-AU")}</span>{" "}
          contributions in the last year
        </p>
        <a
          href={calendar.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring text-body-sm-strong text-primary underline decoration-primary/35 underline-offset-2 hover:decoration-primary"
        >
          @{calendar.username} on GitHub
        </a>
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="inline-block">
          <div className="mb-1 flex gap-[3px] pl-8">
            {calendar.weeks.map((_, weekIndex) => {
              const label = labels.find((item) => item.index === weekIndex);
              return (
                <span
                  key={`m-${weekIndex}`}
                  className="h-4 w-[11px] shrink-0 text-[10px] leading-none text-mute"
                >
                  {label?.label ?? ""}
                </span>
              );
            })}
          </div>

          <div className="flex gap-2">
            <div
              className="flex w-6 shrink-0 flex-col gap-[3px] text-[10px] leading-[11px] text-mute"
              aria-hidden
            >
              <span className="h-[11px]" />
              <span className="h-[11px]">Mon</span>
              <span className="h-[11px]" />
              <span className="h-[11px]">Wed</span>
              <span className="h-[11px]" />
              <span className="h-[11px]">Fri</span>
              <span className="h-[11px]" />
            </div>

            <div
              className="flex gap-[3px]"
              role="img"
              aria-label={`${calendar.total} GitHub contributions in the last year for ${calendar.username}`}
            >
              {calendar.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.days.map((day, dayIndex) => {
                    if (!day) {
                      return <span key={`${weekIndex}-${dayIndex}`} className="h-[11px] w-[11px]" />;
                    }
                    return (
                      <span
                        key={day.date}
                        title={dayTitle(day)}
                        className={[cell, LEVEL_CLASS[day.level]].join(" ")}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-caption-sm text-mute">
        <p>
          Live from{" "}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-dark underline decoration-hairline underline-offset-2 hover:text-primary"
          >
            github.com/{calendar.username}
          </a>
          · refreshes hourly
        </p>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span>Less</span>
          {LEVEL_CLASS.map((cls, level) => (
            <span key={level} className={[cell, cls].join(" ")} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { education, profile } from "@/app/content";

type Accent = "blue" | "red" | "yellow" | "green";

const accentStyles: Record<
  Accent,
  { bar: string; year: string; glow: string; node: string }
> = {
  blue: {
    bar: "border-l-accent-blue",
    year: "text-accent-blue",
    glow: "shadow-[0_0_16px_rgb(var(--color-accent-blue)/0.35)]",
    node: "bg-accent-blue",
  },
  red: {
    bar: "border-l-accent-red",
    year: "text-accent-red",
    glow: "shadow-[0_0_16px_rgb(var(--color-accent-red)/0.35)]",
    node: "bg-accent-red",
  },
  yellow: {
    bar: "border-l-accent-yellow",
    year: "text-accent-yellow",
    glow: "shadow-[0_0_16px_rgb(var(--color-accent-yellow)/0.35)]",
    node: "bg-accent-yellow",
  },
  green: {
    bar: "border-l-accent-green",
    year: "text-accent-green",
    glow: "shadow-[0_0_16px_rgb(var(--color-accent-green)/0.35)]",
    node: "bg-accent-green",
  },
};

const graphicEntries = [
  { shortName: "HKUST + Sino Group", year: "2026", accent: "blue" as const },
  { shortName: "QUT", year: "2026–29", accent: "red" as const },
  { shortName: "Y Combinator", year: "2026", accent: "yellow" as const },
  { shortName: "BOP Industries", year: "2026", accent: "green" as const },
  { shortName: "Get Set Education", year: "2025", accent: "blue" as const },
  { shortName: "Mansfield SHS", year: "2020–25", accent: "red" as const },
] as const;

const titleLetterColors = [
  "text-accent-blue",
  "text-accent-red",
  "text-accent-yellow",
  "text-accent-green",
  "text-accent-blue",
  "text-accent-red",
  "text-accent-yellow",
  "text-accent-green",
  "text-accent-blue",
] as const;

/** Polished education timeline infographic for the desktop sidebar column. */
export function EducationGraphic() {
  return (
    <div
      className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-lg border border-hairline bg-surface px-3 py-4"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(var(--color-hairline) / 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--color-hairline) / 0.55) 1px, transparent 1px)
          `,
          backgroundSize: "18px 18px",
        }}
      />

      <header className="relative z-10 text-center">
        <p className="text-[0.5rem] font-medium uppercase tracking-[0.28em] text-mute">
          {profile.displayName}
        </p>
        <h3 className="mt-1.5 flex justify-center gap-px text-lg font-semibold leading-none tracking-wide">
          {"EDUCATION".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className={titleLetterColors[index]}>
              {letter}
            </span>
          ))}
        </h3>
      </header>

      <div className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col justify-between py-1">
        <div
          className="pointer-events-none absolute bottom-3 left-5 top-3 w-px bg-gradient-to-b from-accent-blue via-accent-yellow via-50% to-accent-red opacity-70"
          aria-hidden
        />

        {graphicEntries.map((entry, index) => {
          const ed = education[index];
          const styles = accentStyles[entry.accent];

          return (
            <div key={entry.shortName} className="relative flex items-center gap-2.5">
              <div className="relative flex w-10 shrink-0 justify-center">
                <span
                  className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${styles.node} ring-2 ring-surface`}
                  aria-hidden
                />
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface-card ${styles.glow}`}
                >
                  {ed?.logoSrc ? (
                    <Image
                      src={ed.logoSrc}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-sm object-contain"
                    />
                  ) : null}
                </div>
              </div>

              <div
                className={`min-w-0 flex-1 rounded-md border border-hairline border-l-[3px] bg-surface-elevated/90 px-2.5 py-1.5 backdrop-blur-[1px] ${styles.bar}`}
              >
                <p className="truncate text-[0.625rem] font-medium leading-tight text-on-dark">
                  {entry.shortName}
                </p>
                <p className={`mt-0.5 text-[0.5625rem] font-medium leading-none ${styles.year}`}>
                  {entry.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="relative z-10 mt-3 border-t border-hairline pt-2.5 text-center">
        <p className="text-[0.5rem] font-medium uppercase tracking-[0.22em] text-mute">
          Founder & CEO · intelliGIS
        </p>
      </footer>
    </div>
  );
}

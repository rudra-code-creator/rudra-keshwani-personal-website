import { profile } from "@/app/content";

const rows: { label: string; sub?: string; icon: "blue" | "yellow" | "red" | "green"; active?: boolean }[] = [
  { label: "Open TIBER framework", sub: "Technology → Research", icon: "blue", active: true },
  { label: "unpaste.ai — workspace", sub: "Technical cofounder", icon: "green" },
  { label: "Chatstat — agentic AI", sub: "Internship", icon: "red" },
  { label: "QUT TECH — secretary", sub: "The Emerging Coders Hub", icon: "yellow" },
];

const iconSoft: Record<string, string> = {
  blue: "bg-accent-blue-soft text-accent-blue",
  yellow: "bg-accent-yellow-soft text-accent-yellow",
  red: "bg-accent-red-soft text-accent-red",
  green: "bg-accent-green-soft text-accent-green",
};

export function CommandPaletteMockup() {
  return (
    <div className="mx-auto w-full max-w-palette rounded-xl border border-hairline bg-surface">
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
        <span className="h-3 w-3 rounded-full bg-accent-red" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-accent-yellow" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-accent-green" aria-hidden />
        <span className="ml-2 text-caption-sm text-on-dark-mute">rudra — command palette</span>
      </div>
      <div className="border-b border-hairline bg-surface-elevated p-3">
        <div className="flex h-11 items-center gap-2 rounded-md border border-hairline bg-surface-card px-4 text-body-md text-on-dark-mute">
          <span className="text-mute">⌘</span>
          <span>Search roles, projects, links…</span>
        </div>
      </div>
      <div className="space-y-0.5 p-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center gap-3 rounded-sm px-2.5 py-1.5 text-body-md ${
              row.active ? "bg-surface-card text-on-dark" : "text-on-dark-mute"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-xs font-medium ${iconSoft[row.icon]}`}
              aria-hidden
            >
              ●
            </div>
            <div className="min-w-0 flex-1">
              <p className={row.active ? "text-on-dark" : "text-body"}>{row.label}</p>
              {row.sub ? <p className="text-caption-md text-mute">{row.sub}</p> : null}
            </div>
            {row.active ? (
              <span className="keycap shrink-0" aria-hidden>
                ↵
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-hairline px-3 py-2 text-caption-sm text-on-dark-mute">
        <span className="keycap">↑↓</span>
        <span>navigate</span>
        <span className="keycap">↵</span>
        <span>open</span>
        <span className="keycap">esc</span>
        <span>close</span>
      </div>
      <p className="border-t border-hairline px-3 py-2 text-center text-caption-sm text-mute">
        {profile.tagline} · {profile.location}
      </p>
    </div>
  );
}

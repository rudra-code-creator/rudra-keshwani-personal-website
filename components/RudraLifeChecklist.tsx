import {
  lifeChecklist,
  lifeChecklistDoneCount,
  lifeChecklistRemainingCount,
  lifeChecklistTotalCount,
} from "@/app/life-checklist-data";

export function RudraLifeChecklist() {
  return (
    <div className="space-y-4">
      <p className="text-body-md text-body">
        <span className="text-on-dark">{lifeChecklistDoneCount}</span>
        <span className="text-mute"> / {lifeChecklistTotalCount} checked</span>
        <span className="text-mute"> · </span>
        <span className="text-mute">{lifeChecklistRemainingCount} still to go</span>
      </p>

      <ul className="space-y-1 rounded-lg border border-hairline bg-surface p-2">
        {lifeChecklist.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 rounded-sm px-3 py-2 text-body-md transition ${
              item.done
                ? "bg-surface-card/40 text-on-dark-mute"
                : "text-on-dark hover:bg-surface-card/30"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border text-caption-sm ${
                item.done
                  ? "border-accent-green bg-accent-green-soft text-accent-green"
                  : "border-hairline-strong bg-surface-elevated text-transparent"
              }`}
              aria-hidden
            >
              {item.done ? "✓" : ""}
            </span>
            <span className="text-lg" aria-hidden>
              {item.emoji}
            </span>
            <span className={item.done ? "line-through" : ""}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState, type ReactNode } from "react";

type ExpandableListProps = {
  collapsedCount?: number;
  items: ReactNode[];
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
  itemClassName?: string;
  as?: "div" | "ul";
};

export function ExpandableList({
  collapsedCount = 3,
  items,
  moreLabel = "Read more",
  lessLabel = "Show less",
  className,
  itemClassName,
  as = "div",
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = items.length > collapsedCount;
  const visible = expanded || !needsToggle ? items : items.slice(0, collapsedCount);
  const remaining = items.length - collapsedCount;

  const list =
    as === "ul" ? (
      <ul className={className}>
        {visible.map((item, index) => (
          <li key={index} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <div className={className}>
        {visible.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );

  return (
    <div>
      {list}
      {needsToggle ? (
        <button
          type="button"
          className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-md text-body-sm-strong text-on-dark underline-offset-4 hover:underline"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? lessLabel : `${moreLabel} · ${remaining} more`}
          <span aria-hidden className="text-mute">
            {expanded ? "↑" : "↓"}
          </span>
        </button>
      ) : null}
    </div>
  );
}

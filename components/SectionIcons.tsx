import type { SVGProps } from "react";

/**
 * Lightweight line-style icons (24x24, currentColor) used to accent
 * section headings and sub-headings across the homepage.
 */

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function UserIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M14.5 4.5C17 4 20 5 20 5s1 3 .5 5.5c-.7 3.3-4 6.4-7.5 8L9 15.5 6.5 12c1.6-3.5 4.7-6.8 8-7.5z" />
      <circle cx="14.5" cy="9.5" r="1.6" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
      <path d="M17 14c2.4.5 4 2.5 4 5" />
    </svg>
  );
}

export function GraduationIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 9l10-4 10 4-10 4z" />
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
      <path d="M22 9v5" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3l1.8 4.8L18.5 9.5 13.8 11 12 16l-1.8-5L5.5 9.5l4.7-1.7z" />
      <path d="M18 15l.7 1.8L20.5 17l-1.8.7L18 19.5 17.3 18l-1.8-.7 1.8-.7z" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v4h4" />
      <path d="M8 12h8M8 16h8" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7" />
      <circle cx="7" cy="7" r="0.4" fill="currentColor" />
      <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M11 10v7" />
    </svg>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9l1.5 1.5L12 8" />
      <path d="M8 15l1.5 1.5L12 14" />
      <path d="M14.5 9.5H17M14.5 15.5H17" />
    </svg>
  );
}

export function QuizIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.6-2 2-2 3.2" />
      <circle cx="12" cy="17" r="0.4" fill="currentColor" />
    </svg>
  );
}

export function PenIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M15 5l4 4L8 20l-4 1 1-4z" />
      <path d="M13 7l4 4" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" />
    </svg>
  );
}

export function ProjectsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

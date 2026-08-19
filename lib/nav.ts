export const siteNavItems = [
  { label: "Profile", href: "/#profile" },
  { label: "About", href: "/#about" },
  { label: "TIBER", href: "/#tiber" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume", href: "/#resume" },
  { label: "Posts", href: "/#featured-posts" },
  { label: "Travel", href: "/#travel" },
  { label: "Life", href: "/life-checklist" },
  { label: "Quiz", href: "/pop-quiz" },
  { label: "Guestbook", href: "/guestbook" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#connect" },
] as const;

export type SiteNavItem = (typeof siteNavItems)[number];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }
  if (href === "/life-checklist" || href === "/pop-quiz" || href === "/guestbook") {
    return pathname === href;
  }
  // Home section links: only highlight Profile while on the home page
  if (href === "/#profile") {
    return pathname === "/";
  }
  return false;
}

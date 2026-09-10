## Learned User Preferences
- Prefers this personal website project to live at `C:\Users\rudra\personal-website`, not in temporary Cursor project directories.
- Prefers GitHub-based Vercel deployments for day-to-day shipping rather than deploying from the Vercel CLI.
- Wants website revisions to follow the current `DESIGN.md` direction.
- Keeps GitHub profile README content in the separate `rudra-code-creator` profile repo, not in this personal-website repository.
- Expects the resume on the site to be viewable inline and downloadable as a PDF.
- Prefers adding blog posts as markdown files in repo-root `blog-posts/` via git, including from mobile while on the move.
- Prefers an Omarchy-matched multi-theme system with Nord as the default and a thumbnail theme switcher (like omarchy.org), not a simple light/dark-only toggle.
- Prefers sidebar navigation over a top navigation bar.
- Prefers supplying featured project details manually rather than having agents explore GitHub for them.
- Wants the life checklist kept tasteful and not embarrassing on a public site (no dating, breakup, or getting-fired style items).
- Wants the education section side graphics hidden on mobile viewports (middle text only).
- Prefers polished, design-system-aligned React graphics for section illustrations rather than crude placeholder layouts; prefers standard headshot photos over cutout overlays in the hero.

## Learned Workspace Facts
- This workspace is Rudra Keshwani's personal website, built with Next.js 15 App Router, TypeScript, and Tailwind CSS.
- The live website URL is `https://rudra-keshwani-personal-website.vercel.app`.
- The GitHub remote is `https://github.com/rudra-code-creator/rudra-keshwani-personal-website.git` on `main`.
- Site content is centralized in `app/content.ts` (profile, TIBER, education, experience split into founder vs other roles, skills, and contact including Instagram and Egoist Machines at `https://ego.ist/i/rudra_keshwani`); the education section pairs the text card with desktop-only `EducationGraphic.tsx` and `EducationStockImage.tsx` (~5px gaps).
- The website intentionally does not include an "Insights" section.
- `DESIGN.md` defines an Omarchy Nord design system (dark-first Polar Night, JetBrains Mono, frost brand); themes live in `lib/themes.ts` / `app/themes.css` with `ThemeSwitcher` preview thumbnails (Nord default).
- Homepage section order: featured projects (bento grid from `app/projects-data.ts`, first 4 visible with fade + show more), then resume (`public/resume.pdf`), then Featured LinkedIn posts (`app/featured-linkedin-posts-data.ts` with position ordering), then travel map, then life checklist.
- Travel map (`components/VisitedCountriesMap.tsx`, `app/travel-data.ts`) uses Mercator projection with lived / explored / layover blue tiers, zoom/pan controls, and labeled city pins between Featured LinkedIn posts and the life checklist.
- Life checklist lives at `/life-checklist`; blog at `/blog` from `blog-posts/` via `lib/blog.ts`; pop quiz at `/pop-quiz` from `app/pop-quiz-data.ts`; guestbook (“Say hi” wall) at `/guestbook` with Upstash Redis (`lib/guestbook.ts`).
- Command palette (`components/CommandPalette.tsx`) auto-shows on first visit in a session and reopens with the Space key.
- Hero is `HeroBanner.tsx`: large name, typing/retyping line (`HeroTypingLine.tsx`, including Precinct link), square full-height standard headshot, and clickable contact icons; About and TIBER truncate to the first three paragraphs with read-more; Vercel Analytics is in `app/layout.tsx`.

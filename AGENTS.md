## Learned User Preferences
- Prefers this personal website project to live at `C:\Users\rudra\personal-website`, not in temporary Cursor project directories.
- Prefers GitHub-based Vercel deployments for day-to-day shipping rather than deploying from the Vercel CLI.
- Wants website revisions to follow the current `DESIGN.md` direction.
- Keeps GitHub profile README content in the separate `rudra-code-creator` profile repo, not in this personal-website repository.
- Expects the resume on the site to be viewable inline and downloadable as a PDF.
- Prefers adding blog posts as markdown files in repo-root `blog-posts/` via git, including from mobile while on the move.
- Prefers light mode as the default theme, with dark mode available via toggle.
- Prefers sidebar navigation over a top navigation bar.
- Prefers supplying featured project details manually rather than having agents explore GitHub for them.
- Wants the life checklist kept tasteful and not embarrassing on a public site (no dating, breakup, or getting-fired style items).

## Learned Workspace Facts
- This workspace is Rudra Keshwani's personal website, built with Next.js 15 App Router, TypeScript, and Tailwind CSS.
- The live website URL is `https://rudra-keshwani-personal-website.vercel.app`.
- The GitHub remote is `https://github.com/rudra-code-creator/rudra-keshwani-personal-website.git` on `main`.
- Site content is centralized in `app/content.ts` (profile, TIBER, education, experience split into founder vs other roles, skills, and contact including Instagram).
- The website intentionally does not include an "Insights" section.
- `DESIGN.md` defines a Raycast-inspired light-first design system (dark theme variant, sidebar with headshot) used by the Tailwind tokens and page components.
- Homepage section order: featured projects (bento grid from `app/projects-data.ts`, first 4 visible with fade + show more), then resume (`public/resume.pdf`), then Featured LinkedIn posts (`app/featured-linkedin-posts-data.ts` with position ordering), then travel map, then life checklist.
- Travel map (`components/VisitedCountriesMap.tsx`, `app/travel-data.ts`) uses Mercator projection with lived / explored / layover blue tiers, zoom/pan controls, and labeled city pins between Featured LinkedIn posts and the life checklist.
- Life checklist lives at `/life-checklist`; blog at `/blog` from `blog-posts/` via `lib/blog.ts`; pop quiz at `/pop-quiz` from `app/pop-quiz-data.ts`; guestbook (“Say hi” wall) at `/guestbook` with Upstash Redis (`lib/guestbook.ts`).
- Command palette (`components/CommandPalette.tsx`) auto-shows on first visit in a session and reopens with the Space key.
- Hero cover is theme-aware (light/dark); favicon uses the headshot (`app/icon.png` / `app/apple-icon.png`); About and TIBER sections truncate to the first three paragraphs with a read-more control; Vercel Analytics is in `app/layout.tsx`.

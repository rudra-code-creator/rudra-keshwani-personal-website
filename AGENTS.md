## Learned User Preferences
- Prefers this personal website project to live at `C:\Users\rudra\personal-website`, not in temporary Cursor project directories.
- Prefers GitHub-based Vercel deployments for day-to-day shipping rather than deploying from the Vercel CLI, and asks agents to bundle finished changes into GitHub pull requests (via `gh`).
- Wants website revisions to follow the current `DESIGN.md` direction.
- Keeps GitHub profile README content in the separate `rudra-code-creator` profile repo, not in this personal-website repository.
- Expects the resume on the site to be viewable inline and downloadable as a PDF.
- Prefers adding blog posts as markdown in repo-root `blog-posts/` and the hero thought-bubble note via root `thought-bubble.txt` (markdown links) so both can be updated via git on the go.
- Prefers an Omarchy-matched multi-theme system with Nord as the default and a thumbnail theme switcher (like omarchy.org), not a simple light/dark-only toggle.
- Prefers sidebar navigation over a top navigation bar.
- Prefers supplying featured-project details and images manually (images given in order for agents to add) rather than having agents explore GitHub or source them; for infrastructure map entries, wants agents to source real credited images online (never AI-generated), strongly preferring maps, blueprints, or masterplans over plain location photos.
- Wants the life checklist kept tasteful and not embarrassing on a public site (no dating, breakup, or getting-fired style items).
- Wants the education section side graphics hidden on mobile viewports (middle text only).
- Prefers polished, design-system-aligned React graphics for section illustrations; prefers a circular framed standard headshot in the hero over cutout overlays.

## Learned Workspace Facts
- This workspace is Rudra Keshwani's personal website, built with Next.js 15 App Router, TypeScript, and Tailwind CSS.
- The live website URL is `https://rudra-keshwani-personal-website.vercel.app`.
- The GitHub remote is `https://github.com/rudra-code-creator/rudra-keshwani-personal-website.git` on `main`.
- Site content is centralized in `app/content.ts` (profile, TIBER, education, experience split into founder vs other roles, skills, and contact including Instagram, Egoist Machines at `https://ego.ist/i/rudra_keshwani`, and a Cursor public profile via `contact.cursor`); About, TIBER, experience, and education use `HoverImagePreview` hover-image effects with per-item relevant images; the education section pairs the text card with desktop-only `EducationGraphic.tsx` and `EducationStockImage.tsx` (~5px gaps).
- The website intentionally does not include an "Insights" section.
- `DESIGN.md` defines an Omarchy Nord design system (dark-first Polar Night, JetBrains Mono, frost brand); themes live in `lib/themes.ts` / `app/themes.css` with `ThemeSwitcher` preview thumbnails (Nord default); secret themes unlock via command-palette easter eggs (`lib/easter-eggs.ts`, `app/secret-themes.css`, `EasterEggFX`).
- Homepage section order: hero (About, TIBER), experience, education, skills, featured projects (bento grid from `app/projects-data.ts`, first 4 visible with fade + show more), GitHub contribution heatmap (`GithubContributionHeatmap` / `lib/github-contributions.ts` for `rudra-code-creator`), resume (`public/resume.pdf`), Featured LinkedIn posts (`app/featured-linkedin-posts-data.ts` with position ordering), life checklist, pop quiz, blog, contact, then the travel map and the infrastructure map last.
- Travel map (`components/VisitedCountriesMap.tsx`, `app/travel-data.ts`) uses Mercator projection with lived / explored / layover blue tiers, zoom/pan controls, and labeled city pins; the Asia infrastructure megaprojects map (`components/InfrastructureMap.tsx`, `app/infrastructure-data.ts`) matches the travel map's frame size and has numbered markers plus a full-height sidebar list, click-only persistent window-style info cards (close / minimise / maximise) with image galleries, colour-coded `railLines` (solid built, dotted planned) with a region-grouped legend under the map, toggles for markers / labels / lines, and zoom plus full-world panning.
- Life checklist lives at `/life-checklist`; blog at `/blog` from `blog-posts/` via `lib/blog.ts`; pop quiz at `/pop-quiz` from `app/pop-quiz-data.ts`; guestbook (“Say hi” wall) at `/guestbook` with Upstash Redis (`lib/guestbook.ts`); custom 404 (`app/not-found.tsx`) reuses pop-quiz roast energy.
- Command palette (`components/CommandPalette.tsx`) auto-shows on first visit in a session, reopens with the Space key, and runs konami / tiber / yc easter eggs (tiny animations or secret themes).
- Hero is `HeroBanner.tsx`: large name, typing/retyping line (`HeroTypingLine.tsx`, including Precinct link), circular framed headshot with draggable Instagram-style thought bubble from root `thought-bubble.txt`, Brisbane skyline backdrop (`heroBackdropSrc` / `/images/brisbane-skyline.png`), and clickable contact icons; About and TIBER truncate to the first three paragraphs with read-more; Vercel Analytics is in `app/layout.tsx`.

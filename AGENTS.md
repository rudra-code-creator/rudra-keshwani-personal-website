## Learned User Preferences
- Prefers this personal website project to live at `C:\Users\rudra\personal-website`, not in temporary Cursor project directories.
- Prefers GitHub-based Vercel deployments for day-to-day shipping rather than deploying from the Vercel CLI.
- Wants website revisions to follow the current `DESIGN.md` direction.
- Keeps GitHub profile README content separate from the personal-website repository.
- Expects the resume on the site to be viewable inline and downloadable as a PDF.
- Prefers adding blog posts as markdown files in repo-root `blog-posts/` via git, including from mobile while on the move.

## Learned Workspace Facts
- This workspace is Rudra Keshwani's personal website, built with Next.js 15 App Router, TypeScript, and Tailwind CSS.
- The live website URL is `https://rudra-keshwani-personal-website-ft8czuvap.vercel.app`.
- The GitHub remote is `https://github.com/rudra-code-creator/rudra-keshwani-personal-website.git` on `main`.
- Site content is centralized in `app/content.ts` and includes Rudra's LinkedIn-derived profile, TIBER framework, education, experience, skills, and contact info.
- The website intentionally does not include an "Insights" section.
- `DESIGN.md` currently defines a Raycast-inspired light-first design system (with a dark theme variant and sidebar navigation) used by the Tailwind tokens and page components.
- Resume is served as a static asset at `public/resume.pdf` and linked from the site as `/resume.pdf` for inline viewing and download.
- Life checklist lives at `/life-checklist`: 150 read-only personal milestones (checked and unchecked) from `app/life-checklist-data.ts`, a Neal.fun iframe embed, and a Wait But Why illustration at the page top.
- Blog lives at `/blog`; posts are markdown files in repo-root `blog-posts/` loaded at build time via `lib/blog.ts`.
- Pop quiz lives at `/pop-quiz`; questions and answers live in `app/pop-quiz-data.ts`.
- Repository `README.md` documents the live site URL and local development commands.

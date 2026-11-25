# Personal website — Rudra Keshwani

The source for my personal website: portfolio, TIBER framework, experience, writing, projects, travel, and infrastructure interests.

**Live site:** [https://rudra-keshwani-personal-website.vercel.app](https://rudra-keshwani-personal-website.vercel.app)

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- TypeScript
- Tailwind CSS
- Vercel Analytics and Speed Insights
- Upstash Redis guestbook
- D3 / TopoJSON-powered travel and infrastructure maps

## Highlights

- Omarchy-inspired, Nord-first theme system with additional theme previews and hidden easter-egg themes
- Sidebar navigation, command palette, and an interactive hero thought bubble
- Featured projects, LinkedIn posts, GitHub contribution activity, blog, life checklist, and pop quiz
- Inline and downloadable resume
- Interactive visited-countries map and an Asia infrastructure megaprojects map
- Guestbook backed by Upstash Redis

## Content updates

Most site copy is maintained in [`app/content.ts`](./app/content.ts). A few pieces are deliberately easy to update without editing components:

- Add blog posts as Markdown files in [`blog-posts/`](./blog-posts/).
- Edit [`thought-bubble.txt`](./thought-bubble.txt) to update the hero note. Markdown links are supported.
- Replace [`public/resume.pdf`](./public/resume.pdf) to update the embedded and downloadable resume.

The complete UI direction and design tokens live in [`DESIGN.md`](./DESIGN.md).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deployment

The repository is connected to [Vercel](https://vercel.com/). The normal release flow is a GitHub pull request followed by a merge to `main`, which triggers a production deployment. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project if you use a custom domain (optional, for Open Graph URLs).

## Repository

[github.com/rudra-code-creator/rudra-keshwani-personal-website](https://github.com/rudra-code-creator/rudra-keshwani-personal-website)

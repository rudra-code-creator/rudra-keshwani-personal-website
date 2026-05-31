---
title: "Why I built this site as markdown in a folder"
date: "2026-05-31"
description: "Blog posts live in git — add a file, push from anywhere, and the site rebuilds."
draft: false
---

I wanted a blog I could update **from my phone** without touching a CMS or admin panel.

So posts live right here in `blog-posts/` as plain Markdown files. Add frontmatter at the top, write the body, commit, push — Vercel rebuilds and it's live.

## The workflow

1. **New file** in `blog-posts/` (e.g. `2026-05-31-my-thoughts.md`)
2. **Frontmatter** with `title`, `date`, and optional `description`
3. **Push to GitHub** — even from the mobile app
4. **Done** — the post shows up at `/blog` and gets its own page

## What I'll write about

- Building and shipping (unpaste.ai, side projects, infra)
- TIBER — Technology, Innovation, Business, Entrepreneurship, Research
- Early founder life as an 18yo in Brisbane
- Tools I actually use: Linux, Docker, Kubernetes, Node.js, Python

More posts coming soon. If you're reading this, the pipeline works.

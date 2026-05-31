# Blog posts

Add posts here as **Markdown files** (`.md`). They are read at build time and published on the site at `/blog`.

## Quick start (including from your phone)

1. Create a new file in this folder, e.g. `2026-05-31-my-post.md`
2. Add frontmatter at the top (between `---` lines), then write your post in Markdown below
3. Commit and push to GitHub — Vercel rebuilds and the post goes live

### Frontmatter template

```markdown
---
title: "Your post title"
date: "2026-05-31"
description: "One-line summary shown on the blog index."
draft: false
---

Your content starts here. Use **bold**, [links](https://example.com), lists, code blocks, etc.
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Shown on the post page and blog list |
| `date` | Yes | ISO date (`YYYY-MM-DD`) — used for sorting (newest first) |
| `description` | No | Short excerpt on the blog index |
| `draft` | No | Set `true` to hide the post without deleting the file |

## Publishing from GitHub Mobile

1. Open your repo → **Add file** → **Create new file**
2. Path: `blog-posts/your-slug.md` (the filename becomes the URL: `/blog/your-slug`)
3. Paste frontmatter + content, commit to `main`
4. Vercel deploys automatically

## Tips

- Use descriptive filenames: `2026-05-31-shipping-from-a-phone.md`
- Keep `README.md` in this folder — it is not published as a post
- Images: add to `public/images/blog/` and reference as `/images/blog/photo.png`

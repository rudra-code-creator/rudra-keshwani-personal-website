import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "blog-posts");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function isMarkdownFile(name: string): boolean {
  return name.endsWith(".md") && name.toLowerCase() !== "readme.md";
}

function parseDate(value: unknown, slug: string): string {
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
  }
  throw new Error(`Invalid or missing date in blog post "${slug}". Add date: "YYYY-MM-DD" to frontmatter.`);
}

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isMarkdownFile)
    .map((file) => path.join(BLOG_DIR, file));
}

function slugFromPath(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

function parseMeta(filePath: string): BlogPostMeta | null {
  const slug = slugFromPath(filePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  if (data.draft === true) return null;

  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) {
    throw new Error(`Missing title in blog post "${slug}". Add title to frontmatter.`);
  }

  const description =
    typeof data.description === "string" ? data.description.trim() : "";

  return {
    slug,
    title,
    date: parseDate(data.date, slug),
    description,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return readMarkdownFiles()
    .map(parseMeta)
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const meta = parseMeta(filePath);
  if (!meta) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);

  return {
    ...meta,
    contentHtml: processed.toString(),
  };
}

export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

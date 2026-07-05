import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPostDate, getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} — Rudra Keshwani`,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const newer = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const older = postIndex >= 0 && postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  return (
    <div className="min-h-dvh bg-canvas">
      <SiteHeader title="Blog" />

      <main className="mx-auto max-w-content px-gutter section-y">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="focus-ring text-body-sm-strong text-mute hover:text-on-dark"
          >
            ← All posts
          </Link>

          <header className="mt-8 border-b border-hairline pb-8">
            <time dateTime={post.date} className="text-caption-md text-mute">
              {formatPostDate(post.date)}
            </time>
            <h1 className="mt-3 text-[36px] font-semibold leading-[1.15] text-ink sm:text-display-lg">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-4 text-body-lg text-body">{post.description}</p>
            ) : null}
          </header>

          <div
            className="blog-prose mt-10"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="focus-ring link-inline text-body-sm">
                ← {older.title}
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/blog/${newer.slug}`} className="focus-ring link-inline text-body-sm">
                {newer.title} →
              </Link>
            ) : null}
          </footer>
        </article>
      </main>
    </div>
  );
}

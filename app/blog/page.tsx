import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Rudra Keshwani",
  description: "Notes on building, TIBER, startups, and shipping from anywhere.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-dvh bg-canvas">
      <SiteHeader title="Blog" />

      <main className="mx-auto max-w-content px-gutter section-y">
        <h1 className="text-[36px] font-semibold leading-[1.1] text-ink sm:text-display-lg">Blog</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-body">
          Thoughts on building, systems, and the early founder path. New posts land here when I push
          markdown to the repo — phone included.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 rounded-lg border border-hairline bg-surface p-6 text-body-md text-mute">
            No posts yet. Add a <code className="text-on-dark">.md</code> file to{" "}
            <code className="text-on-dark">blog-posts/</code> and push to git.
          </p>
        ) : (
          <ul className="mt-12 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-ring group block rounded-lg border border-hairline bg-surface p-6 transition hover:border-hairline-strong hover:bg-surface-elevated"
                >
                  <time dateTime={post.date} className="text-caption-md text-mute">
                    {formatPostDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-heading-md text-ink group-hover:text-on-dark">
                    {post.title}
                  </h2>
                  {post.description ? (
                    <p className="mt-2 text-body-md text-body">{post.description}</p>
                  ) : null}
                  <p className="mt-4 text-body-sm-strong text-on-dark-mute group-hover:text-on-dark">
                    Read post →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

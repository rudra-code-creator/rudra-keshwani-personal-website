import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CommandPaletteProvider } from "@/components/CommandPalette";
import { SiteShell } from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAllPosts } from "@/lib/blog";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

function resolveMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
    try {
      return new URL(withProtocol);
    } catch {
      /* fall through */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  title: "Rudra Keshwani (The TIBER guy) — student technologist",
  description:
    "Cofounder @ unpaste.ai · VC research @ SH1P · Intern @ Chatstat · Secretary @ QUT TECH. TIBER: Technology, Innovation, Business, Entrepreneurship, Research. Brisbane, Australia.",
  metadataBase: resolveMetadataBase(),
  openGraph: {
    title: "Rudra Keshwani (The TIBER guy)",
    description:
      "Student technologist · DevOps, cloud, infrastructure · Brisbane · Open to work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Keshwani",
    description:
      "The TIBER guy · Builder · Brisbane · Technology, Innovation, Business, Entrepreneurship, Research.",
    creator: "@rudrakesh123",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogPosts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
  }));

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <CommandPaletteProvider blogPosts={blogPosts}>
            <SiteShell>{children}</SiteShell>
          </CommandPaletteProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

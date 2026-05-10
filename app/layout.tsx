import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Rudra Keshwani — Technology, entrepreneurship & DevOps",
  description:
    "Personal site for Rudra Keshwani — technology, entrepreneurship, and DevOps. Brisbane-based. RaaS: Rudra as a Service.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Rudra Keshwani",
    description:
      "Technology, entrepreneurship, and DevOps. Creative builder based in Brisbane.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Keshwani",
    description: "Technology, entrepreneurship, and DevOps.",
    creator: "@rudrakesh123",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

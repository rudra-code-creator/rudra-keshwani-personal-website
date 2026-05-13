import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

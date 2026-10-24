import type { Metadata } from "next";
import { FullExplainer } from "@/components/explained/full/FullExplainer";
import { getGithubContributionCalendar } from "@/lib/github-contributions";
import { getFullExplainerStory } from "./story";
import "./explained-full.css";

export const metadata: Metadata = {
  title: "Explained, full — Rudra Keshwani",
  description:
    "A full-site trailer for Rudra Keshwani: identity, TIBER, experience, projects, proof, and maps — from Brisbane.",
  robots: { index: false, follow: false },
};

export default async function ExplainedFullPage() {
  const calendar = await getGithubContributionCalendar();
  const story = getFullExplainerStory(calendar);
  return <FullExplainer story={story} />;
}

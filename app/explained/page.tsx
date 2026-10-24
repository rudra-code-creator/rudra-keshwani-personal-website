import type { Metadata } from "next";
import { Explainer } from "@/components/explained/Explainer";
import { getExplainerStory } from "./story";
import "./explained.css";

export const metadata: Metadata = {
  title: "Explained — Rudra Keshwani",
  description:
    "A short trailer for Rudra Keshwani: student technologist, creator of the TIBER framework, building from Brisbane.",
  robots: { index: false, follow: false },
};

export default function ExplainedPage() {
  const story = getExplainerStory();
  return <Explainer story={story} />;
}

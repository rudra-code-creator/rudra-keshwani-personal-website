import Link from "next/link";
import { PopQuiz } from "@/components/PopQuiz";
import { popQuizQuestionCount } from "../pop-quiz-data";

export const metadata = {
  title: "Pop Quiz — Rudra Keshwani",
  description: `How well do you know Rudra? ${popQuizQuestionCount} fun questions with streaks, roasts, and tier rankings.`,
};

export default function PopQuizPage() {
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-hairline bg-canvas/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-6 lg:px-12">
          <Link href="/" className="focus-ring rounded-md text-heading-sm text-on-dark">
            ← Home
          </Link>
          <p className="text-body-sm-strong text-on-dark">Pop Quiz</p>
        </div>
      </header>

      <main className="mx-auto max-w-content px-6 py-12 lg:px-12 lg:py-section">
        <div className="mx-auto max-w-xl">
          <PopQuiz />
        </div>
        <p className="mx-auto mt-12 max-w-md text-center text-caption-md text-mute">
          Questions pulled from this site &amp; LinkedIn. Got something wrong? That&apos;s what the
          About section is for.
        </p>
      </main>
    </div>
  );
}

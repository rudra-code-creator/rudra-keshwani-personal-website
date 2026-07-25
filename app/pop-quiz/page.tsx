import { PopQuiz } from "@/components/PopQuiz";
import { popQuizQuestionCount } from "../pop-quiz-data";

export const metadata = {
  title: "Pop Quiz — Rudra Keshwani",
  description: `How well do you know Rudra? ${popQuizQuestionCount} fun questions with streaks, roasts, and tier rankings.`,
};

export default function PopQuizPage() {
  return (
    <div className="bg-canvas">
      <main className="mx-auto max-w-content px-gutter section-y">
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

import Link from "next/link";
import { popQuizQuestions, popQuizTiers } from "@/app/pop-quiz-data";

export const metadata = {
  title: "404 — wrong answer | Rudra Keshwani",
};

function pickRoast(): string {
  const reactions = popQuizQuestions.map((q) => q.wrongReaction);
  const index = Math.floor(Math.random() * reactions.length);
  return reactions[index] ?? popQuizTiers[0]!.blurb;
}

/** Custom 404 with pop-quiz roast energy. */
export default function NotFound() {
  const roast = pickRoast();
  const tier = popQuizTiers[0]!;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-content flex-col justify-center px-gutter py-16">
      <p className="text-caption-md uppercase tracking-[0.18em] text-mute">HTTP · pop quiz mode</p>
      <p className="mt-3 text-[clamp(4rem,18vw,9rem)] font-semibold leading-none tracking-tight text-accent-red">
        404
      </p>
      <h1 className="mt-4 text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-tight text-ink">
        {tier.emoji} {tier.title}
      </h1>
      <p className="mt-3 max-w-xl text-body-lg text-on-dark-mute">{tier.blurb}</p>

      <blockquote className="mt-8 max-w-xl rounded-sm border border-accent-red/40 bg-accent-red-soft px-4 py-3 text-body-md text-on-dark">
        <p className="text-caption-sm uppercase tracking-[0.14em] text-accent-red">Wrong answer</p>
        <p className="mt-1.5">{roast}</p>
      </blockquote>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="focus-ring inline-flex h-10 items-center rounded-sm bg-primary px-4 text-body-sm-strong text-on-primary transition-opacity hover:opacity-90"
        >
          Back to profile
        </Link>
        <Link
          href="/pop-quiz"
          className="focus-ring inline-flex h-10 items-center rounded-sm border border-hairline bg-surface px-4 text-body-sm-strong text-on-dark transition-colors hover:border-primary hover:text-primary"
        >
          Take the pop quiz
        </Link>
        <Link
          href="/#about"
          className="focus-ring inline-flex h-10 items-center rounded-sm border border-hairline bg-surface px-4 text-body-sm-strong text-on-dark transition-colors hover:border-primary hover:text-primary"
        >
          Study the About section
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getPopQuizTier,
  popQuizQuestionCount,
  popQuizQuestions,
  type PopQuizQuestion,
} from "@/app/pop-quiz-data";

type Phase = "intro" | "question" | "finished";

function shuffleOptions(question: PopQuizQuestion): PopQuizQuestion {
  const pairs = question.options.map((label, index) => ({ label, index }));
  for (let i = pairs.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  const correctIndex = pairs.findIndex((p) => p.index === question.correctIndex);
  return {
    ...question,
    options: pairs.map((p) => p.label),
    correctIndex,
  };
}

export function PopQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState(() => popQuizQuestions.map(shuffleOptions));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const current = questions[index];
  const progress = phase === "question" ? ((index + (revealed ? 1 : 0)) / popQuizQuestionCount) * 100 : 0;

  const tier = useMemo(() => getPopQuizTier(score), [score]);

  const reset = useCallback(() => {
    setPhase("intro");
    setIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPicked(null);
    setRevealed(false);
  }, []);

  const start = () => {
    setQuestions(popQuizQuestions.map(shuffleOptions));
    setPhase("question");
    setIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPicked(null);
    setRevealed(false);
  };

  const pick = (optionIndex: number) => {
    if (revealed || !current) return;
    const correct = optionIndex === current.correctIndex;
    setPicked(optionIndex);
    setRevealed(true);
    if (correct) {
      const nextStreak = streak + 1;
      setScore((s) => s + 1);
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (index + 1 >= popQuizQuestionCount) {
      setPhase("finished");
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setRevealed(false);
  };

  if (phase === "intro") {
    return (
      <div className="space-y-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl border border-hairline bg-surface-card text-4xl">
          🧠
        </div>
        <div>
          <p className="text-caption-md uppercase tracking-widest text-accent-yellow">Pop quiz</p>
          <h2 className="mt-2 text-heading-lg text-ink">How well do you know Rudra?</h2>
          <p className="mx-auto mt-4 max-w-md text-body-md text-body">
            {popQuizQuestionCount} questions. Zero stakes. Maximum judgment. Wrong answers get
            roasted (lightly).
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-caption-md text-mute">
          <span className="rounded-md border border-hairline bg-surface px-3 py-1">🔥 Streak bonus vibes</span>
          <span className="rounded-md border border-hairline bg-surface px-3 py-1">🏆 Tier at the end</span>
          <span className="rounded-md border border-hairline bg-surface px-3 py-1">⏱️ No timer — breathe</span>
        </div>
        <button type="button" onClick={start} className="focus-ring btn-primary mx-auto">
          Start the quiz →
        </button>
      </div>
    );
  }

  if (phase === "finished") {
    return (
      <div className="space-y-8 text-center">
        <div className="text-6xl" aria-hidden>
          {tier.emoji}
        </div>
        <div>
          <p className="text-caption-md uppercase tracking-widest text-accent-green">Final score</p>
          <p className="mt-2 text-[48px] font-semibold leading-none text-ink">
            {score}
            <span className="text-2xl text-mute">/{popQuizQuestionCount}</span>
          </p>
          <h2 className="mt-4 text-heading-lg text-ink">{tier.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-body-md text-body">{tier.blurb}</p>
          {bestStreak >= 3 && (
            <p className="mt-4 text-body-sm text-accent-yellow">
              Best streak: {bestStreak} 🔥{" "}
              {bestStreak >= 5 ? "(actually unstoppable)" : "(not bad)"}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={start} className="focus-ring btn-primary">
            Play again
          </button>
          <button type="button" onClick={reset} className="focus-ring btn-tertiary">
            Back to intro
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const isCorrect = picked === current.correctIndex;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-caption-md text-mute">
          <span>
            Question {index + 1} of {popQuizQuestionCount}
          </span>
          {streak >= 2 && (
            <span className="text-accent-yellow">
              {streak} streak {"🔥".repeat(Math.min(streak, 5))}
            </span>
          )}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-card">
          <div
            className="h-full rounded-full bg-accent-blue transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-lg border border-hairline bg-surface p-6 lg:p-8">
        <p className="text-3xl" aria-hidden>
          {current.emoji}
        </p>
        <h2 className="mt-4 text-heading-md text-ink">{current.question}</h2>

        <ul className="mt-6 space-y-2">
          {current.options.map((option, i) => {
            let style =
              "border-hairline bg-surface-elevated text-on-dark hover:border-hairline-strong hover:bg-surface-card";
            if (revealed) {
              if (i === current.correctIndex) {
                style = "border-accent-green bg-accent-green-soft text-accent-green";
              } else if (i === picked) {
                style = "border-accent-red bg-accent-red-soft text-accent-red";
              } else {
                style = "border-hairline bg-surface-elevated text-mute opacity-60";
              }
            }

            return (
              <li key={option}>
                <button
                  type="button"
                  disabled={revealed}
                  onClick={() => pick(i)}
                  className={`focus-ring flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-body-md transition ${style}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs border border-hairline bg-surface text-caption-sm text-mute">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option}</span>
                  {revealed && i === current.correctIndex && (
                    <span className="ml-auto" aria-hidden>
                      ✓
                    </span>
                  )}
                  {revealed && i === picked && i !== current.correctIndex && (
                    <span className="ml-auto" aria-hidden>
                      ✗
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {revealed && (
          <div
            className={`mt-6 rounded-md border p-4 ${
              isCorrect
                ? "border-accent-green/40 bg-accent-green-soft"
                : "border-accent-red/40 bg-accent-red-soft"
            }`}
          >
            <p
              className={`text-body-sm-strong ${isCorrect ? "text-accent-green" : "text-accent-red"}`}
            >
              {isCorrect ? current.correctReaction : current.wrongReaction}
            </p>
            <p className="mt-2 text-body-sm text-body">{current.funFact}</p>
            <button type="button" onClick={next} className="focus-ring btn-primary mt-4">
              {index + 1 >= popQuizQuestionCount ? "See my results →" : "Next question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

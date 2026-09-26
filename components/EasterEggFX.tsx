"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  EASTER_EGG_EVENT,
  KONAMI_SEQUENCE,
  SECRET_THEME_ID,
  dispatchEasterEgg,
  unlockSecretTheme,
  type EasterEggDetail,
  type EasterEggId,
} from "@/lib/easter-eggs";

type FxState = {
  id: EasterEggId;
  message: string;
} | null;

const MESSAGES: Record<EasterEggId, string> = {
  konami: "Achievement unlocked: Konami. The TIBER guy notices.",
  tiber: "TIBER protocol engaged. Technology → Research, in that order.",
  yc: "Batch accepted (locally). Secret theme unlocked: YC Batch.",
};

function ConfettiBurst() {
  const bits = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map((i) => {
        const left = (i * 37) % 100;
        const delay = (i % 7) * 0.05;
        const hue = (i * 47) % 360;
        return (
          <span
            key={i}
            className="egg-confetti absolute top-[-8%] h-2.5 w-2 rounded-[1px]"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              background: `hsl(${hue} 85% 60%)`,
            }}
          />
        );
      })}
    </div>
  );
}

function TiberCascade() {
  const letters = ["T", "I", "B", "E", "R"] as const;
  const colors = [
    "text-primary",
    "text-accent-blue",
    "text-accent-yellow",
    "text-accent-red",
    "text-accent-green",
  ];
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 sm:gap-5"
      aria-hidden
    >
      {letters.map((letter, i) => (
        <span
          key={letter}
          className={[
            "egg-tiber-letter text-[clamp(3rem,12vw,7rem)] font-semibold tracking-tight",
            colors[i],
          ].join(" ")}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

function YcFlash() {
  return (
    <div className="pointer-events-none absolute inset-0 egg-yc-flash" aria-hidden>
      <div className="absolute inset-0 bg-[rgb(255_102_0_/_0.22)]" />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(2rem,8vw,4.5rem)] font-semibold tracking-[0.2em] text-[rgb(255_102_0)]">
        YC
      </p>
    </div>
  );
}

/** Full-screen FX + toast for command-palette / Konami easter eggs. */
export function EasterEggFX() {
  const { setTheme } = useTheme();
  const [fx, setFx] = useState<FxState>(null);

  useEffect(() => {
    const onEgg = (event: Event) => {
      const detail = (event as CustomEvent<EasterEggDetail>).detail;
      if (!detail?.id) return;

      if (detail.id === "yc") {
        unlockSecretTheme();
        setTheme(SECRET_THEME_ID);
        window.dispatchEvent(new Event("rudra-secret-theme-unlocked"));
      }

      setFx({ id: detail.id, message: MESSAGES[detail.id] });
      window.setTimeout(() => setFx(null), 2600);
    };

    window.addEventListener(EASTER_EGG_EVENT, onEgg);
    return () => window.removeEventListener(EASTER_EGG_EVENT, onEgg);
  }, [setTheme]);

  useEffect(() => {
    let index = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = KONAMI_SEQUENCE[index];
      const expectedNorm = expected.length === 1 ? expected.toLowerCase() : expected;
      if (key === expectedNorm) {
        index += 1;
        if (index >= KONAMI_SEQUENCE.length) {
          index = 0;
          dispatchEasterEgg("konami");
        }
      } else {
        index = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!fx) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" role="status" aria-live="polite">
      <div className={fx.id === "konami" ? "egg-shake h-full w-full" : "h-full w-full"}>
        {fx.id === "konami" ? <ConfettiBurst /> : null}
        {fx.id === "tiber" ? <TiberCascade /> : null}
        {fx.id === "yc" ? <YcFlash /> : null}
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 w-[min(92vw,28rem)] -translate-x-1/2 rounded-sm border border-hairline bg-surface-elevated px-4 py-3 text-center text-body-sm text-on-dark shadow-[0_16px_40px_rgb(var(--color-ink)/0.25)]">
        {fx.message}
      </div>
    </div>
  );
}

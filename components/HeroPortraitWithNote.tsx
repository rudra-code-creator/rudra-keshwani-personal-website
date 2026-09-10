"use client";

import Image from "next/image";
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { ThoughtBubbleSegment } from "@/lib/thought-bubble";

type TrailDot = { x: number; y: number; size: number };

type Props = {
  segments: ThoughtBubbleSegment[];
  headshotSrc: string;
  alt: string;
};

const NOTE_WIDTH = 272;
const TRAIL_COUNT = 6;

function NoteBody({ segments }: { segments: ThoughtBubbleSegment[] }) {
  return (
    <>
      {segments.map((segment, i) => {
        switch (segment.type) {
          case "text":
            return <span key={`t-${i}`}>{segment.value}</span>;
          case "link":
            return (
              <a
                key={`l-${i}`}
                href={segment.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline decoration-primary/35 underline-offset-2 transition-colors hover:decoration-primary"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {segment.label}
              </a>
            );
          default: {
            const _exhaustive: never = segment;
            return _exhaustive;
          }
        }
      })}
    </>
  );
}

const AvatarFrame = forwardRef<
  HTMLDivElement,
  { headshotSrc: string; alt: string }
>(function AvatarFrame({ headshotSrc, alt }, ref) {
  return (
    <div
      ref={ref}
      className="relative z-10 h-48 w-48 shrink-0 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72"
    >
      <div
        className="pointer-events-none absolute inset-[-10%] rounded-full opacity-80"
        aria-hidden
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgb(var(--color-primary) / 0.16), transparent 68%),
            radial-gradient(circle at 50% 60%, rgb(var(--color-surface-elevated) / 0.55), transparent 72%)
          `,
        }}
      />
      <Image
        src={headshotSrc}
        alt={alt}
        width={512}
        height={512}
        priority
        className="relative z-10 h-full w-full rounded-full border border-hairline object-cover shadow-[0_18px_40px_rgb(var(--color-ink)/0.18)]"
        sizes="(max-width: 640px) 12rem, (max-width: 1024px) 16rem, 18rem"
        draggable={false}
      />
    </div>
  );
});

/** Circular headshot with a draggable Instagram-style note; trail aims at mouth (image center). */
export function HeroPortraitWithNote({ segments, headshotSrc, alt }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [notePos, setNotePos] = useState<{ x: number; y: number } | null>(null);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [dragging, setDragging] = useState(false);

  const placeDefaultNote = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Spawn in the upper-left of the movement canvas.
    setNotePos({ x: 16, y: 16 });
  }, []);

  const updateTrail = useCallback(() => {
    const stage = stageRef.current;
    const note = noteRef.current;
    const avatar = avatarRef.current;
    if (!stage || !note || !avatar) return;

    const s = stage.getBoundingClientRect();
    const n = note.getBoundingClientRect();
    const a = avatar.getBoundingClientRect();

    const mouth = {
      x: a.left - s.left + a.width * 0.5,
      y: a.top - s.top + a.height * 0.5,
    };
    const noteCenter = {
      x: n.left - s.left + n.width * 0.5,
      y: n.top - s.top + n.height * 0.5,
    };

    const dx = mouth.x - noteCenter.x;
    const dy = mouth.y - noteCenter.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 12) {
      setTrail([]);
      return;
    }

    const ux = dx / dist;
    const uy = dy / dist;

    const halfW = n.width * 0.5;
    const halfH = n.height * 0.5;
    const edgeT = Math.min(
      Math.abs(ux) > 0.001 ? halfW / Math.abs(ux) : Number.POSITIVE_INFINITY,
      Math.abs(uy) > 0.001 ? halfH / Math.abs(uy) : Number.POSITIVE_INFINITY,
    );
    const start = {
      x: noteCenter.x + ux * (edgeT + 6),
      y: noteCenter.y + uy * (edgeT + 6),
    };
    const end = {
      x: mouth.x - ux * 4,
      y: mouth.y - uy * 4,
    };

    const span = Math.hypot(end.x - start.x, end.y - start.y);
    if (span < 8) {
      setTrail([]);
      return;
    }

    const dots: TrailDot[] = [];
    for (let i = 0; i < TRAIL_COUNT; i += 1) {
      const t = i / (TRAIL_COUNT - 1);
      dots.push({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
        size: 11 - t * 7.5,
      });
    }
    setTrail(dots);
  }, []);

  useLayoutEffect(() => {
    placeDefaultNote();
  }, [placeDefaultNote]);

  useLayoutEffect(() => {
    if (!notePos) return;
    updateTrail();
  }, [notePos, updateTrail]);

  useEffect(() => {
    const onResize = () => {
      if (!dragRef.current) placeDefaultNote();
      requestAnimationFrame(updateTrail);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeDefaultNote, updateTrail]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a")) return;
    if (!notePos) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: notePos.x,
      originY: notePos.y,
    };
    setDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    const note = noteRef.current;
    if (!drag || drag.pointerId !== e.pointerId || !stage || !note) return;

    const s = stage.getBoundingClientRect();
    const nextX = drag.originX + (e.clientX - drag.startX);
    const nextY = drag.originY + (e.clientY - drag.startY);
    const maxX = Math.max(8, s.width - note.offsetWidth - 8);
    const maxY = Math.max(8, s.height - note.offsetHeight - 8);

    setNotePos({
      x: Math.min(maxX, Math.max(8, nextX)),
      y: Math.min(maxY, Math.max(8, nextY)),
    });
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  if (segments.length === 0) {
    return (
      <div className="relative flex min-h-[22rem] items-center justify-center px-gutter py-10 sm:min-h-[24rem] lg:min-h-0 lg:w-[min(100%,34rem)] lg:shrink-0 lg:pr-10">
        <AvatarFrame ref={avatarRef} headshotSrc={headshotSrc} alt={alt} />
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      className="relative min-h-[22rem] w-full overflow-visible px-gutter py-10 sm:min-h-[24rem] lg:min-h-0 lg:w-[min(100%,34rem)] lg:shrink-0 lg:pr-10"
    >
      <div className="pointer-events-none absolute inset-0 z-[15]" aria-hidden>
        {trail.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full border border-hairline bg-surface-elevated shadow-sm"
            style={{
              width: dot.size,
              height: dot.size,
              left: dot.x,
              top: dot.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div
        ref={noteRef}
        role="group"
        aria-label="Draggable profile note"
        className={[
          "absolute z-20 max-w-[17rem] touch-none select-none rounded-[1.35rem] border border-hairline bg-surface-elevated px-3.5 py-2.5 text-left text-[0.8rem] leading-snug text-on-dark shadow-[0_10px_28px_rgb(var(--color-ink)/0.14)] sm:text-body-sm",
          dragging ? "cursor-grabbing" : "cursor-grab",
        ].join(" ")}
        style={{
          left: notePos?.x ?? 0,
          top: notePos?.y ?? 0,
          width: NOTE_WIDTH,
          visibility: notePos ? "visible" : "hidden",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <NoteBody segments={segments} />
      </div>

      <div className="flex h-full min-h-[18rem] items-center justify-center sm:min-h-[20rem] lg:justify-end">
        <AvatarFrame ref={avatarRef} headshotSrc={headshotSrc} alt={alt} />
      </div>
    </div>
  );
}

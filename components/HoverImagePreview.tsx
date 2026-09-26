"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const THUMB_W = 240;
const THUMB_H = 135;
const INSET = 8;
const EASE = 0.18;

type HoverImagePreviewProps = {
  /** One image per `data-hover-index` row, in index order. */
  images: readonly string[];
  children: ReactNode;
  className?: string;
};

/**
 * Cursor-following image preview for lists. Mark each row inside `children` with
 * `data-hover-index={i}`; the hovered row receives `data-hover-active` so it can be
 * styled with `data-[hover-active]:` / `group-data-[hover-active]:` variants.
 */
export function HoverImagePreview({ images, children, className }: HoverImagePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * EASE;
      pos.current.y += (target.current.y - pos.current.y) * EASE;
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(${pos.current.x - THUMB_W / 2}px, ${pos.current.y - THUMB_H / 2}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-hover-index]").forEach((el) => {
      if (visible && Number(el.dataset.hoverIndex) === index) {
        el.setAttribute("data-hover-active", "");
      } else {
        el.removeAttribute("data-hover-active");
      }
    });
  }, [index, visible]);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const halfW = THUMB_W / 2;
    const halfH = THUMB_H / 2;
    target.current = {
      x: Math.max(halfW + INSET, Math.min(rect.width - halfW - INSET, event.clientX - rect.left)),
      y: Math.max(halfH + INSET, Math.min(rect.height - halfH - INSET, event.clientY - rect.top)),
    };

    const row = (event.target as HTMLElement).closest<HTMLElement>("[data-hover-index]");
    if (!row || !container.contains(row)) {
      setVisible(false);
      return;
    }
    if (!visible) pos.current = { ...target.current };
    setIndex(Number(row.dataset.hoverIndex));
    setVisible(true);
  };

  return (
    <div
      ref={containerRef}
      className={["relative", className].filter(Boolean).join(" ")}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setVisible(false)}
    >
      {children}

      <div
        ref={thumbRef}
        className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
        style={{ width: THUMB_W, height: THUMB_H }}
        aria-hidden
      >
        <div
          className={[
            "h-full w-full overflow-hidden rounded-md border border-hairline shadow-[0_20px_45px_-12px_rgb(0_0_0/0.45)] transition-[transform,opacity] duration-300 ease-out",
            visible ? "scale-100 opacity-100" : "scale-0 opacity-0",
          ].join(" ")}
        >
          <div
            className="flex w-full flex-col transition-transform duration-500 ease-out"
            style={{
              height: `${images.length * 100}%`,
              transform: `translateY(-${(index * 100) / images.length}%)`,
            }}
          >
            {images.map((src) => (
              <div key={src} className="relative w-full flex-1">
                <Image src={src} alt="" fill className="object-cover" sizes={`${THUMB_W}px`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

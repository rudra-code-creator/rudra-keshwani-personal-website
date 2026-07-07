"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FeaturedLinkedInPost } from "@/app/featured-linkedin-posts-data";
import { LinkedInPostEmbed } from "@/components/LinkedInPostEmbed";

const AUTO_PLAY_MS = 5000;
const TABLET_MIN_WIDTH = 768;

type FeaturedLinkedInPostsCarouselProps = {
  posts: readonly FeaturedLinkedInPost[];
};

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${TABLET_MIN_WIDTH}px)`);
    const update = () => setVisibleCount(mediaQuery.matches ? 3 : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return visibleCount;
}

export function FeaturedLinkedInPostsCarousel({ posts }: FeaturedLinkedInPostsCarouselProps) {
  const count = posts.length;
  const visibleCount = useVisibleCount();
  const maxIndex = Math.max(0, count - visibleCount);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncSlideWidth = () => {
      setSlideWidth(viewport.offsetWidth / visibleCount);
    };

    syncSlideWidth();

    const observer = new ResizeObserver(syncSlideWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [visibleCount]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (maxIndex === 0) {
        setIndex(0);
        return;
      }

      const normalized = ((nextIndex % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      setIndex(normalized);
    },
    [maxIndex],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (maxIndex === 0 || isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex]);

  const visibleRange = useMemo(() => {
    const indices = new Set<number>();
    for (let i = index; i < index + visibleCount && i < count; i += 1) {
      indices.add(i);
    }

    if (count <= visibleCount) {
      for (let i = 0; i < count; i += 1) {
        indices.add(i);
      }
    }

    return indices;
  }, [count, index, visibleCount]);

  if (count === 0) return null;

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      <div ref={viewportRef} className="overflow-hidden" aria-live="polite">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: slideWidth > 0 ? `translateX(-${index * slideWidth}px)` : undefined,
          }}
        >
          {posts.map((post, postIndex) => (
            <article
              key={post.id}
              className="shrink-0 px-1.5 sm:px-2"
              style={{ width: slideWidth > 0 ? slideWidth : `${100 / visibleCount}%` }}
              aria-hidden={postIndex < index || postIndex >= index + visibleCount}
            >
              {visibleRange.has(postIndex) ? (
                <LinkedInPostEmbed embedSrc={post.embedSrc} title={post.title} />
              ) : (
                <div
                  className="min-h-[480px] rounded-md border border-hairline bg-surface"
                  aria-hidden
                />
              )}
            </article>
          ))}
        </div>
      </div>

      {maxIndex > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="focus-ring btn-secondary"
            aria-label="Previous posts"
          >
            ←
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, slideIndex) => {
              const isActive = slideIndex === index;

              return (
                <button
                  key={slideIndex}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "focus-ring h-2.5 w-2.5 rounded-full transition",
                    isActive ? "bg-on-dark" : "bg-stone hover:bg-mute",
                  ].join(" ")}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="focus-ring btn-secondary"
            aria-label="Next posts"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}

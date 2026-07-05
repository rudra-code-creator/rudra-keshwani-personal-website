"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type ProfileIdentityProps = {
  headshotSrc: string;
  displayName: string;
  tagline: string;
  metaLine: string;
  scrollHook: string;
};

export function ProfileIdentity({
  headshotSrc,
  displayName,
  tagline,
  metaLine,
  scrollHook,
}: ProfileIdentityProps) {
  const nameTaglineRef = useRef<HTMLDivElement>(null);
  const [headshotSize, setHeadshotSize] = useState(72);

  useLayoutEffect(() => {
    const nameTaglineEl = nameTaglineRef.current;
    if (!nameTaglineEl) return;

    const syncSize = () => {
      setHeadshotSize(nameTaglineEl.offsetHeight);
    };

    syncSize();

    const observer = new ResizeObserver(syncSize);
    observer.observe(nameTaglineEl);

    return () => observer.disconnect();
  }, [displayName, tagline]);

  return (
    <div className="flex items-start gap-5 sm:gap-6">
      <Image
        src={headshotSrc}
        alt={`${displayName} headshot`}
        width={headshotSize}
        height={headshotSize}
        className="shrink-0 rounded-full border border-hairline object-cover"
        style={{ width: headshotSize, height: headshotSize }}
        priority
      />
      <div className="min-w-0">
        <div ref={nameTaglineRef}>
          <h1 className="text-[32px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px] md:text-[56px] lg:text-display-xl">
            {displayName}
          </h1>
          <p className="mt-2 text-heading-md text-on-dark">{tagline}</p>
        </div>
        <p className="mt-3 text-body-sm text-on-dark-mute">{metaLine}</p>
        <p className="mt-3 text-body-lg text-body">{scrollHook}</p>
      </div>
    </div>
  );
}

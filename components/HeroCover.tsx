"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type HeroCoverProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
};

export function HeroCover({ lightSrc, darkSrc, alt }: HeroCoverProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to light (site default) until theme is known to avoid flash
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative h-52 w-full sm:h-64 md:h-72 lg:h-80 xl:h-96">
      <Image
        src={lightSrc}
        alt={alt}
        fill
        className={`object-cover object-center transition-opacity duration-200 ${isDark ? "opacity-0" : "opacity-100"}`}
        priority
        sizes="100vw"
      />
      <Image
        src={darkSrc}
        alt=""
        fill
        className={`object-cover object-center transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-0"}`}
        priority
        sizes="100vw"
        aria-hidden={!isDark}
      />
    </div>
  );
}

/** Omarchy Nord frost diagonal stripe band — chromatic chrome used once at top of hero. */
export function HeroStripes() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden sm:h-48"
      aria-hidden
    >
      <div
        className="absolute -left-1/4 top-0 h-full w-[150%] opacity-90"
        style={{
          background: `repeating-linear-gradient(
            -16deg,
            transparent 0px,
            transparent 72px,
            rgba(136, 192, 208, 0.28) 72px,
            rgba(136, 192, 208, 0.28) 80px,
            transparent 80px,
            transparent 160px,
            rgba(94, 129, 172, 0.35) 160px,
            rgba(94, 129, 172, 0.35) 168px,
            transparent 168px,
            transparent 240px,
            rgba(129, 161, 193, 0.2) 240px,
            rgba(129, 161, 193, 0.2) 248px
          )`,
        }}
      />
    </div>
  );
}

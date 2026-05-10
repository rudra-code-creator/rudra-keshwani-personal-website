import Link from "next/link";

const WORDMARK_NAV = `
▄▀▀▄ █▀▀▄ █▀▀▄ █▀▀▄ █▀▀▄
█▀▀█ █▄▄▀ █▄▄▀ █▄▄▀ █▀▀█
▀  ▀ ▀  ▀ ▀  ▀ ▀  ▀ ▀  ▀`.trim();

const WORDMARK_HERO = `
██████╗ ██╗   ██╗██████╗ ██████╗  █████╗ 
██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗
██████╔╝██║   ██║██║  ██║██████╔╝███████║
██╔══██╗██║   ██║██║  ██║██╔══██╗██╔══██║
██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`.trim();

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rudra-keshwani-the-tiber-guy-31272b1aa/",
    hint: "professional",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/rudrakesh123",
    hint: "posts",
  },
  {
    label: "GitHub",
    href: "https://github.com/rudra-code-creator",
    hint: "code",
  },
] as const;

const focusAreas = [
  {
    title: "Technology",
    body: "Shipping useful software, experimenting with tooling, and learning how systems behave in the wild.",
  },
  {
    title: "Entrepreneurship",
    body: "Connecting ideas to outcomes — product sense, clarity under uncertainty, and momentum over perfection.",
  },
  {
    title: "DevOps",
    body: "Automating the boring parts so teams can move faster with fewer surprises.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex h-14 max-w-frame items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="focus-ring shrink-0 rounded-sm">
            <pre
              className="hidden text-[8px] leading-none text-ink sm:block sm:text-[10px]"
              aria-hidden
            >
              {WORDMARK_NAV}
            </pre>
            <span className="font-medium text-body-strong text-ink sm:hidden">rudra</span>
          </Link>
          <nav
            className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-body-strong text-mute sm:gap-x-6"
            aria-label="Primary"
          >
            <Link href="#work" className="focus-ring rounded-sm hover:text-ink">
              focus
            </Link>
            <Link href="#connect" className="focus-ring rounded-sm hover:text-ink">
              connect
            </Link>
            <Link
              href="#connect"
              className="focus-ring btn-primary ml-1 shrink-0 px-5 active:bg-ink-deep"
            >
              Connect
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-section">
            <span className="inline-block rounded-sm bg-surface-dark px-2 py-0.5 text-caption text-on-dark">
              beta · personal readme
            </span>
            <h1 className="mt-6 max-w-content text-[28px] font-bold leading-[1.5] text-ink sm:text-display">
              Rudra Keshwani
            </h1>
            <p className="mt-6 max-w-content text-body text-copy">
              <span className="font-medium text-body-strong text-ink">RaaS — Rudra as a Service.</span>{" "}
              Creative, curious student blending business, information technology, and DevOps to build
              things that work in the real world — not just on paper.
            </p>
          </div>
        </section>

        <section aria-labelledby="tui-heading" className="border-b border-hairline bg-surface-dark">
          <h2 id="tui-heading" className="sr-only">
            Terminal preview
          </h2>
          <div className="mx-auto max-w-frame px-4 py-16 sm:px-8 sm:py-16 lg:px-8">
            <pre
              className="mx-auto w-full max-w-content overflow-x-auto text-center text-[7px] leading-[1.2] text-on-dark sm:text-[10px] md:text-xs"
              aria-hidden
            >
              {WORDMARK_HERO}
            </pre>
            <p className="mt-6 text-center text-body text-on-dark">student · brisbane · builder</p>

            <div className="mx-auto mt-10 max-w-content rounded-sm bg-surface-dark-elevated px-3 py-2 text-body text-on-dark">
              <span className="text-success">|</span> focus{" "}
              <span className="text-ash">—roles</span>{" "}
              <span className="text-accent">technology</span>
              <span className="text-ash">,</span> entrepreneurship<span className="text-ash">,</span> devops
            </div>

            <p className="mt-8 text-center text-caption text-ash">
              tab switch focus ctrl-p commands
            </p>
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading" className="border-b border-hairline">
          <div className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-section">
            <h2 id="work-heading" className="text-heading-md text-ink">
              [+] Where I spend my energy
            </h2>
            <div className="mt-4 border-t border-hairline" />
            <p className="mt-6 max-w-content text-body text-copy">
              A simple map of the themes that show up in my projects, coursework, and side quests.
            </p>
            <ul className="mt-8 border-t border-hairline">
              {focusAreas.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-hairline py-3 text-body text-copy first:pt-4 last:border-b-0"
                >
                  <span className="text-ink">[+] </span>
                  <span className="font-medium text-body-strong text-ink">{item.title}</span>
                  <span> — {item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="connect" aria-labelledby="connect-heading" className="border-b border-hairline">
          <div className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-section">
            <h2 id="connect-heading" className="text-heading-md text-ink">
              [x] Let&apos;s connect
            </h2>
            <div className="mt-4 border-t border-hairline" />
            <p className="mt-6 max-w-content text-body text-copy">
              Short note with context usually works best — what you&apos;re building and how I might
              help.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex min-h-9 flex-col justify-center rounded-sm border border-hairline-strong bg-canvas px-5 py-2 text-button text-ink active:bg-surface-card"
                  >
                    <span>{s.label}</span>
                    <span className="text-caption text-mute">{s.hint}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline bg-canvas">
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 border-b border-hairline pb-8 sm:grid-cols-3 sm:gap-0">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-footer border-b border-hairline py-3 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:py-0 sm:last:border-r-0"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-8 text-caption text-mute sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Rudra Keshwani</p>
            <p>
              Next.js ·{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-footer"
              >
                Vercel
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

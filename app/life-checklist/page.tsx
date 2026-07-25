import Image from "next/image";
import { RudraLifeChecklist } from "@/components/RudraLifeChecklist";
import {
  lifeChecklistDoneCount,
  lifeChecklistRemainingCount,
  lifeChecklistTotalCount,
} from "../life-checklist-data";
import { NEAL_FUN_LIFE_CHECKLIST_URL } from "../content";

export const metadata = {
  title: "Life Checklist — Rudra Keshwani",
  description:
    "What Rudra has checked off so far — plus the Neal.fun Life Checklist to build your own.",
};

export default function LifeChecklistPage() {
  return (
    <div className="bg-canvas">
      <main className="mx-auto max-w-content px-gutter section-y">
        <figure className="overflow-hidden rounded-lg border border-hairline bg-white">
          <Image
            src="/images/life-paths-wait-but-why.png"
            alt="Life paths diagram: one green path through the past, many open green paths into the future"
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
          <figcaption className="border-t border-hairline bg-surface px-4 py-2 text-caption-md text-mute">
            Illustration from{" "}
            <a
              href="https://waitbutwhy.com/"
              className="link-inline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wait But Why
            </a>
            — past paths closed, future paths still open.
          </figcaption>
        </figure>

        <h1 className="mt-10 text-[36px] font-semibold leading-[1.1] text-ink sm:text-display-lg">
          Life Checklist
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-body">
          A snapshot of significant life milestones I have hit so far — school, work, building, and
          the early founder path. Still plenty left on the list.
        </p>

        <section className="mt-10 rounded-lg border border-hairline bg-surface-elevated p-6 lg:p-8">
          <h2 className="text-heading-md text-on-dark">What I&apos;ve done so far</h2>
          <p className="mt-2 text-body-sm text-mute">
            {lifeChecklistDoneCount} of {lifeChecklistTotalCount} checked —{" "}
            {lifeChecklistRemainingCount} still ahead.
          </p>
          <div className="mt-6">
            <RudraLifeChecklist />
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <h2 className="text-heading-md text-on-dark">Your turn</h2>
            <p className="mt-3 max-w-2xl text-body-md text-body">
              Want the full interactive experience? Complete your own life checklist on{" "}
              <a
                href={NEAL_FUN_LIFE_CHECKLIST_URL}
                className="link-inline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Neal.fun
              </a>
              — tap milestones as you go, from first steps to turning 100.
            </p>
            <a
              href={NEAL_FUN_LIFE_CHECKLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring btn-primary mt-6 inline-flex"
            >
              Complete your own life checklist here →
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <iframe
              src={NEAL_FUN_LIFE_CHECKLIST_URL}
              title="Neal.fun Life Checklist — complete your own"
              className="h-[min(75vh,680px)] w-full bg-canvas"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="border-t border-hairline bg-surface px-4 py-3 text-caption-md text-mute">
              Embedded from{" "}
              <a
                href={NEAL_FUN_LIFE_CHECKLIST_URL}
                className="link-inline"
                target="_blank"
                rel="noopener noreferrer"
              >
                neal.fun/life-checklist
              </a>
              . If it does not load, use the button above to open it in a new tab.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

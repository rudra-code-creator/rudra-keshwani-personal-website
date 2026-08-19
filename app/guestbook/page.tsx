import { GuestbookWall } from "@/components/GuestbookWall";
import { listEntries } from "@/lib/guestbook";

export const metadata = {
  title: "Say hi — Rudra Keshwani",
  description: "Leave a note on Rudra’s guestbook wall — say hi, drop a roast, or share what you’re building.",
};

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  const entries = await listEntries();

  return (
    <div className="bg-canvas">
      <main className="mx-auto max-w-content px-gutter section-y">
        <h1 className="text-[36px] font-semibold leading-[1.1] text-ink sm:text-display-lg">Say hi</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-body">
          A little wall for visitors. Drop your name and a short note — no account, no links, just
          vibes.
        </p>

        <div className="mt-10">
          <GuestbookWall initialEntries={entries} />
        </div>
      </main>
    </div>
  );
}

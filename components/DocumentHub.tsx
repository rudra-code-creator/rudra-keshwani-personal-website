"use client";

import { useEffect, useState } from "react";

type Document = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
};

const documents: Document[] = [
  {
    title: "Business resume",
    eyebrow: "Management · Entrepreneurship",
    description: "A resume centred on business leadership, management, and entrepreneurial work.",
    href: "/documents/rudra-keshwani-business-resume.pdf",
  },
  {
    title: "Technical resume",
    eyebrow: "IT · AI · Cloud · Software",
    description: "A technical resume covering information technology, AI, cloud, and software engineering.",
    href: "/documents/rudra-keshwani-technical-resume.pdf",
  },
  {
    title: "Web links",
    eyebrow: "Profiles · Projects · References",
    description: "A curated collection of links to profiles, projects, and other work around the web.",
    href: "/documents/rudra-keshwani-weblinks.pdf",
  },
];

function ExpandIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5" />
      <path d="m3 8 6-5M21 8l-6-5M3 16l6 5M21 16l-6 5" />
    </svg>
  );
}

export function DocumentHub() {
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (!activeDocument) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDocument(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeDocument]);

  return (
    <>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {documents.map((document) => (
          <article key={document.href} className="overflow-hidden rounded-md border border-hairline bg-surface-elevated">
            <div className="border-b border-hairline px-4 py-4">
              <p className="text-caption-sm uppercase tracking-[0.12em] text-primary">{document.eyebrow}</p>
              <h3 className="mt-1 text-heading-sm text-on-dark">{document.title}</h3>
              <p className="mt-2 min-h-12 text-caption-md text-mute">{document.description}</p>
            </div>

            <div className="relative h-96 bg-canvas">
              <iframe
                src={`${document.href}#view=FitH`}
                title={`${document.title} inline preview`}
                className="h-full w-full bg-canvas"
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-2 border-t border-hairline px-4 py-3">
              <button type="button" onClick={() => setActiveDocument(document)} className="focus-ring btn-primary gap-2">
                <ExpandIcon />
                Expand
              </button>
              <a href={document.href} download className="focus-ring install-btn">
                Download
              </a>
            </div>
          </article>
        ))}
      </div>

      {activeDocument ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="document-viewer-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas/90 p-3 backdrop-blur-sm sm:p-6"
        >
          <div className="flex h-full max-h-[92dvh] w-full max-w-7xl flex-col overflow-hidden rounded-md border border-hairline-strong bg-surface shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
              <div>
                <p className="text-caption-sm uppercase tracking-[0.12em] text-primary">{activeDocument.eyebrow}</p>
                <h3 id="document-viewer-title" className="text-heading-sm text-on-dark">{activeDocument.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a href={activeDocument.href} download className="focus-ring install-btn">
                  Download
                </a>
                <button type="button" onClick={() => setActiveDocument(null)} className="focus-ring btn-tertiary">
                  Close <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <iframe
              src={`${activeDocument.href}#view=FitH`}
              title={`${activeDocument.title} full-screen preview`}
              className="min-h-0 flex-1 bg-canvas"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

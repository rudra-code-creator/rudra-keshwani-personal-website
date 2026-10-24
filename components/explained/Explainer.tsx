"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  explainerCameras,
  type CameraKeyframe,
  type ExplainerStory,
} from "@/app/explained/story";

type PieceProps = {
  a: number;
  b: number;
  spin?: string;
  as?: "div" | "span";
  className?: string;
  children: ReactNode;
};

type ChapterProps = {
  id: string;
  camera: string;
  len: number;
  index: string;
  label: string;
  children: ReactNode;
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number): number {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function cameraAt(keys: CameraKeyframe[], p: number): CameraKeyframe {
  const first = keys[0];
  const last = keys[keys.length - 1];
  if (!first || !last) {
    return { p, x: 0, y: 0, scale: 1, rotate: 0 };
  }
  if (p <= first.p) return first;
  if (p >= last.p) return last;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const a = keys[i];
    const b = keys[i + 1];
    if (!a || !b) continue;
    if (p >= a.p && p <= b.p) {
      const t = smoothstep((p - a.p) / Math.max(b.p - a.p, 1e-6));
      return {
        p,
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        scale: lerp(a.scale, b.scale, t),
        rotate: lerp(a.rotate, b.rotate, t),
      };
    }
  }

  return last;
}

function writeCamera(chapter: HTMLElement, p: number, damp: number): void {
  const camera = chapter.querySelector<HTMLElement>("[data-explained-camera]");
  if (!camera) return;
  const key = chapter.dataset.camera ?? "";
  const keys = explainerCameras[key];
  if (!keys) {
    camera.style.setProperty("--cam-x", "0%");
    camera.style.setProperty("--cam-y", "0%");
    camera.style.setProperty("--cam-s", "1");
    camera.style.setProperty("--cam-r", "0deg");
    return;
  }

  const pose = cameraAt(keys, p);
  camera.style.setProperty("--cam-x", `${pose.x * damp}%`);
  camera.style.setProperty("--cam-y", `${pose.y * damp}%`);
  camera.style.setProperty("--cam-s", String(1 + (pose.scale - 1) * damp));
  camera.style.setProperty("--cam-r", `${pose.rotate * damp}deg`);
}

function Piece({ a, b, spin, as = "div", className, children }: PieceProps) {
  const Tag = as;
  const style = {
    "--a": a,
    "--b": b,
    ...(spin ? { "--spin": spin } : {}),
  } as CSSProperties;

  return (
    <Tag className={["explained-piece", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </Tag>
  );
}

function Chapter({ id, camera, len, index, label, children }: ChapterProps) {
  const style = { "--len": len } as CSSProperties;

  return (
    <section
      id={id}
      className="explained-chapter"
      data-explained-chapter=""
      data-camera={camera}
      style={style}
      aria-label={label}
    >
      <div className="explained-stage">
        <div className="explained-kicker">
          <strong>{index}</strong>
          <span>{label}</span>
        </div>
        <div className="explained-vignette" aria-hidden="true" />
        <div className="explained-grain" aria-hidden="true" />
        <div className="explained-frame">
          <div className="explained-camera" data-explained-camera="">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Explainer({ story }: { story: ExplainerStory }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-explained-chapter]"));
    const state = chapters.map(() => ({ p: 0, written: Number.NaN }));
    const raf = { id: 0 };
    let last = performance.now();
    let running = true;

    const freeze = () => {
      delete root.dataset.live;
      for (const chapter of chapters) {
        chapter.style.setProperty("--p", "1");
        writeCamera(chapter, 1, 1);
      }
    };

    const measure = (now: number, ease: boolean) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      const vh = window.innerHeight;
      const damp = mobile.matches ? 0.35 : 1;

      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const stage = chapter.querySelector<HTMLElement>(".explained-stage");
        const stageHeight = stage?.offsetHeight ?? vh;
        const pinTop = stage ? Number.parseFloat(getComputedStyle(stage).top) || 0 : 0;
        const range = Math.max(1, chapter.offsetHeight - stageHeight);
        const farBelow = rect.bottom < -vh;
        const farAbove = rect.top > vh * 1.35;
        const target = farBelow
          ? 1
          : farAbove
            ? 0
            : clamp01((pinTop - rect.top) / range);

        const current = state[index];
        if (!current) return;

        if (!ease || farBelow || farAbove) {
          current.p = target;
        } else {
          current.p += (target - current.p) * (1 - Math.exp(-dt * 9));
        }

        const written = Math.round(current.p * 10000) / 10000;
        if (written !== current.written) {
          current.written = written;
          chapter.style.setProperty("--p", String(written));
          writeCamera(chapter, current.p, damp);
        }
      });
    };

    if (motion.matches) {
      freeze();
      return;
    }

    root.dataset.live = "true";
    measure(performance.now(), false);

    const tick = (now: number) => {
      if (!running) return;
      measure(now, true);
      raf.id = window.requestAnimationFrame(tick);
    };

    raf.id = window.requestAnimationFrame(tick);

    const onMotionChange = () => {
      if (!motion.matches) return;
      running = false;
      window.cancelAnimationFrame(raf.id);
      freeze();
    };

    motion.addEventListener("change", onMotionChange);
    return () => {
      running = false;
      window.cancelAnimationFrame(raf.id);
      motion.removeEventListener("change", onMotionChange);
      delete root.dataset.live;
    };
  }, []);

  return (
    <main ref={rootRef} className="explained-root">
      <a className="explained-skip focus-ring" href="#explained-end">
        Skip trailer
      </a>

      <Chapter id="explained-title" camera="title" len={1.45} index="01" label="Title">
        <div className="explained-title-row">
          <div className="explained-headshot">
            <Image
              src={story.headshotSrc}
              alt={`${story.name} headshot`}
              width={112}
              height={112}
              priority
            />
          </div>
          <div>
            <h1 className="explained-name">{story.name}</h1>
            <p className="explained-tag">{story.tagline}</p>
          </div>
        </div>
        <p className="explained-meta">
          {story.age} · {story.pronouns} · {story.location}
        </p>
        <p className="explained-scroll-hint">Scroll the trailer</p>
      </Chapter>

      <Chapter id="explained-who" camera="who" len={2.55} index="02" label="Who">
        <Piece a={-0.4} b={0} spin="-5deg">
          <div className="explained-card">
            <span>Chapter</span>
            <strong>Who</strong>
          </div>
        </Piece>
        <Piece a={-0.08} b={0.18} spin="4deg">
          <article className="explained-doc" style={{ marginTop: 16 }}>
            <div className="explained-doc-bar">
              <span className="explained-doc-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              document // bio
            </div>
            <ol>
              {story.whoLines.map((line, index) => (
                <li key={line.text} data-hot={line.highlight ? "true" : undefined}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {line.highlight ? (
                    <span
                      className="explained-hl"
                      style={{ "--a": 0.42, "--b": 0.66 } as CSSProperties}
                    >
                      {line.text}
                    </span>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </li>
              ))}
            </ol>
          </article>
        </Piece>
        <Piece a={0.7} b={0.86} spin="-3deg">
          <p className="explained-aside">{story.whoAside}</p>
          {story.educationLine ? <p className="explained-aside">{story.educationLine}</p> : null}
        </Piece>
      </Chapter>

      <Chapter id="explained-tiber" camera="tiber" len={3.7} index="03" label="TIBER">
        <div className="explained-tiber">
          <div>
            <Piece a={-0.4} b={0} spin="-6deg">
              <div className="explained-card">
                <span>Chapter</span>
                <strong>TIBER</strong>
              </div>
            </Piece>
            <Piece a={-0.06} b={0.14} spin="3deg">
              <p className="explained-tiber-intro" style={{ marginTop: 16 }}>
                {story.tiberIntro}
              </p>
            </Piece>
            <div className="explained-tiber-word" aria-hidden="true">
              {story.pillars.map((pillar, index) => {
                const a = 0.18 + index * 0.1;
                return (
                  <Piece
                    key={pillar.key}
                    as="span"
                    a={a}
                    b={a + 0.12}
                    spin={index % 2 === 0 ? "-8deg" : "7deg"}
                  >
                    <span
                      className="explained-mark"
                      style={{ "--a": a + 0.04, "--b": a + 0.16 } as CSSProperties}
                    >
                      {pillar.key}
                    </span>
                  </Piece>
                );
              })}
            </div>
          </div>
          <div className="explained-pillars">
            {story.pillars.map((pillar, index) => {
              const a = 0.28 + index * 0.1;
              return (
                <Piece key={pillar.label} a={a} b={a + 0.14} spin={index % 2 === 0 ? "5deg" : "-4deg"}>
                  <div className="explained-pillar">
                    <span className="explained-pillar-key">{pillar.key}</span>
                    <div>
                      <h3>{pillar.label}</h3>
                      <p>{pillar.desc}</p>
                    </div>
                  </div>
                </Piece>
              );
            })}
          </div>
        </div>
      </Chapter>

      <Chapter id="explained-building" camera="building" len={2.7} index="04" label="Building">
        <Piece a={-0.4} b={0} spin="-5deg">
          <div className="explained-card">
            <span>Chapter</span>
            <strong>Building</strong>
          </div>
        </Piece>
        <div className="explained-builds" style={{ marginTop: 28 }}>
          {story.projects.map((project, index) => {
            const a = 0.08 + index * 0.18;
            const external = project.href.startsWith("http");
            return (
              <Piece key={project.id} a={a} b={a + 0.16} spin={index === 1 ? "6deg" : "-4deg"}>
                <a
                  className="explained-build focus-ring"
                  href={project.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {project.imageSrc ? (
                    <div className="explained-build-media">
                      <Image src={project.imageSrc} alt={project.imageAlt} fill sizes="(min-width: 900px) 28vw, 90vw" />
                    </div>
                  ) : null}
                  <div className="explained-build-body">
                    <span>0{index + 1}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <em>{external ? "Open live build →" : "See on the site →"}</em>
                  </div>
                </a>
              </Piece>
            );
          })}
        </div>
      </Chapter>

      <Chapter id="explained-end" camera="end" len={1.6} index="05" label="End card">
        <Piece a={-0.4} b={0.08} spin="-6deg">
          <div className="explained-end">
            <div className="explained-end-card">
              <span className="explained-meta">End card</span>
              <h2>The rest lives on the site.</h2>
              <p>{story.closing}</p>
              <div className="explained-doors">
                {story.doors.map((door) => {
                  const download = door.href.endsWith(".pdf");
                  const external = door.href.startsWith("http");
                  if (external || download) {
                    return (
                      <a
                        key={door.href}
                        className="explained-door focus-ring"
                        href={door.href}
                        {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {door.label}
                        <span>{door.hint}</span>
                      </a>
                    );
                  }
                  return (
                    <Link key={door.href} className="explained-door focus-ring" href={door.href}>
                      {door.label}
                      <span>{door.hint}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Piece>
      </Chapter>
    </main>
  );
}

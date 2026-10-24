"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  fullExplainerCameras,
  type CameraKeyframe,
  type ExplainerDoor,
  type FullExplainerStory,
} from "@/app/explained/full/types";

type PieceProps = {
  a: number;
  b: number;
  c?: number;
  d?: number;
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
  wide?: boolean;
  end?: boolean;
  skylineSrc?: string;
  children: ReactNode;
};

const PIN_SLOTS = [
  { left: "7%", top: "58%" },
  { left: "20%", top: "26%" },
  { left: "33%", top: "64%" },
  { left: "41%", top: "18%" },
  { left: "52%", top: "48%" },
  { left: "61%", top: "22%" },
  { left: "72%", top: "60%" },
  { left: "78%", top: "30%" },
  { left: "14%", top: "40%" },
] as const;

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
  const camera = chapter.querySelector<HTMLElement>("[data-explained-full-camera]");
  if (!camera) return;
  const key = chapter.dataset.camera ?? "";
  const keys = fullExplainerCameras[key];
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

function Piece({ a, b, c, d, spin, as = "div", className, children }: PieceProps) {
  const Tag = as;
  const style = {
    "--a": a,
    "--b": b,
    ...(c !== undefined ? { "--c": c } : {}),
    ...(d !== undefined ? { "--d": d } : {}),
    ...(spin ? { "--spin": spin } : {}),
  } as CSSProperties;

  return (
    <Tag className={["explained-full-piece", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </Tag>
  );
}

function Highlight({
  a,
  b,
  children,
}: {
  a: number;
  b: number;
  children: ReactNode;
}) {
  return (
    <span className="explained-full-hl" style={{ "--a": a, "--b": b } as CSSProperties}>
      {children}
    </span>
  );
}

function withHighlight(text: string, phrase: string, a: number, b: number): ReactNode {
  const index = text.indexOf(phrase);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <Highlight a={a} b={b}>
        {phrase}
      </Highlight>
      {text.slice(index + phrase.length)}
    </>
  );
}

function Chapter({
  id,
  camera,
  len,
  index,
  label,
  wide,
  end,
  skylineSrc,
  children,
}: ChapterProps) {
  const style = { "--len": len } as CSSProperties;

  return (
    <section
      id={id}
      className="explained-full-chapter"
      data-explained-full-chapter=""
      data-camera={camera}
      data-end={end ? "true" : undefined}
      style={style}
      aria-label={label}
    >
      <div className="explained-full-stage">
        <div className="explained-full-kicker">
          <strong>{index}</strong>
          <span>{label}</span>
        </div>
        {skylineSrc ? (
          <div className="explained-full-skyline" aria-hidden="true">
            <Image src={skylineSrc} alt="" fill sizes="100vw" priority />
          </div>
        ) : null}
        <div className="explained-full-vignette" aria-hidden="true" />
        <div className="explained-full-grain" aria-hidden="true" />
        <div className="explained-full-frame">
          <div
            className={["explained-full-camera", wide ? "explained-full-camera-wide" : ""]
              .filter(Boolean)
              .join(" ")}
            data-explained-full-camera=""
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Door({ door }: { door: ExplainerDoor }) {
  const className = "explained-full-door focus-ring";
  const body = (
    <>
      {door.label}
      <span>{door.hint}</span>
    </>
  );

  if (door.href.endsWith(".pdf")) {
    return (
      <a className={className} href={door.href} download>
        {body}
      </a>
    );
  }
  if (door.href.startsWith("mailto:")) {
    return (
      <a className={className} href={door.href}>
        {body}
      </a>
    );
  }
  if (door.href.startsWith("http")) {
    return (
      <a className={className} href={door.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  return (
    <Link className={className} href={door.href}>
      {body}
    </Link>
  );
}

function formatCount(value: number | null): string {
  return value === null ? "—" : value.toLocaleString("en-AU");
}

export function FullExplainer({ story }: { story: FullExplainerStory }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-explained-full-chapter]"));
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
        const stage = chapter.querySelector<HTMLElement>(".explained-full-stage");
        const stageHeight = stage?.offsetHeight ?? vh;
        const pinTop = stage ? Number.parseFloat(getComputedStyle(stage).top) || 0 : 0;
        const range = Math.max(1, chapter.offsetHeight - stageHeight);
        const farBelow = rect.bottom < -vh;
        const farAbove = rect.top > vh * 1.35;
        const target = farBelow ? 1 : farAbove ? 0 : clamp01((pinTop - rect.top) / range);

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

  const jobs = [...story.founderJobs, ...story.otherJobs];

  return (
    <main ref={rootRef} className="explained-full-root">
      <a className="explained-full-skip focus-ring" href="#explained-full-end">
        Skip full trailer
      </a>

      <Chapter
        id="explained-full-identity"
        camera="identity"
        len={2.35}
        index="01"
        label="Identity"
        skylineSrc={story.skylineSrc}
      >
        <Piece a={-0.5} b={0.04} c={0.38} d={0.52} spin="-3deg">
          <div className="explained-full-title-row">
            <div className="explained-full-headshot">
              <Image
                src={story.headshotSrc}
                alt={`${story.name} headshot`}
                width={112}
                height={112}
                priority
              />
            </div>
            <div>
              <h1 className="explained-full-name">{story.name}</h1>
              <p className="explained-full-tag">{story.tagline}</p>
            </div>
          </div>
          <p className="explained-full-meta">
            {story.age} · {story.pronouns} · {story.location}
          </p>
        </Piece>
        <div className="explained-full-roles">
          {story.roles.map((role, index) => {
            const a = 0.06 + index * 0.05;
            return (
              <Piece
                key={role.text}
                as="span"
                a={a}
                b={a + 0.1}
                c={0.36}
                d={0.5}
                spin={index % 2 === 0 ? "-4deg" : "5deg"}
              >
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explained-full-role focus-ring"
                  >
                    {role.text}
                  </a>
                ) : (
                  <span className="explained-full-role">{role.text}</span>
                )}
              </Piece>
            );
          })}
        </div>
        <Piece a={0.34} b={0.52} spin="4deg">
          <article className="explained-full-doc" style={{ marginTop: 18 }}>
            <div className="explained-full-doc-bar">
              <span className="explained-full-doc-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              document // about
            </div>
            <ol>
              {story.aboutLines.map((line, index) => (
                <li key={line.highlight} data-hot={index === 1 ? "true" : undefined}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>
                    {withHighlight(line.text, line.highlight, 0.48 + index * 0.08, 0.64 + index * 0.08)}
                  </span>
                </li>
              ))}
            </ol>
          </article>
        </Piece>
        <Piece a={-0.2} b={0.08} c={0.28} d={0.4}>
          <p className="explained-full-scroll-hint">Scroll the full trailer</p>
        </Piece>
      </Chapter>

      <Chapter id="explained-full-tiber" camera="tiber" len={3.4} index="02" label="TIBER">
        <div className="explained-full-tiber">
          <div>
            <Piece a={-0.4} b={0} spin="-6deg">
              <div className="explained-full-card">
                <span>Chapter</span>
                <strong>TIBER</strong>
              </div>
            </Piece>
            <Piece a={-0.06} b={0.14} spin="3deg">
              <p className="explained-full-tiber-intro" style={{ marginTop: 16 }}>
                {story.tiberIntro}
              </p>
            </Piece>
            <div className="explained-full-tiber-word" aria-hidden="true">
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
                      className="explained-full-mark"
                      style={{ "--a": a + 0.04, "--b": a + 0.16 } as CSSProperties}
                    >
                      {pillar.key}
                    </span>
                  </Piece>
                );
              })}
            </div>
          </div>
          <div className="explained-full-pillars">
            {story.pillars.map((pillar, index) => {
              const a = 0.28 + index * 0.1;
              return (
                <Piece key={pillar.label} a={a} b={a + 0.14} spin={index % 2 === 0 ? "5deg" : "-4deg"}>
                  <div className="explained-full-pillar">
                    <span className="explained-full-pillar-key">{pillar.key}</span>
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

      <Chapter id="explained-full-path" camera="path" len={3.5} index="03" label="Path" wide>
        <Piece a={-0.4} b={0} spin="-5deg">
          <div className="explained-full-card">
            <span>Chapter</span>
            <strong>Experience + education</strong>
          </div>
        </Piece>
        <Piece a={0.04} b={0.18} spin="3deg">
          <p className="explained-full-aside">
            {story.founderJobs.length} founder roles · {story.otherJobs.length} other roles ·{" "}
            {story.education.length} education entries
          </p>
        </Piece>
        <div className="explained-full-vrail-wrap">
          <div className="explained-full-vrail">
            {jobs.map((job) => (
              <article key={`${job.org}-${job.title}`} className="explained-full-job">
                <b>{job.founder ? "FOUNDER" : "ROLE"}</b>
                <h3>
                  {job.title} · {job.org}
                </h3>
                <p>
                  {job.type} · {job.date}
                </p>
              </article>
            ))}
            {story.education.map((item) => (
              <article key={`${item.school}-${item.date}`} className="explained-full-edu">
                <b>EDUCATION</b>
                <h3>{item.school}</h3>
                <p>
                  {item.detail} · {item.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter id="explained-full-builds" camera="builds" len={3.45} index="04" label="Builds" wide>
        <Piece a={-0.4} b={0} spin="-5deg">
          <div className="explained-full-card">
            <span>Chapter</span>
            <strong>Skills + projects</strong>
          </div>
        </Piece>
        <Piece a={0.02} b={0.16} spin="4deg">
          <p className="explained-full-skills" style={{ marginTop: 16 }}>
            {withHighlight(story.skills, "Information Technology", 0.12, 0.28)}
          </p>
          <p className="explained-full-aside">{story.skillsNote}</p>
        </Piece>
        <div className="explained-full-rail-wrap">
          <div className="explained-full-rail">
            {story.projects.map((project, index) => {
              const external = project.href.startsWith("http");
              const n = String(index + 1).padStart(2, "0");
              return (
                <a
                  key={project.id}
                  className="explained-full-build focus-ring"
                  href={project.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {project.imageSrc ? (
                    <div className="explained-full-build-media">
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fill
                        sizes="280px"
                      />
                    </div>
                  ) : null}
                  <div className="explained-full-build-body">
                    <span>
                      {n}
                      {project.badge ? ` · ${project.badge}` : ""}
                    </span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <em>{external ? "Open live build →" : "See on the site →"}</em>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </Chapter>

      <Chapter id="explained-full-proof" camera="proof" len={2.7} index="05" label="Proof">
        <Piece a={-0.4} b={0} spin="-6deg">
          <div className="explained-full-card">
            <span>Chapter</span>
            <strong>GitHub, resume, LinkedIn</strong>
          </div>
        </Piece>
        <Piece a={0.02} b={0.16} c={0.46} d={0.6} spin="3deg">
          <p className="explained-full-aside" style={{ marginTop: 12 }}>
            Last year on{" "}
            <Highlight a={0.18} b={0.34}>
              @{story.github.username}
            </Highlight>
          </p>
          <div className="explained-full-stats">
            <div className="explained-full-stat">
              <strong>{formatCount(story.github.total)}</strong>
              <span>contributions</span>
            </div>
            <div className="explained-full-stat">
              <strong>{formatCount(story.github.activeDays)}</strong>
              <span>active days</span>
            </div>
            <div className="explained-full-stat">
              <strong>{formatCount(story.github.busiestDay)}</strong>
              <span>busiest day</span>
            </div>
          </div>
        </Piece>
        <Piece a={0.32} b={0.46} spin="-4deg">
          <div className="explained-full-list">
            <Link className="explained-full-line focus-ring" href="/#resume">
              <b>01</b>
              <span>Resume on the site — inline preview at /#resume</span>
            </Link>
            <a className="explained-full-line focus-ring" href="/resume.pdf" download>
              <b>02</b>
              <span>Download PDF — resume.pdf</span>
            </a>
          </div>
        </Piece>
        <Piece a={0.52} b={0.68} spin="4deg">
          <p className="explained-full-aside">
            {story.linkedInCount} featured LinkedIn posts
          </p>
          <div className="explained-full-list">
            {story.linkedInPosts.slice(0, 4).map((post, index) => (
              <div key={post.id} className="explained-full-line">
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{post.title}</span>
              </div>
            ))}
          </div>
        </Piece>
      </Chapter>

      <Chapter id="explained-full-life" camera="life" len={2.65} index="06" label="Life">
        <Piece a={-0.4} b={0} spin="-5deg">
          <div className="explained-full-card">
            <span>Chapter</span>
            <strong>Checklist, quiz, blog</strong>
          </div>
        </Piece>
        <Piece a={0.02} b={0.16} spin="3deg">
          <div className="explained-full-stats">
            <div className="explained-full-stat">
              <strong>{story.life.done}</strong>
              <span>checked</span>
            </div>
            <div className="explained-full-stat">
              <strong>{story.life.remaining}</strong>
              <span>still ahead</span>
            </div>
            <div className="explained-full-stat">
              <strong>{story.life.total}</strong>
              <span>total</span>
            </div>
          </div>
          <div className="explained-full-life">
            {story.life.samples.map((item) => (
              <span key={item.id} className="explained-full-chip" data-done={item.done ? "true" : "false"}>
                {item.done ? "✓" : "○"} {item.label}
              </span>
            ))}
          </div>
        </Piece>
        <Piece a={0.4} b={0.56} spin="-3deg">
          <p className="explained-full-aside">
            Pop quiz — {story.quizCount} questions, streak bonuses, light roasts.{" "}
            <Link href="/pop-quiz" className="explained-full-hl" style={{ "--a": 0.48, "--b": 0.62 } as CSSProperties}>
              Take it at /pop-quiz
            </Link>
          </p>
        </Piece>
        <Piece a={0.58} b={0.74} spin="4deg">
          <div className="explained-full-list">
            {story.posts.length > 0 ? (
              story.posts.map((post, index) => (
                <Link key={post.slug} className="explained-full-line focus-ring" href={`/blog/${post.slug}`}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>
                    {post.title} · {post.date}
                  </span>
                </Link>
              ))
            ) : (
              <p className="explained-full-aside">No posts yet — check back soon.</p>
            )}
            <Link className="explained-full-line focus-ring" href="/blog">
              <b>→</b>
              <span>All posts on /blog</span>
            </Link>
          </div>
        </Piece>
      </Chapter>

      <Chapter id="explained-full-contact" camera="contact" len={1.85} index="07" label="Contact">
        <Piece a={-0.4} b={0.08} spin="-6deg">
          <div className="explained-full-card">
            <span>Chapter</span>
            <strong>Contact</strong>
          </div>
        </Piece>
        <Piece a={0.04} b={0.2} spin="3deg">
          <p className="explained-full-tiber-intro" style={{ marginTop: 16 }}>
            {story.closing}
          </p>
          <p className="explained-full-aside">Work arrangement: {story.openToWork}</p>
          <p className="explained-full-aside">{story.volunteerNote}</p>
        </Piece>
        <Piece a={0.22} b={0.4} spin="-3deg">
          <div className="explained-full-doors" style={{ marginTop: 16 }}>
            {story.contactLinks.map((link) => (
              <Door key={link.href} door={link} />
            ))}
          </div>
        </Piece>
      </Chapter>

      <Chapter id="explained-full-maps" camera="maps" len={2.55} index="08" label="Maps">
        <Piece a={-0.4} b={0} spin="-5deg">
          <div className="explained-full-card">
            <span>Chapter</span>
            <strong>Travel + infrastructure</strong>
          </div>
        </Piece>
        <Piece a={0.02} b={0.16} c={0.48} d={0.62} spin="3deg">
          <div className="explained-full-stats">
            <div className="explained-full-stat">
              <strong>{story.travel.countries}</strong>
              <span>countries</span>
            </div>
            <div className="explained-full-stat">
              <strong>{story.travel.cities}</strong>
              <span>cities</span>
            </div>
            <div className="explained-full-stat">
              <strong>
                {story.travel.lived}/{story.travel.explored}/{story.travel.layover}
              </strong>
              <span>lived / explored / layover</span>
            </div>
          </div>
          <div className="explained-full-pins" aria-hidden="true">
            {story.travel.pins.map((pin, index) => {
              const slot = PIN_SLOTS[index] ?? PIN_SLOTS[0];
              return (
                <span
                  key={pin.name}
                  className="explained-full-pin"
                  data-kind={pin.kind}
                  style={{ left: slot.left, top: slot.top }}
                >
                  <i />
                  {pin.name}
                </span>
              );
            })}
          </div>
        </Piece>
        <Piece a={0.42} b={0.58} spin="-4deg">
          <p className="explained-full-aside">
            {story.infrastructure.count} megaprojects on the infrastructure map
          </p>
          <div className="explained-full-list">
            {story.infrastructure.samples.map((project, index) => (
              <div key={project.id} className="explained-full-line">
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>
                  {project.name} — {project.location}
                </span>
              </div>
            ))}
          </div>
        </Piece>
        <Piece a={0.7} b={0.84} spin="3deg">
          <div className="explained-full-list">
            <Link className="explained-full-line focus-ring" href="/#travel">
              <b>→</b>
              <span>Open the travel map on the homepage</span>
            </Link>
            <Link className="explained-full-line focus-ring" href="/#infrastructure">
              <b>→</b>
              <span>Open the infrastructure map on the homepage</span>
            </Link>
          </div>
        </Piece>
      </Chapter>

      <Chapter id="explained-full-end" camera="end" len={2.05} index="09" label="End card" end>
        <Piece a={-0.4} b={0.08} spin="-6deg">
          <div className="explained-full-end">
            <div className="explained-full-end-card">
              <span className="explained-full-meta">End card</span>
              <h2>The rest lives on the site.</h2>
              <p>{story.closing}</p>
              <div className="explained-full-doors">
                {story.doors.map((door) => (
                  <Door key={door.href} door={door} />
                ))}
              </div>
            </div>
          </div>
        </Piece>
      </Chapter>
    </main>
  );
}

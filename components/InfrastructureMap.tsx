"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  infrastructureProjects,
  type InfrastructureImage,
  type InfrastructureProject,
  type RouteStation,
  type RouteTone,
} from "@/app/infrastructure-data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const WIDTH = 800;
const HEIGHT = 740;
/** Region framed by the map: Bay of Bengal to Borneo, Java up to Tibet and Shanghai. */
const REGION: [number, number][] = [
  [92, -8],
  [124, 33],
];
const CLOSE_DELAY_MS = 180;
const MIN_K = 1;
const MAX_K = 8;
/** Pointer travel (screen px) before a press becomes a pan, so pin clicks still register. */
const DRAG_THRESHOLD = 4;

type ViewTransform = { k: number; x: number; y: number };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clampPan(k: number, x: number, y: number): ViewTransform {
  if (k <= MIN_K) return { k: MIN_K, x: 0, y: 0 };
  return {
    k,
    x: clamp(x, WIDTH - WIDTH * k, 0),
    y: clamp(y, HEIGHT - HEIGHT * k, 0),
  };
}

type CountryFeature = Feature<Geometry, { name?: string }> & { id?: string | number };

type WindowMode = "normal" | "minimized" | "maximized";

type WindowControls = {
  mode: WindowMode;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onRestore: () => void;
  onClose: () => void;
};

/** `x`/`y` is where the pin is drawn; `ax`/`ay` is the project's true location. */
type Pin = { project: InfrastructureProject; index: number; x: number; y: number; ax: number; ay: number };

const hostCountries = new Set(
  infrastructureProjects.flatMap((project) => [project.countryNumeric, ...(project.alsoCountries ?? [])]),
);

function CardImages({
  images,
  sizes,
  className,
}: {
  images: readonly InfrastructureImage[];
  sizes: string;
  className: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const current = images[Math.min(active, images.length - 1)];
  const step = (delta: number) => setActive((i) => (i + delta + images.length) % images.length);

  return (
    <div className={`group/gallery relative bg-canvas ${className}`}>
      <Image key={current.src} src={current.src} alt={current.alt} fill sizes={sizes} className="object-contain" />
      {images.length > 1 ? (
        <>
          {([-1, 1] as const).map((delta) => (
            <button
              key={delta}
              type="button"
              aria-label={delta < 0 ? "Previous image" : "Next image"}
              onClick={(event) => {
                event.stopPropagation();
                step(delta);
              }}
              className={[
                "absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-strong bg-surface-elevated/85 text-on-dark opacity-80 transition hover:opacity-100",
                delta < 0 ? "left-2" : "right-2",
              ].join(" ")}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d={delta < 0 ? "M7.5 2.5 4 6l3.5 3.5" : "M4.5 2.5 8 6l-3.5 3.5"} />
              </svg>
            </button>
          ))}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-surface-elevated/80 px-2 py-1">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === active}
                onClick={(event) => {
                  event.stopPropagation();
                  setActive(i);
                }}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-primary" : "w-1.5 bg-mute/60"}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function NumberBadge({ index }: { index: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-caption-sm font-semibold text-canvas">
      {index + 1}
    </span>
  );
}

function stationLabelPlacement(side: RouteStation["labelSide"]): {
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
} {
  switch (side) {
    case "left":
      return { dx: -8, dy: 3.5, anchor: "end" };
    case "right":
      return { dx: 8, dy: 3.5, anchor: "start" };
    case "above":
      return { dx: 0, dy: -8, anchor: "middle" };
    case "below":
      return { dx: 0, dy: 15, anchor: "middle" };
    default: {
      const unreachable: never = side;
      return unreachable;
    }
  }
}

function routeColor(tone: RouteTone): string {
  switch (tone) {
    case "theme":
      return "rgb(var(--color-primary))";
    case "central":
      return "#1e90dc";
    case "eastern":
      return "#2fb54a";
    case "western":
      return "#f2852a";
    default: {
      const unreachable: never = tone;
      return unreachable;
    }
  }
}

function WindowButton({
  label,
  onClick,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={[
        "flex h-7 w-8 items-center justify-center rounded-sm text-on-dark transition-colors",
        danger ? "hover:bg-accent-red hover:text-canvas" : "hover:bg-surface-card",
      ].join(" ")}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        {children}
      </svg>
    </button>
  );
}

function TitleBar({
  project,
  index,
  controls,
}: {
  project: InfrastructureProject;
  index: number;
  controls: WindowControls;
}) {
  const minimized = controls.mode === "minimized";
  return (
    <div
      className={[
        "flex items-center gap-2 border-b border-hairline bg-surface-card/70 py-1 pl-2.5 pr-1",
        minimized ? "cursor-pointer border-b-0" : "",
      ].join(" ")}
      onClick={minimized ? controls.onRestore : undefined}
      onDoubleClick={minimized ? undefined : controls.onToggleMaximize}
    >
      <NumberBadge index={index} />
      <p className="min-w-0 flex-1 truncate text-caption-md font-medium text-on-dark">{project.name}</p>
      <div className="flex shrink-0 items-center">
        {minimized ? (
          <WindowButton label="Restore" onClick={controls.onRestore}>
            <rect x="2" y="2" width="8" height="8" rx="1" />
          </WindowButton>
        ) : (
          <WindowButton label="Minimise" onClick={controls.onMinimize}>
            <path d="M2 6h8" />
          </WindowButton>
        )}
        {!minimized ? (
          <WindowButton
            label={controls.mode === "maximized" ? "Restore down" : "Maximise"}
            onClick={controls.onToggleMaximize}
          >
            {controls.mode === "maximized" ? (
              <>
                <rect x="1.5" y="3.5" width="7" height="7" rx="1" />
                <path d="M3.5 3.5V1.5h7v7h-2" />
              </>
            ) : (
              <rect x="1.5" y="1.5" width="9" height="9" rx="1" />
            )}
          </WindowButton>
        ) : null}
        <WindowButton label="Close" onClick={controls.onClose} danger>
          <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
        </WindowButton>
      </div>
    </div>
  );
}

function ProjectDetails({ project, index, showHeading }: { project: InfrastructureProject; index: number; showHeading: boolean }) {
  return (
    <div className="space-y-3 p-4">
      {showHeading ? (
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5">
            <NumberBadge index={index} />
          </span>
          <div className="min-w-0">
            <p className="text-body-sm-strong text-ink">{project.name}</p>
            <p className="text-caption-sm text-mute">{project.location}</p>
          </div>
        </div>
      ) : (
        <p className="text-caption-sm text-mute">{project.location}</p>
      )}
      <p className="inline-flex rounded-full border border-hairline bg-surface px-2.5 py-0.5 text-caption-sm text-on-dark">
        {project.status}
      </p>
      <p className="text-body-sm text-body">{project.description}</p>
      <ul className="space-y-1.5 border-t border-hairline pt-3">
        {project.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-body-sm text-primary underline decoration-primary/35 underline-offset-2 outline-none hover:decoration-primary focus-visible:decoration-primary"
            >
              {link.label}
              <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  controls,
  hint,
}: {
  project: InfrastructureProject;
  index: number;
  controls?: WindowControls;
  hint?: string;
}) {
  const mode = controls?.mode ?? "normal";
  const shell =
    "overflow-hidden rounded-lg border border-hairline-strong bg-surface-elevated shadow-[0_24px_60px_-18px_rgb(0_0_0/0.55)]";

  switch (mode) {
    case "minimized":
      return controls ? (
        <div className={shell}>
          <TitleBar project={project} index={index} controls={controls} />
        </div>
      ) : null;
    case "maximized":
      return controls ? (
        <div className={`${shell} flex h-full flex-col`}>
          <TitleBar project={project} index={index} controls={controls} />
          <div
            className={`grid min-h-0 flex-1 ${project.images.length > 0 ? "md:grid-cols-[1.25fr_1fr]" : ""}`}
          >
            <CardImages images={project.images} sizes="(min-width: 1024px) 560px, 100vw" className="min-h-48" />
            <div className="min-h-0 overflow-y-auto">
              <ProjectDetails project={project} index={index} showHeading={false} />
            </div>
          </div>
        </div>
      ) : null;
    case "normal":
      return (
        <div className={shell}>
          {controls ? <TitleBar project={project} index={index} controls={controls} /> : null}
          <CardImages images={project.images} sizes="320px" className="aspect-[16/10] w-full" />
          <ProjectDetails project={project} index={index} showHeading={!controls} />
          {hint ? <p className="border-t border-hairline px-4 py-2 text-caption-sm text-mute">{hint}</p> : null}
        </div>
      );
    default: {
      const unreachable: never = mode;
      return unreachable;
    }
  }
}

const EDGE = 8;
const PIN_GAP = 22;

/** Positions `children` beside a map pin, clamped so the card stays inside the map frame. */
function AnchoredCard({
  pin,
  className,
  children,
  ...handlers
}: {
  pin: Pin;
  className: string;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const place = () => {
      const parent = el.offsetParent as HTMLElement | null;
      if (!parent) return;
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const px = (pin.x / WIDTH) * pw;
      const py = (pin.y / HEIGHT) * ph;
      const right = px + PIN_GAP;
      const left = px - PIN_GAP - w;
      const x = right + w <= pw - EDGE ? right : Math.max(EDGE, left);
      const y = Math.min(Math.max(EDGE, py - h / 2), Math.max(EDGE, ph - h - EDGE));
      setPos({ left: x, top: y });
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(el);
    if (el.parentElement) observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, [pin]);

  return (
    <div
      ref={ref}
      className={className}
      style={pos ? { left: pos.left, top: pos.top } : { left: 0, top: 0, visibility: "hidden" }}
      {...handlers}
    >
      {children}
    </div>
  );
}

function windowFrame(mode: WindowMode): { className: string; anchored: boolean } {
  switch (mode) {
    case "normal":
      return { className: "absolute z-30 w-80", anchored: true };
    case "minimized":
      return { className: "absolute bottom-3 left-3 z-30 w-72", anchored: false };
    case "maximized":
      return { className: "absolute inset-3 z-30", anchored: false };
    default: {
      const unreachable: never = mode;
      return unreachable;
    }
  }
}

export function InfrastructureMap() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [mode, setMode] = useState<WindowMode>("normal");
  const [lastId, setLastId] = useState<string | null>(null);
  const [view, setView] = useState<ViewTransform>({ k: 1, x: 0, y: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    panning: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(GEO_URL);
        if (!response.ok) throw new Error(`Failed to load map (${response.status})`);
        const topology = await response.json();
        const collection = feature(topology, topology.objects.countries) as unknown as FeatureCollection;
        if (!cancelled) setCountries(collection.features as CountryFeature[]);
      } catch {
        if (!cancelled) setLoadError(true);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const { pathGenerator, projection } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [0, 0],
        [WIDTH, HEIGHT],
      ],
      { type: "MultiPoint", coordinates: REGION },
    );
    return { pathGenerator: geoPath(projection), projection };
  }, []);

  const pins = useMemo<Pin[]>(
    () =>
      infrastructureProjects.flatMap((project, index) => {
        const xy = projection([project.lng, project.lat]);
        if (!xy) return [];
        const ax = xy[0] * view.k + view.x;
        const ay = xy[1] * view.k + view.y;
        const [dx, dy] = project.pinOffset ?? [0, 0];
        return [{ project, index, x: ax + dx, y: ay + dy, ax, ay }];
      }),
    [projection, view],
  );

  const routes = useMemo(
    () =>
      infrastructureProjects
        .flatMap((project) =>
          (project.routes ?? []).map((route, routeIndex) => {
            const toScreen = (coord: [number, number]): [number, number] | null => {
              const xy = projection(coord);
              return xy ? [xy[0] * view.k + view.x, xy[1] * view.k + view.y] : null;
            };
            const points = route.path.flatMap((coord) => {
              const xy = toScreen(coord);
              return xy ? [xy] : [];
            });
            const stations = route.stations.flatMap((station) => {
              const xy = toScreen([station.lng, station.lat]);
              return xy ? [{ ...station, x: xy[0], y: xy[1] }] : [];
            });
            const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
            return {
              key: `${project.id}-${routeIndex}`,
              project,
              d,
              stations,
              color: routeColor(route.tone ?? "theme"),
              planned: route.planned ?? false,
            };
          }),
        )
        .sort((a, b) => Number(b.planned) - Number(a.planned)),
    [projection, view],
  );

  const toViewBox = useCallback((clientX: number, clientY: number) => {
    const el = svgRef.current;
    if (!el) return { mx: WIDTH / 2, my: HEIGHT / 2 };
    const rect = el.getBoundingClientRect();
    return {
      mx: ((clientX - rect.left) / rect.width) * WIDTH,
      my: ((clientY - rect.top) / rect.height) * HEIGHT,
    };
  }, []);

  const zoomAt = useCallback((mx: number, my: number, factor: number) => {
    setView((current) => {
      const nextK = clamp(current.k * factor, MIN_K, MAX_K);
      const nx = mx - ((mx - current.x) / current.k) * nextK;
      const ny = my - ((my - current.y) / current.k) * nextK;
      return clampPan(nextK, nx, ny);
    });
  }, []);

  const mapReady = countries.length > 0;

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const { mx, my } = toViewBox(event.clientX, event.clientY);
      zoomAt(mx, my, Math.exp(-event.deltaY * 0.002));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [mapReady, toViewBox, zoomAt]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<SVGSVGElement>) => {
      if (event.button !== 0) return;
      suppressClick.current = false;
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origX: view.x,
        origY: view.y,
        panning: false,
      };
    },
    [view.x, view.y],
  );

  const onPointerMove = useCallback((event: ReactPointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const moveX = event.clientX - drag.startX;
    const moveY = event.clientY - drag.startY;
    if (!drag.panning) {
      if (Math.hypot(moveX, moveY) < DRAG_THRESHOLD) return;
      drag.panning = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (moveX / rect.width) * WIDTH;
    const dy = (moveY / rect.height) * HEIGHT;
    setView((current) => clampPan(current.k, drag.origX + dx, drag.origY + dy));
  }, []);

  const onPointerUp = useCallback((event: ReactPointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    suppressClick.current = drag.panning;
    dragRef.current = null;
  }, []);

  const onClickCapture = useCallback((event: ReactMouseEvent<SVGSVGElement>) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.stopPropagation();
  }, []);

  const onDoubleClick = useCallback(
    (event: ReactMouseEvent<SVGSVGElement>) => {
      const { mx, my } = toViewBox(event.clientX, event.clientY);
      zoomAt(mx, my, 1.6);
    },
    [toViewBox, zoomAt],
  );

  const canZoomOut = view.k > MIN_K + 0.01;
  const canZoomIn = view.k < MAX_K - 0.01;

  const preview = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoverId(id);
  }, []);

  const scheduleHide = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHoverId(null), CLOSE_DELAY_MS);
  }, []);

  const pin = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoverId(null);
    setPinnedId(id);
    setLastId(id);
    setMode((current) => (current === "maximized" ? current : "normal"));
  }, []);

  const closeWindow = useCallback(() => {
    setPinnedId(null);
    setMode("normal");
  }, []);

  useEffect(() => {
    if (!pinnedId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeWindow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinnedId, closeWindow]);

  const controls: WindowControls = {
    mode,
    onMinimize: () => setMode("minimized"),
    onToggleMaximize: () => setMode((current) => (current === "maximized" ? "normal" : "maximized")),
    onRestore: () => setMode("normal"),
    onClose: closeWindow,
  };

  const pinnedPin = pins.find((p) => p.project.id === pinnedId) ?? null;
  const hoverPin =
    pinnedPin && mode !== "minimized" ? null : (pins.find((p) => p.project.id === hoverId) ?? null);
  const highlightId = pinnedId ?? hoverId;
  const mobilePin = pins.find((p) => p.project.id === lastId) ?? pins[0] ?? null;
  const frame = pinnedPin ? windowFrame(mode) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-x-8 lg:gap-y-3">
      <div className="min-w-0">
        <div className="relative rounded-md border border-hairline bg-[rgb(var(--color-primary)/0.07)]">
          {loadError ? (
            <p className="px-4 py-12 text-center text-body-sm text-mute">
              Couldn&apos;t load the map. Check your connection and try again.
            </p>
          ) : countries.length === 0 ? (
            <p className="px-4 py-12 text-center text-body-sm text-mute">Loading map…</p>
          ) : (
            <svg
              ref={svgRef}
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className={`h-auto w-full select-none overflow-hidden rounded-md ${view.k > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
              style={{ touchAction: "none" }}
              role="img"
              aria-label={`Zoomable map of Southeast and East Asia marking ${infrastructureProjects.length} infrastructure megaprojects`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClickCapture={onClickCapture}
              onDoubleClick={onDoubleClick}
            >
              <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                {countries.map((geo, i) => {
                  const id = String(geo.id ?? "");
                  const d = pathGenerator(geo);
                  if (!d) return null;
                  const isHost = hostCountries.has(id.padStart(3, "0"));
                  return (
                    <path
                      key={`${id || geo.properties?.name}-${i}`}
                      d={d}
                      fill={isHost ? "rgb(var(--color-primary) / 0.45)" : "rgb(var(--color-surface-elevated))"}
                      stroke={isHost ? "rgb(var(--color-primary) / 0.8)" : "rgb(var(--color-hairline-strong))"}
                      strokeWidth={isHost ? 0.9 : 0.6}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </g>

              {routes.map(({ key, project, d, color, planned }) => {
                const isActive = project.id === highlightId;
                return (
                  <g
                    key={key}
                    className="cursor-pointer"
                    onMouseEnter={() => preview(project.id)}
                    onMouseLeave={scheduleHide}
                    onClick={() => pin(project.id)}
                  >
                    <path d={d} fill="none" stroke="transparent" strokeWidth={14} strokeLinejoin="round" />
                    {planned ? (
                      <>
                        <path
                          d={d}
                          fill="none"
                          stroke="rgb(var(--color-canvas))"
                          strokeWidth={isActive ? 5.5 : 4.5}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeDasharray="0.1 5.5"
                        />
                        <path
                          d={d}
                          fill="none"
                          stroke={color}
                          strokeWidth={isActive ? 3.6 : 2.8}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeDasharray="0.1 5.5"
                          className="transition-[stroke-width] duration-200"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d={d}
                          fill="none"
                          stroke="rgb(var(--color-canvas))"
                          strokeWidth={isActive ? 6.5 : 5.5}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d={d}
                          fill="none"
                          stroke={color}
                          strokeWidth={isActive ? 3.5 : 2.6}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          className="transition-[stroke-width] duration-200"
                        />
                        <path
                          d={d}
                          fill="none"
                          stroke="rgb(var(--color-canvas))"
                          strokeWidth={1}
                          strokeDasharray="3 4"
                          opacity={0.7}
                          className="pointer-events-none"
                        />
                      </>
                    )}
                  </g>
                );
              })}

              {routes.map(({ key, stations, color }) => (
                <g key={`${key}-stations`} className="pointer-events-none">
                  {stations.map((station) => {
                    const label = stationLabelPlacement(station.labelSide);
                    return (
                      <g key={station.name}>
                        <circle
                          cx={station.x}
                          cy={station.y}
                          r={4}
                          fill="rgb(var(--color-canvas))"
                          stroke={color}
                          strokeWidth={2}
                        />
                        <text
                          x={station.x + label.dx}
                          y={station.y + label.dy}
                          textAnchor={label.anchor}
                          fontSize={10.5}
                          fontWeight={600}
                          fill="rgb(var(--color-on-dark))"
                          stroke="rgb(var(--color-canvas))"
                          strokeWidth={3}
                          paintOrder="stroke"
                          strokeLinejoin="round"
                        >
                          {station.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}

              {pins.map(({ project, x, y, ax, ay }) =>
                x === ax && y === ay ? null : (
                  <g key={`${project.id}-leader`} className="pointer-events-none">
                    <line
                      x1={ax}
                      y1={ay}
                      x2={x}
                      y2={y}
                      stroke="rgb(var(--color-primary))"
                      strokeWidth={1.4}
                      strokeDasharray="2 2"
                    />
                    <circle cx={ax} cy={ay} r={3} fill="rgb(var(--color-primary))" stroke="rgb(var(--color-canvas))" strokeWidth={1.2} />
                  </g>
                ),
              )}

              {pins.map(({ project, index, x, y }) => {
                const isActive = project.id === highlightId;
                return (
                  <g
                    key={project.id}
                    transform={`translate(${x} ${y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${project.name}: open details`}
                    aria-pressed={project.id === pinnedId}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => preview(project.id)}
                    onMouseLeave={scheduleHide}
                    onFocus={() => preview(project.id)}
                    onBlur={scheduleHide}
                    onClick={() => pin(project.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        pin(project.id);
                      }
                    }}
                  >
                    <circle r={10} fill="rgb(var(--color-primary))" opacity={0.5}>
                      <animate attributeName="r" values="10;26" dur="2.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      r={isActive ? 14 : 12}
                      fill="rgb(var(--color-primary))"
                      stroke="rgb(var(--color-canvas))"
                      strokeWidth={3}
                      className="transition-[r] duration-200"
                    />
                    <text
                      y={index >= 9 ? 4 : 4.5}
                      textAnchor="middle"
                      fontSize={index >= 9 ? 11 : 13}
                      fontWeight={700}
                      fill="rgb(var(--color-canvas))"
                      className="pointer-events-none"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}

          {mapReady ? (
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
              <button
                type="button"
                className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-elevated text-body-sm-strong text-on-dark disabled:opacity-40"
                aria-label="Zoom in"
                disabled={!canZoomIn}
                onClick={() => zoomAt(WIDTH / 2, HEIGHT / 2, 1.4)}
              >
                +
              </button>
              <button
                type="button"
                className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-elevated text-body-sm-strong text-on-dark disabled:opacity-40"
                aria-label="Zoom out"
                disabled={!canZoomOut}
                onClick={() => zoomAt(WIDTH / 2, HEIGHT / 2, 1 / 1.4)}
              >
                −
              </button>
              <button
                type="button"
                className="focus-ring inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-hairline bg-surface-elevated px-1.5 text-caption-sm text-on-dark disabled:opacity-40"
                aria-label="Reset map"
                disabled={!canZoomOut}
                onClick={() => setView({ k: 1, x: 0, y: 0 })}
              >
                Reset
              </button>
            </div>
          ) : null}

          {hoverPin ? (
            <AnchoredCard
              key={hoverPin.project.id}
              pin={hoverPin}
              className="absolute z-20 hidden w-80 md:block"
              onMouseEnter={() => preview(hoverPin.project.id)}
              onMouseLeave={scheduleHide}
            >
              <div className="animate-[infra-card-in_220ms_ease-out]">
                <ProjectCard
                  project={hoverPin.project}
                  index={hoverPin.index}
                  hint="Click the pin to keep this card open"
                />
              </div>
            </AnchoredCard>
          ) : null}

          {pinnedPin && frame ? (
            <div role="dialog" aria-label={`${pinnedPin.project.name} details`} className="contents">
              {frame.anchored ? (
                <AnchoredCard
                  key={pinnedPin.project.id}
                  pin={pinnedPin}
                  className={`${frame.className} hidden md:block`}
                >
                  <div className="animate-[infra-card-in_200ms_ease-out]">
                    <ProjectCard project={pinnedPin.project} index={pinnedPin.index} controls={controls} />
                  </div>
                </AnchoredCard>
              ) : (
                <div className={`${frame.className} hidden md:block`}>
                  <div
                    key={`${pinnedPin.project.id}-${mode}`}
                    className="h-full animate-[infra-card-in_200ms_ease-out]"
                  >
                    <ProjectCard project={pinnedPin.project} index={pinnedPin.index} controls={controls} />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {mobilePin ? (
          <div className="mt-4 md:hidden">
            <ProjectCard project={mobilePin.project} index={mobilePin.index} />
          </div>
        ) : null}
      </div>

      <ol className="space-y-2 lg:h-0 lg:min-h-full lg:overflow-y-auto lg:pr-1">
        {infrastructureProjects.map((project, index) => {
          const isActive = project.id === highlightId;
          return (
            <li key={project.id}>
              <button
                type="button"
                aria-pressed={project.id === pinnedId}
                className={[
                  "focus-ring flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left transition-colors duration-200",
                  isActive ? "border-primary bg-surface-elevated" : "border-hairline bg-surface hover:border-hairline-strong",
                ].join(" ")}
                onMouseEnter={() => preview(project.id)}
                onMouseLeave={scheduleHide}
                onClick={() => pin(project.id)}
              >
                <span
                  className={[
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption-sm font-semibold transition-colors",
                    isActive ? "bg-primary text-canvas" : "bg-surface-card text-on-dark",
                  ].join(" ")}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className={`block text-body-sm-strong ${isActive ? "text-primary" : "text-on-dark"}`}>
                    {project.name}
                  </span>
                  <span className="block text-caption-sm text-mute">{project.status}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="-mt-3 text-center text-caption-md text-mute lg:mt-0 lg:text-left">
        Scroll or use +/− to zoom · drag to pan · hover a pin to peek · click a pin or list item to open its card window.
      </p>
    </div>
  );
}

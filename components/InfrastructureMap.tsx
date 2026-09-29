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
  railLines,
  type InfrastructureImage,
  type InfrastructureProject,
  type RailLineId,
  type RouteStation,
} from "@/app/infrastructure-data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

/** Frame size, matching the "Places I've been" map. */
const WIDTH = 800;
const HEIGHT = 420;
/** The region is projected onto an 800 × MAP_HEIGHT canvas, then scaled down to fit the frame. */
const MAP_HEIGHT = 654;
/** Region framed by the map: Gujarat and Kashgar to Japan, Java up to Mongolia and Heilongjiang. */
const REGION: [number, number][] = [
  [68, -7.5],
  [146, 49],
];
const CLOSE_DELAY_MS = 180;
const MAX_K = 8;
/** Pointer travel (screen px) before a press becomes a pan, so pin clicks still register. */
const DRAG_THRESHOLD = 4;

const projection = geoMercator().fitExtent(
  [
    [0, 0],
    [WIDTH, MAP_HEIGHT],
  ],
  { type: "MultiPoint", coordinates: REGION },
);
const pathGenerator = geoPath(projection);

function projectOrZero(coord: [number, number]): [number, number] {
  return projection(coord) ?? [0, 0];
}

/** Whole-world extent in map units; Mercator is cut at ±85° like most web maps. */
const WORLD = {
  x0: projectOrZero([-180, 0])[0],
  x1: projectOrZero([180, 0])[0],
  y0: projectOrZero([0, 85])[1],
  y1: projectOrZero([0, -85])[1],
};

/** Zooming out stops once the whole world fits the frame's width. */
const MIN_K = WIDTH / (WORLD.x1 - WORLD.x0);
const REGION_K = HEIGHT / MAP_HEIGHT;

type ViewTransform = { k: number; x: number; y: number };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Default view: the whole megaproject region centred in the frame with neighbouring land either side. */
const INITIAL_VIEW: ViewTransform = { k: REGION_K, x: (WIDTH - WIDTH * REGION_K) / 2, y: 0 };

/** Pans anywhere on the world map, stopping at its edges (or centring it when smaller than the frame). */
function clampPan(k: number, x: number, y: number): ViewTransform {
  const loX = WIDTH - WORLD.x1 * k;
  const hiX = -WORLD.x0 * k;
  const loY = HEIGHT - WORLD.y1 * k;
  const hiY = -WORLD.y0 * k;
  return {
    k,
    x: loX <= hiX ? clamp(x, loX, hiX) : (loX + hiX) / 2,
    y: loY <= hiY ? clamp(y, loY, hiY) : (loY + hiY) / 2,
  };
}

function isInitialView(view: ViewTransform): boolean {
  return (
    Math.abs(view.k - INITIAL_VIEW.k) < 1e-4 &&
    Math.abs(view.x - INITIAL_VIEW.x) < 0.5 &&
    Math.abs(view.y - INITIAL_VIEW.y) < 0.5
  );
}

/** Pins and station markers shrink when zoomed out so dense clusters stay readable. */
function markerScaleFor(k: number): number {
  return clamp(Math.sqrt(k), 0.4, 1);
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
      {current.credit ? (
        <a
          href={current.credit.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="absolute right-1.5 top-1.5 max-w-[85%] truncate rounded-sm bg-canvas/75 px-1.5 py-0.5 text-[10px] leading-tight text-mute hover:text-on-dark"
        >
          {current.credit.text}
        </a>
      ) : null}
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

const THEME_ROUTE_COLOR = "rgb(var(--color-primary))";

/** Rail routes are keyed by line; other routes (canals, water transfers) by their project. */
function legendKeyFor(line: RailLineId | undefined, project: InfrastructureProject): string {
  return line ?? `project:${project.id}`;
}

type LegendEntry = { key: string; name: string; color: string; projectIndexes: number[] };

const legendGroups: { heading: string; entries: LegendEntry[] }[] = (() => {
  const indexesByKey = new Map<string, number[]>();
  infrastructureProjects.forEach((project, index) => {
    for (const route of project.routes ?? []) {
      const key = legendKeyFor(route.line, project);
      const indexes = indexesByKey.get(key) ?? [];
      if (!indexes.includes(index)) indexes.push(index);
      indexesByKey.set(key, indexes);
    }
  });

  const groups = new Map<string, LegendEntry[]>();
  for (const [id, line] of Object.entries(railLines)) {
    const projectIndexes = indexesByKey.get(id);
    if (!projectIndexes) continue;
    const entries = groups.get(line.region) ?? [];
    entries.push({ key: id, name: line.name, color: line.color, projectIndexes });
    groups.set(line.region, entries);
  }

  const other = infrastructureProjects.flatMap((project, index) =>
    (project.routes ?? []).some((route) => !route.line)
      ? [{ key: legendKeyFor(undefined, project), name: project.name, color: THEME_ROUTE_COLOR, projectIndexes: [index] }]
      : [],
  );
  if (other.length > 0) groups.set("Canals, roads, water & power links", other);

  return [...groups].map(([heading, entries]) => ({ heading, entries }));
})();

function MapToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface py-1.5 pl-1.5 pr-3 text-caption-md text-on-dark outline-none transition-colors duration-200 hover:border-hairline-strong focus-visible:outline focus-visible:outline-1 focus-visible:outline-hairline-strong"
    >
      <span
        aria-hidden
        className={`relative h-4 w-7 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-primary" : "bg-hairline-strong"}`}
      >
        <span
          className={`absolute left-0 top-0.5 h-3 w-3 rounded-full transition-transform duration-200 ${checked ? "translate-x-3.5 bg-canvas" : "translate-x-0.5 bg-on-dark"}`}
        />
      </span>
      {label}
    </button>
  );
}

function LineSwatch({ color, planned = false }: { color: string; planned?: boolean }) {
  const d = "M4 5H28";
  return (
    <svg width="32" height="10" viewBox="0 0 32 10" className="shrink-0" aria-hidden>
      {planned ? (
        <>
          <path d={d} stroke="rgb(var(--color-canvas))" strokeWidth={4.5} strokeLinecap="round" strokeDasharray="0.1 5.5" />
          <path d={d} stroke={color} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="0.1 5.5" />
        </>
      ) : (
        <>
          <path d={d} stroke="rgb(var(--color-canvas))" strokeWidth={5.5} strokeLinecap="round" />
          <path d={d} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
          <path d={d} stroke="rgb(var(--color-canvas))" strokeWidth={1} strokeDasharray="3 4" opacity={0.7} />
        </>
      )}
    </svg>
  );
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
}: {
  project: InfrastructureProject;
  index: number;
  controls?: WindowControls;
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
          <ProjectDetails project={project} index={index} showHeading={!controls} />        </div>
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
}: {
  pin: Pin;
  className: string;
  children: ReactNode;
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
    >
      {children}
    </div>
  );
}

function windowFrame(mode: WindowMode): { className: string; anchored: boolean } {
  switch (mode) {
    case "normal":
      return { className: "absolute z-30 max-h-[calc(100%-1rem)] w-80 overflow-y-auto rounded-lg", anchored: true };
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
  const [view, setView] = useState<ViewTransform>(INITIAL_VIEW);
  const [legendKey, setLegendKey] = useState<string | null>(null);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showLines, setShowLines] = useState(true);
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

  const markerScale = markerScaleFor(view.k);

  const pins = useMemo<Pin[]>(
    () =>
      infrastructureProjects.flatMap((project, index) => {
        const xy = projection([project.lng, project.lat]);
        if (!xy) return [];
        const ax = xy[0] * view.k + view.x;
        const ay = xy[1] * view.k + view.y;
        const [dx, dy] = project.pinOffset ?? [0, 0];
        const s = markerScaleFor(view.k);
        return [{ project, index, x: ax + dx * s, y: ay + dy * s, ax, ay }];
      }),
    [view],
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
              legendKey: legendKeyFor(route.line, project),
              color: route.line ? railLines[route.line].color : THEME_ROUTE_COLOR,
              planned: route.planned ?? false,
            };
          }),
        )
        .sort((a, b) => Number(b.planned) - Number(a.planned)),
    [view],
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

  const canZoomOut = view.k > MIN_K + 0.001;
  const canReset = !isInitialView(view);
  /** Station names only fit once the megaproject region fills most of the frame. */
  const labelsVisible = showLabels && view.k >= REGION_K * 0.75;
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
  const highlightId = pinnedId ?? hoverId;
  const mobilePin = pins.find((p) => p.project.id === lastId) ?? pins[0] ?? null;
  const frame = pinnedPin ? windowFrame(mode) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-x-8 lg:gap-y-3">
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
              className={`h-auto w-full select-none overflow-hidden rounded-md cursor-grab active:cursor-grabbing`}
              style={{ touchAction: "none" }}
              role="img"
              aria-label={`Zoomable world map centred on South, Southeast and East Asia, marking ${infrastructureProjects.length} infrastructure megaprojects`}
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

              {(showLines ? routes : []).map(({ key, project, d, color, planned, legendKey: routeLegendKey }) => {
                const isActive = legendKey ? routeLegendKey === legendKey : project.id === highlightId;
                const dimmed = legendKey !== null && routeLegendKey !== legendKey;
                return (
                  <g
                    key={key}
                    opacity={dimmed ? 0.18 : 1}
                    className="cursor-pointer transition-opacity duration-200"
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

              {(showLines || labelsVisible ? routes : []).map(({ key, stations, color, legendKey: routeLegendKey }) => (
                <g
                  key={`${key}-stations`}
                  opacity={legendKey !== null && routeLegendKey !== legendKey ? 0.18 : 1}
                  className="pointer-events-none transition-opacity duration-200"
                >
                  {stations.map((station) => {
                    const label = stationLabelPlacement(station.labelSide);
                    return (
                      <g key={station.name}>
                        {showLines ? (
                          <circle
                            cx={station.x}
                            cy={station.y}
                            r={4 * markerScale}
                            fill="rgb(var(--color-canvas))"
                            stroke={color}
                            strokeWidth={2}
                          />
                        ) : null}
                        {labelsVisible ? (
                          <text
                            x={station.x + label.dx * markerScale}
                            y={station.y + label.dy * markerScale}
                            textAnchor={label.anchor}
                            fontSize={Math.max(9.5, 10.5 * markerScale)}
                            fontWeight={600}
                            fill="rgb(var(--color-on-dark))"
                            stroke="rgb(var(--color-canvas))"
                            strokeWidth={3}
                            paintOrder="stroke"
                            strokeLinejoin="round"
                          >
                            {station.name}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                </g>
              ))}

              {(showMarkers ? pins : []).map(({ project, x, y, ax, ay }) =>
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

              {(showMarkers ? pins : []).map(({ project, index, x, y }) => {
                const isActive = project.id === highlightId;
                return (
                  <g
                    key={project.id}
                    transform={`translate(${x} ${y}) scale(${markerScale})`}
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
                disabled={!canReset}
                onClick={() => setView(INITIAL_VIEW)}
              >
                Reset
              </button>
            </div>
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

        {mapReady ? (
          <div role="group" aria-label="Map layers" className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-caption-sm text-mute">Show</span>
            <MapToggle label="Numbered markers" checked={showMarkers} onChange={setShowMarkers} />
            <MapToggle label="City & town names" checked={showLabels} onChange={setShowLabels} />
            <MapToggle label="Coloured lines" checked={showLines} onChange={setShowLines} />
          </div>
        ) : null}

        <section aria-labelledby="infra-legend-heading" className={`mt-4 rounded-md border border-hairline bg-surface p-4 transition-opacity duration-200 ${showLines ? "" : "opacity-50"}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <h3 id="infra-legend-heading" className="text-body-sm-strong text-on-dark">
              Railway legend
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption-sm text-mute">
              <span className="inline-flex items-center gap-1.5">
                <LineSwatch color="rgb(var(--color-on-dark))" />
                Open or under construction
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LineSwatch color="rgb(var(--color-on-dark))" planned />
                Planned or proposed
              </span>
            </div>
          </div>
          <div className="mt-3 grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
            {legendGroups.map(({ heading, entries }) => (
              <div key={heading}>
                <h4 className="mb-1 text-caption-sm font-semibold uppercase tracking-wide text-mute">{heading}</h4>
                <ul>
                  {entries.map((entry) => {
                    const isActive = entry.key === legendKey;
                    const firstProject = infrastructureProjects[entry.projectIndexes[0]];
                    return (
                      <li key={entry.key}>
                        <button
                          type="button"
                          className={[
                            "flex w-full items-center gap-2 rounded-sm px-1.5 py-1 text-left text-caption-md outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-hairline-strong",
                            isActive ? "bg-surface-elevated text-on-dark" : "text-body hover:bg-surface-elevated hover:text-on-dark",
                          ].join(" ")}
                          onMouseEnter={() => setLegendKey(entry.key)}
                          onMouseLeave={() => setLegendKey(null)}
                          onFocus={() => setLegendKey(entry.key)}
                          onBlur={() => setLegendKey(null)}
                          onClick={() => pin(firstProject.id)}
                        >
                          <LineSwatch color={entry.color} />
                          <span className="min-w-0 flex-1">{entry.name}</span>
                          <span className="shrink-0 text-caption-sm text-mute">
                            {entry.projectIndexes.map((index) => `#${index + 1}`).join(" ")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

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
        Scroll or use +/− to zoom · drag to pan · click a numbered pin or list item to open its card window · hover a legend line to trace it.
      </p>
    </div>
  );
}

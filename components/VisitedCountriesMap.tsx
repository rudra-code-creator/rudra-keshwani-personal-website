"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  visitKindForNumericId,
  visitKindLabel,
  visitedCities,
  visitedCountries,
  type VisitKind,
} from "@/app/travel-data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const FILL: Record<VisitKind, string> = {
  layover: "#93c5fd",
  explored: "#3b82f6",
  lived: "#1e3a8a",
};

const LEGEND: { kind: VisitKind; swatch: string }[] = [
  { kind: "layover", swatch: FILL.layover },
  { kind: "explored", swatch: FILL.explored },
  { kind: "lived", swatch: FILL.lived },
];

type CountryFeature = Feature<Geometry, { name?: string }> & { id?: string | number };

type HoverState = {
  name: string;
  kind: VisitKind | null;
  city?: boolean;
};

type CityPoint = {
  name: string;
  country: string;
  x: number;
  y: number;
};

type LabelAnchor = "start" | "end" | "middle";

type CityLabel = {
  dx: number;
  dy: number;
  anchor: LabelAnchor;
};

type ViewTransform = { k: number; x: number; y: number };

type Rect = { x: number; y: number; w: number; h: number };

const WIDTH = 800;
const HEIGHT = 420;
const MIN_K = 1;
const MAX_K = 10;
const LABEL_FONT = 9;
const LABEL_CHAR_W = 5.35;
const LABEL_HEIGHT = 11;
const DOT_R = 2.6;

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

function rectsOverlap(a: Rect, b: Rect): boolean {
  return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);
}

function labelWidth(name: string): number {
  return Math.max(24, name.length * LABEL_CHAR_W);
}

function pickLabel(
  sx: number,
  sy: number,
  name: string,
  occupied: Rect[],
): CityLabel | null {
  const w = labelWidth(name);
  const h = LABEL_HEIGHT;
  const gap = 6;
  const preferLeft = sx > WIDTH * 0.7;
  const candidates: { rect: Rect; label: CityLabel }[] = [
    {
      rect: { x: sx + gap, y: sy - h / 2, w, h },
      label: { dx: gap, dy: 3, anchor: "start" },
    },
    {
      rect: { x: sx - gap - w, y: sy - h / 2, w, h },
      label: { dx: -gap, dy: 3, anchor: "end" },
    },
    {
      rect: { x: sx - w / 2, y: sy - gap - h - 2, w, h },
      label: { dx: 0, dy: -8, anchor: "middle" },
    },
    {
      rect: { x: sx - w / 2, y: sy + gap + 1, w, h },
      label: { dx: 0, dy: 12, anchor: "middle" },
    },
  ];
  if (preferLeft) {
    const [right, left, ...rest] = candidates;
    candidates.splice(0, candidates.length, left, right, ...rest);
  }

  for (const candidate of candidates) {
    const { rect, label } = candidate;
    if (rect.x < 2 || rect.y < 2 || rect.x + rect.w > WIDTH - 2 || rect.y + rect.h > HEIGHT - 2) {
      continue;
    }
    if (occupied.some((other) => rectsOverlap(rect, other))) continue;
    occupied.push(rect);
    return label;
  }
  return null;
}

function layoutCityLabels(cities: CityPoint[], view: ViewTransform): Map<string, CityLabel> {
  const occupied: Rect[] = [];
  for (const city of cities) {
    const sx = city.x * view.k + view.x;
    const sy = city.y * view.k + view.y;
    occupied.push({ x: sx - 5, y: sy - 5, w: 10, h: 10 });
  }

  const ranked = cities
    .map((city) => {
      let nearest = Infinity;
      for (const other of cities) {
        if (other === city) continue;
        const d = Math.hypot(city.x - other.x, city.y - other.y);
        if (d < nearest) nearest = d;
      }
      return { city, isolation: nearest };
    })
    .sort((a, b) => b.isolation - a.isolation);

  const labels = new Map<string, CityLabel>();

  for (const { city } of ranked) {
    const sx = city.x * view.k + view.x;
    const sy = city.y * view.k + view.y;
    if (sx < -8 || sy < -8 || sx > WIDTH + 8 || sy > HEIGHT + 8) continue;

    const label = pickLabel(sx, sy, city.name, occupied);
    if (label) labels.set(`${city.country}-${city.name}`, label);
  }

  return labels;
}

export function VisitedCountriesMap() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [view, setView] = useState<ViewTransform>({ k: 1, x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(GEO_URL);
        if (!response.ok) throw new Error(`Failed to load map (${response.status})`);
        const topology = await response.json();
        const collection = feature(topology, topology.objects.countries) as unknown as FeatureCollection;
        if (!cancelled) {
          setCountries(collection.features as CountryFeature[]);
        }
      } catch {
        if (!cancelled) setLoadError(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const { pathGenerator, projection } = useMemo(() => {
    const projection = geoMercator()
      .scale(WIDTH / (2 * Math.PI))
      .translate([WIDTH / 2, HEIGHT / 1.55]);
    return { pathGenerator: geoPath(projection), projection };
  }, []);

  const cityPoints = useMemo<CityPoint[]>(() => {
    return visitedCities.flatMap((city) => {
      const xy = projection([city.lng, city.lat]);
      if (!xy) return [];
      return [{ name: city.name, country: city.country, x: xy[0], y: xy[1] }];
    });
  }, [projection]);

  const cityLabels = useMemo(() => layoutCityLabels(cityPoints, view), [cityPoints, view]);

  const byKind = useMemo(() => {
    const groups: Record<VisitKind, string[]> = {
      lived: [],
      explored: [],
      layover: [],
    };
    for (const country of visitedCountries) {
      groups[country.kind].push(country.name);
    }
    return groups;
  }, []);

  const zoomAt = useCallback((mx: number, my: number, factor: number) => {
    setView((current) => {
      const nextK = clamp(current.k * factor, MIN_K, MAX_K);
      const nx = mx - ((mx - current.x) / current.k) * nextK;
      const ny = my - ((my - current.y) / current.k) * nextK;
      return clampPan(nextK, nx, ny);
    });
  }, []);

  const zoomTowardCenter = useCallback(
    (factor: number) => {
      zoomAt(WIDTH / 2, HEIGHT / 2, factor);
    },
    [zoomAt],
  );

  const resetView = useCallback(() => {
    setView({ k: 1, x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = ((event.clientX - rect.left) / rect.width) * WIDTH;
      const my = ((event.clientY - rect.top) / rect.height) * HEIGHT;
      zoomAt(mx, my, Math.exp(-event.deltaY * 0.002));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const pointerToViewBox = useCallback((clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el) return { mx: WIDTH / 2, my: HEIGHT / 2 };
    const rect = el.getBoundingClientRect();
    return {
      mx: ((clientX - rect.left) / rect.width) * WIDTH,
      my: ((clientY - rect.top) / rect.height) * HEIGHT,
    };
  }, []);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origX: view.x,
        origY: view.y,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [view.x, view.y],
  );

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((event.clientX - drag.startX) / rect.width) * WIDTH;
    const dy = ((event.clientY - drag.startY) / rect.height) * HEIGHT;
    setView((current) => clampPan(current.k, drag.origX + dx, drag.origY + dy));
  }, []);

  const onPointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  }, []);

  const onDoubleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const { mx, my } = pointerToViewBox(event.clientX, event.clientY);
      zoomAt(mx, my, 1.6);
    },
    [pointerToViewBox, zoomAt],
  );

  const canZoomOut = view.k > MIN_K + 0.01;
  const canZoomIn = view.k < MAX_K - 0.01;

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        <div className="min-w-0 flex-1">
          <div
            ref={frameRef}
            className="relative overflow-hidden rounded-md border border-hairline bg-surface"
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onDoubleClick}
          >
            {loadError ? (
              <p className="px-4 py-12 text-center text-body-sm text-mute">
                Couldn&apos;t load the world map. Check your connection and try again.
              </p>
            ) : countries.length === 0 ? (
              <p className="px-4 py-12 text-center text-body-sm text-mute">Loading map…</p>
            ) : (
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className={`h-auto w-full select-none ${view.k > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
                role="img"
                aria-label="Zoomable world map of countries and cities Rudra has visited"
              >
                <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                  {countries.map((geo) => {
                    const id = String(geo.id ?? "");
                    const kind = visitKindForNumericId(id);
                    const name = geo.properties?.name ?? "Unknown";
                    const d = pathGenerator(geo);
                    if (!d) return null;

                    return (
                      <path
                        key={id || name}
                        d={d}
                        fill={kind ? FILL[kind] : "rgb(var(--color-surface-card))"}
                        stroke="rgb(var(--color-hairline))"
                        strokeWidth={0.4}
                        vectorEffect="non-scaling-stroke"
                        className={kind ? "cursor-pointer transition-[filter] hover:brightness-110" : undefined}
                        onMouseEnter={() => setHovered({ name, kind })}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <title>{kind ? `${name} — ${visitKindLabel[kind]}` : name}</title>
                      </path>
                    );
                  })}
                  {cityPoints.map((city) => {
                    const key = `${city.country}-${city.name}`;
                    const label = cityLabels.get(key);
                    return (
                      <g key={key} transform={`translate(${city.x} ${city.y}) scale(${1 / view.k})`}>
                        <circle
                          r={DOT_R}
                          fill="#ffffff"
                          stroke="#0f172a"
                          strokeWidth={0.7}
                          className="cursor-pointer"
                          onMouseEnter={() =>
                            setHovered({ name: `${city.name}, ${city.country}`, kind: null, city: true })
                          }
                          onMouseLeave={() => setHovered(null)}
                        >
                          <title>{`${city.name}, ${city.country}`}</title>
                        </circle>
                        {label ? (
                          <text
                            x={label.dx}
                            y={label.dy}
                            textAnchor={label.anchor}
                            fill="rgb(var(--color-ink))"
                            stroke="rgb(var(--color-surface))"
                            strokeWidth={3}
                            paintOrder="stroke"
                            fontSize={LABEL_FONT}
                            fontWeight={500}
                            className="pointer-events-none"
                          >
                            {city.name}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}

            <div
              className="absolute right-2 top-2 flex flex-col gap-1"
              onPointerDown={(event) => event.stopPropagation()}
              onDoubleClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-elevated text-body-sm-strong text-on-dark disabled:opacity-40"
                aria-label="Zoom in"
                disabled={!canZoomIn}
                onClick={() => zoomTowardCenter(1.4)}
              >
                +
              </button>
              <button
                type="button"
                className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-elevated text-body-sm-strong text-on-dark disabled:opacity-40"
                aria-label="Zoom out"
                disabled={!canZoomOut}
                onClick={() => zoomTowardCenter(1 / 1.4)}
              >
                −
              </button>
              <button
                type="button"
                className="focus-ring inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-hairline bg-surface-elevated px-1.5 text-caption-sm text-on-dark disabled:opacity-40"
                aria-label="Reset map"
                disabled={!canZoomOut}
                onClick={resetView}
              >
                Reset
              </button>
            </div>
          </div>

          <p className="mt-3 text-center text-caption-md text-mute lg:text-left" aria-live="polite">
            {hovered
              ? hovered.city
                ? hovered.name
                : hovered.kind
                  ? `${hovered.name} · ${visitKindLabel[hovered.kind]}`
                  : hovered.name
              : "Scroll or use +/− to zoom · drag to pan · hover a country or city"}
          </p>
        </div>

        <aside className="shrink-0 space-y-6 lg:w-56">
          <p className="text-body-sm-strong text-on-dark">Key</p>
          {LEGEND.map(({ kind, swatch }) => (
            <div key={kind}>
              <p className="flex items-center gap-2 text-body-sm-strong text-on-dark">
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-xs border border-hairline"
                  style={{ backgroundColor: swatch }}
                  aria-hidden
                />
                {visitKindLabel[kind]}
              </p>
              <p className="mt-2 text-body-sm text-body">{byKind[kind].join(" · ")}</p>
            </div>
          ))}
          <div>
            <p className="flex items-center gap-2 text-body-sm-strong text-on-dark">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#ffffff", border: "1px solid #0f172a" }}
                aria-hidden
              />
              Cities
            </p>
            <p className="mt-2 text-body-sm text-body">
              Names sit next to pins when there&apos;s room. Zoom in to read clustered cities.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

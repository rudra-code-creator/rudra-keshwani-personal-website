"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  visitKindForNumericId,
  visitKindLabel,
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
};

const WIDTH = 800;
const HEIGHT = 420;

export function VisitedCountriesMap() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const [loadError, setLoadError] = useState(false);

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

  const pathGenerator = useMemo(() => {
    const projection = geoMercator()
      .scale(WIDTH / (2 * Math.PI))
      .translate([WIDTH / 2, HEIGHT / 1.55])
      .clipExtent([
        [0, 0],
        [WIDTH, HEIGHT],
      ]);
    return geoPath(projection);
  }, []);

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

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-md border border-hairline bg-surface">
            {loadError ? (
              <p className="px-4 py-12 text-center text-body-sm text-mute">
                Couldn&apos;t load the world map. Check your connection and try again.
              </p>
            ) : countries.length === 0 ? (
              <p className="px-4 py-12 text-center text-body-sm text-mute">Loading map…</p>
            ) : (
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className="h-auto w-full"
                role="img"
                aria-label="World map of countries Rudra has visited"
              >
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
                      className={kind ? "cursor-pointer transition-[filter] hover:brightness-110" : undefined}
                      onMouseEnter={() => setHovered({ name, kind })}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <title>{kind ? `${name} — ${visitKindLabel[kind]}` : name}</title>
                    </path>
                  );
                })}
              </svg>
            )}
          </div>

          <p className="mt-3 text-center text-caption-md text-mute lg:text-left" aria-live="polite">
            {hovered
              ? hovered.kind
                ? `${hovered.name} · ${visitKindLabel[hovered.kind]}`
                : hovered.name
              : "Hover a highlighted country"}
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
        </aside>
      </div>
    </div>
  );
}

/**
 * One-off: generate a static travel map SVG for the GitHub profile README.
 * Run from personal-website: node scripts/generate-profile-map.mjs
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);

const WIDTH = 960;
const HEIGHT = 500;

const FILL = {
  layover: "#93c5fd",
  explored: "#3b82f6",
  lived: "#1e3a8a",
};

const visitedCountries = [
  { name: "Australia", isoNumeric: "036", kind: "lived" },
  { name: "New Zealand", isoNumeric: "554", kind: "explored" },
  { name: "Indonesia", isoNumeric: "360", kind: "explored" },
  { name: "Malaysia", isoNumeric: "458", kind: "explored" },
  { name: "Singapore", isoNumeric: "702", kind: "explored" },
  { name: "Thailand", isoNumeric: "764", kind: "explored" },
  { name: "Cambodia", isoNumeric: "116", kind: "explored" },
  { name: "China (Hong Kong SAR)", isoNumeric: "156", kind: "explored" },
  { name: "Hong Kong", isoNumeric: "344", kind: "explored" },
  { name: "India", isoNumeric: "356", kind: "explored" },
  { name: "United Arab Emirates", isoNumeric: "784", kind: "explored" },
  { name: "Qatar", isoNumeric: "634", kind: "explored" },
  { name: "Norway", isoNumeric: "578", kind: "explored" },
  { name: "Sweden", isoNumeric: "752", kind: "explored" },
  { name: "Finland", isoNumeric: "246", kind: "explored" },
  { name: "Estonia", isoNumeric: "233", kind: "explored" },
  { name: "Vietnam", isoNumeric: "704", kind: "layover" },
];

const visitedCities = [
  { name: "Oslo", lat: 59.9139, lng: 10.7522 },
  { name: "Bergen", lat: 60.3913, lng: 5.3221 },
  { name: "Narvik", lat: 68.4384, lng: 17.4272 },
  { name: "Tromsø", lat: 69.6492, lng: 18.9553 },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Kiruna", lat: 67.8558, lng: 20.2253 },
  { name: "Helsinki", lat: 60.1699, lng: 24.9384 },
  { name: "Rovaniemi", lat: 66.5039, lng: 25.7294 },
  { name: "Tallinn", lat: 59.437, lng: 24.7536 },
  { name: "Doha", lat: 25.2854, lng: 51.531 },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Navi Mumbai", lat: 19.033, lng: 73.0297 },
  { name: "Nashik", lat: 19.9975, lng: 73.7898 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Chhatrapati Sambhajinagar", lat: 19.8762, lng: 75.3433 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Vadodara", lat: 22.3072, lng: 73.1812 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Gandhinagar", lat: 23.2156, lng: 72.6369 },
  { name: "Dholera", lat: 22.247, lng: 72.193 },
  { name: "Sasan Gir", lat: 21.137, lng: 70.795 },
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Agra", lat: 27.1767, lng: 78.0081 },
  { name: "Satara", lat: 17.6805, lng: 74.0183 },
  { name: "Kolhapur", lat: 16.705, lng: 74.2433 },
  { name: "Goa", lat: 15.4909, lng: 73.8278 },
  { name: "Kochi", lat: 9.9312, lng: 76.2673 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Hat Yai", lat: 7.0084, lng: 100.4767 },
  { name: "Kuala Lumpur", lat: 3.139, lng: 101.6869 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Phnom Penh", lat: 11.5564, lng: 104.9282 },
  { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Auckland", lat: -36.8485, lng: 174.7633 },
  { name: "Cairns", lat: -16.9186, lng: 145.7781 },
  { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
];

const byId = Object.fromEntries(visitedCountries.map((c) => [c.isoNumeric, c.kind]));

const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
if (!res.ok) throw new Error(`Failed to fetch world atlas: ${res.status}`);
const topology = await res.json();
const collection = feature(topology, topology.objects.countries);

const projection = geoMercator()
  .scale(WIDTH / (2 * Math.PI))
  .translate([WIDTH / 2, HEIGHT / 1.55])
  .clipExtent([
    [0, 0],
    [WIDTH, HEIGHT],
  ]);
const path = geoPath(projection);

const countryPaths = collection.features
  .map((geo) => {
    const id = String(geo.id ?? "").padStart(3, "0");
    const kind = byId[id];
    const d = path(geo);
    if (!d) return "";
    const fill = kind ? FILL[kind] : "#1a1b1c";
    const stroke = "#2a2c2e";
    return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="0.4"/>`;
  })
  .join("\n");

const cityDots = visitedCities
  .map((city) => {
    const xy = projection([city.lng, city.lat]);
    if (!xy) return "";
    const [x, y] = xy;
    if (x < 2 || y < 2 || x > WIDTH - 2 || y > HEIGHT - 2) return "";
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#ffffff" stroke="#0f172a" stroke-width="0.7"><title>${city.name}</title></circle>`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Places Rudra has been">
  <rect width="100%" height="100%" fill="#0d0d0d"/>
  ${countryPaths}
  ${cityDots}
  <g font-family="Inter, system-ui, sans-serif" font-size="12" fill="#9c9c9d">
    <rect x="16" y="${HEIGHT - 54}" width="12" height="12" fill="${FILL.lived}" rx="2"/>
    <text x="34" y="${HEIGHT - 44}">Lived in</text>
    <rect x="110" y="${HEIGHT - 54}" width="12" height="12" fill="${FILL.explored}" rx="2"/>
    <text x="128" y="${HEIGHT - 44}">Explored</text>
    <rect x="210" y="${HEIGHT - 54}" width="12" height="12" fill="${FILL.layover}" rx="2"/>
    <text x="228" y="${HEIGHT - 44}">Layover</text>
    <circle cx="310" cy="${HEIGHT - 48}" r="3.2" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
    <text x="322" y="${HEIGHT - 44}">Cities</text>
  </g>
</svg>
`;

const out =
  process.argv[2] ??
  "C:/Users/rudra/rudra-code-creator/assets/places-ive-been.svg";
writeFileSync(out, svg, "utf8");
console.log(`Wrote ${out}`);

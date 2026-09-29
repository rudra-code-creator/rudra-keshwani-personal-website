// Usage: node scripts/tmp-mapgen.mjs scripts/tmp-maps.json [only-id]
import fs from "node:fs";
import sharp from "sharp";

const TILE = 256;
const SCALE = 2;
const UA = { "User-Agent": "rudra-personal-site-mapgen/1.0 (https://rudra-keshwani-personal-website.vercel.app)" };
const specs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const only = process.argv[3];

function project(lng, lat, z) {
  const s = TILE * 2 ** z;
  const x = ((lng + 180) / 360) * s;
  const r = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * s;
  return [x, y];
}

function esc(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function tile(z, x, y, source) {
  const n = 2 ** z;
  const xx = ((x % n) + n) % n;
  const url =
    source === "osm"
      ? `https://tile.openstreetmap.org/${z}/${xx}/${y}.png`
      : `https://tiles.maps.eox.at/wmts/1.0.0/osm_3857/default/g/${z}/${y}/${xx}.jpg`;
  for (let i = 0; i < 3; i++) {
    const res = await fetch(url, { headers: UA });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await new Promise((s) => setTimeout(s, 500));
  }
  throw new Error(`tile failed ${url}`);
}

function label(x, y, text, anchor, color, size) {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="700" fill="${color}" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" paint-order="stroke">${esc(text)}</text>`;
}

async function render(spec) {
  const OW = 1600;
  const OH = 1000;
  const W = OW / SCALE;
  const H = OH / SCALE;
  const pad = spec.pad ?? 0.12;
  const [w, s, e, n] = spec.bbox;
  let z = 18;
  for (; z > 1; z--) {
    const [x0, y0] = project(w, n, z);
    const [x1, y1] = project(e, s, z);
    if (x1 - x0 <= W * (1 - 2 * pad) && y1 - y0 <= H * (1 - 2 * pad)) break;
  }
  if (spec.zoom) z = spec.zoom;
  const [ax, ay] = project(w, n, z);
  const [bx, by] = project(e, s, z);
  const left = Math.round((ax + bx) / 2 - W / 2);
  const top = Math.round((ay + by) / 2 - H / 2);
  const tx0 = Math.floor(left / TILE);
  const ty0 = Math.floor(top / TILE);
  const tx1 = Math.floor((left + W - 1) / TILE);
  const ty1 = Math.floor((top + H - 1) / TILE);
  const composites = [];
  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      composites.push({ input: await tile(z, tx, ty, spec.tiles), left: (tx - tx0) * TILE, top: (ty - ty0) * TILE });
    }
  }
  const base = await sharp({
    create: { width: (tx1 - tx0 + 1) * TILE, height: (ty1 - ty0 + 1) * TILE, channels: 3, background: "#dfe7ec" },
  })
    .composite(composites)
    .png()
    .toBuffer();
  const cropped = await sharp(base)
    .extract({ left: left - tx0 * TILE, top: top - ty0 * TILE, width: W, height: H })
    .resize(OW, OH, { kernel: "lanczos3" })
    .toBuffer();

  const px = ([lng, lat]) => {
    const [x, y] = project(lng, lat, z);
    return [(x - left) * SCALE, (y - top) * SCALE];
  };
  const pathD = (coords, close) =>
    coords.map((c, i) => `${i ? "L" : "M"}${px(c).map((v) => v.toFixed(1)).join(" ")}`).join(" ") + (close ? "Z" : "");
  const svg = [];
  for (const a of spec.areas ?? []) {
    svg.push(
      `<path d="${pathD(a.coords, true)}" fill="${a.color}" fill-opacity="${a.opacity ?? 0.3}" stroke="${a.color}" stroke-width="4" stroke-dasharray="${a.dashed ? "14 10" : "none"}"/>`,
    );
    if (a.label) {
      const [cx, cy] = px(a.labelAt ?? a.coords[0]);
      svg.push(label(cx, cy, a.label, "middle", a.color, 30));
    }
  }
  for (const l of spec.lines ?? []) {
    const d = pathD(l.coords, false);
    const width = l.width ?? 9;
    svg.push(`<path d="${d}" fill="none" stroke="#ffffff" stroke-width="${width + 7}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>`);
    svg.push(
      `<path d="${d}" fill="none" stroke="${l.color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${l.dashed ? `stroke-dasharray="${width * 0.1} ${width * 2.2}"` : ""}/>`,
    );
  }
  for (const p of spec.points ?? []) {
    const [x, y] = px([p.lng, p.lat]);
    const r = p.major ? 13 : 9;
    svg.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${p.color ?? "#1f2937"}" stroke-width="${p.major ? 6 : 5}"/>`);
    if (p.label) {
      const side = p.side ?? "right";
      const off = r + 12;
      const [dx, dy, anchor] =
        side === "left" ? [-off, 11, "end"] : side === "above" ? [0, -off - 4, "middle"] : side === "below" ? [0, off + 24, "middle"] : [off, 11, "start"];
      svg.push(label(x + dx, y + dy, p.label, anchor, "#111827", p.major ? 34 : 29));
    }
  }
  const title = esc(spec.title);
  const subtitle = spec.subtitle ? esc(spec.subtitle) : "";
  const chipW = Math.max(title.length * 21, subtitle.length * 14.5) + 56;
  svg.push(`<rect x="28" y="28" width="${chipW}" height="${subtitle ? 104 : 72}" rx="14" fill="#1f2937" fill-opacity="0.9"/>`);
  svg.push(`<text x="56" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="700" fill="#ffffff">${title}</text>`);
  if (subtitle) svg.push(`<text x="56" y="112" font-family="Segoe UI, Arial, sans-serif" font-size="25" fill="#cbd5e1">${subtitle}</text>`);
  let ly = OH - 40 - (spec.legend?.length ?? 0) * 40;
  if (spec.legend?.length) {
    const lw = Math.max(...spec.legend.map((i) => i.label.length)) * 14 + 110;
    svg.push(`<rect x="28" y="${ly - 34}" width="${lw}" height="${spec.legend.length * 40 + 24}" rx="12" fill="#ffffff" fill-opacity="0.92" stroke="#cbd5e1"/>`);
    for (const item of spec.legend) {
      svg.push(`<path d="M50 ${ly - 8}H104" stroke="${item.color}" stroke-width="9" stroke-linecap="round" ${item.dashed ? 'stroke-dasharray="1 19"' : ""}/>`);
      svg.push(`<text x="120" y="${ly}" font-family="Segoe UI, Arial, sans-serif" font-size="25" fill="#111827">${esc(item.label)}</text>`);
      ly += 40;
    }
  }
  const attribution = spec.tiles === "osm" ? "© OpenStreetMap contributors" : "Data © OpenStreetMap contributors · Rendering © EOX";
  svg.push(
    `<text x="${OW - 16}" y="${OH - 16}" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#374151" stroke="#ffffff" stroke-width="5" paint-order="stroke">${attribution}</text>`,
  );
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OW}" height="${OH}">${svg.join("")}</svg>`);
  const out = `public/images/infrastructure/${spec.id}.jpg`;
  await sharp(cropped).composite([{ input: overlay }]).jpeg({ quality: 84 }).toFile(out);
  console.log(`OK ${out} z=${z}`);
}

for (const spec of specs) {
  if (only && spec.id !== only) continue;
  await render(spec);
}

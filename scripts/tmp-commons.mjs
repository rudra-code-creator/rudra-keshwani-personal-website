// Usage: node scripts/tmp-commons.mjs get "File:X=dest" ...
import fs from "node:fs";
import path from "node:path";

const UA = { "User-Agent": "rudra-personal-site/1.0 (https://rudra-keshwani-personal-website.vercel.app)" };
const API = "https://commons.wikimedia.org/w/api.php";
const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function info(title) {
  const u = `${API}?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1600&titles=${encodeURIComponent(title)}`;
  const j = await (await fetch(u, { headers: UA })).json();
  const page = Object.values(j.query.pages)[0];
  if (!page.imageinfo) throw new Error(`missing ${title}`);
  return page.imageinfo[0];
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === "get") {
  const credits = fs.existsSync("scripts/tmp-credits.json") ? JSON.parse(fs.readFileSync("scripts/tmp-credits.json", "utf8")) : [];
  for (const arg of args) {
    const [title, dest] = arg.split("=");
    try {
      const ii = await info(title);
      const src = ii.thumburl ?? ii.url;
      let ext = path.extname(new URL(src).pathname).toLowerCase();
      if (ext === ".svg" || ext === ".tif" || ext === ".tiff" || ext === ".pdf") ext = ".png";
      const res = await fetch(src, { headers: UA });
      if (!res.ok) throw new Error(`download ${res.status}`);
      const file = `public/images/infrastructure/${dest}${ext}`;
      fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      const m = ii.extmetadata ?? {};
      const entry = {
        dest,
        file: file.replace("public", ""),
        license: strip(m.LicenseShortName?.value),
        artist: strip(m.Artist?.value).slice(0, 120),
        page: ii.descriptionurl,
        size: `${ii.width}x${ii.height}`,
      };
      credits.push(entry);
      console.log(`OK ${entry.file} | ${entry.license} | ${entry.artist} | ${entry.page}`);
    } catch (e) {
      console.log(`FAIL ${title}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  fs.writeFileSync("scripts/tmp-credits.json", JSON.stringify(credits, null, 2));
}

const fs = require("fs");
const path = require("path");
const root =
  "C:\\Users\\rudra\\.cursor\\projects\\c-Users-rudra-personal-website\\agent-transcripts";
function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith(".jsonl")) out.push(p);
  }
  return out;
}
const files = walk(root);
for (const f of files) {
  const ms = fs.statSync(f).mtimeMs;
  console.log(ms + "|" + f);
}

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

async function getResumeFile(): Promise<{ name: string; bytes: Buffer }> {
  const root = process.cwd();
  const entries = await readdir(root, { withFileTypes: true });
  const pdf = entries.find((entry) => entry.isFile() && /\.pdf$/i.test(entry.name));

  if (!pdf) {
    throw new Error("Resume PDF not found in repository root.");
  }

  const fullPath = path.join(root, pdf.name);
  const bytes = await readFile(fullPath);
  return { name: pdf.name, bytes };
}

export async function GET() {
  try {
    const { name, bytes } = await getResumeFile();
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Resume not found.", { status: 404 });
  }
}

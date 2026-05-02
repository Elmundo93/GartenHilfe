import fs from "node:fs/promises";
import path from "node:path";

const BLOB_TOKEN = process.env.GartenHilfeBlob_READ_WRITE_TOKEN;
const USE_BLOB = !!BLOB_TOKEN;

const LOCAL_CONTENT_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "src", "content");

// ── Read ───────────────────────────────────────────────────────────────────────

export async function readContentFile<T>(
  relPath: string,
  defaults: T
): Promise<T> {
  if (USE_BLOB) {
    return readFromBlob(relPath, defaults);
  }
  return readFromFilesystem(relPath, defaults);
}

async function readFromBlob<T>(relPath: string, defaults: T): Promise<T> {
  const { list } = await import("@vercel/blob");
  try {
    const { blobs } = await list({ prefix: `content/${relPath}`, token: BLOB_TOKEN });
    const blob = blobs.find((b) => b.pathname === `content/${relPath}`);
    if (!blob) return defaults;
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return defaults;
    const raw = await res.text();
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

async function readFromFilesystem<T>(relPath: string, defaults: T): Promise<T> {
  try {
    const p = path.join(LOCAL_CONTENT_DIR, relPath);
    const raw = await fs.readFile(p, "utf8");
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

// ── Read directory (services) ──────────────────────────────────────────────────

export async function readContentDir(relDir: string): Promise<string[]> {
  if (USE_BLOB) {
    return readDirFromBlob(relDir);
  }
  return readDirFromFilesystem(relDir);
}

async function readDirFromBlob(relDir: string): Promise<string[]> {
  const { list } = await import("@vercel/blob");
  try {
    const { blobs } = await list({ prefix: `content/${relDir}/`, token: BLOB_TOKEN });
    return Promise.all(
      blobs
        .filter((b) => b.pathname.endsWith(".json"))
        .map(async (b) => {
          const res = await fetch(b.url, { cache: "no-store" });
          return res.text();
        })
    );
  } catch {
    return [];
  }
}

async function readDirFromFilesystem(relDir: string): Promise<string[]> {
  try {
    const dir = path.join(LOCAL_CONTENT_DIR, relDir);
    const files = await fs.readdir(dir);
    return Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map((f) => fs.readFile(path.join(dir, f), "utf8"))
    );
  } catch {
    return [];
  }
}

// ── Write ──────────────────────────────────────────────────────────────────────

export async function writeContentFile(
  relPath: string,
  content: string
): Promise<void> {
  if (USE_BLOB) {
    await writeToBlob(relPath, content);
  } else {
    await writeToFilesystem(relPath, content);
  }
}

async function writeToBlob(relPath: string, content: string): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(`content/${relPath}`, content, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: BLOB_TOKEN,
  });
}

async function writeToFilesystem(relPath: string, content: string): Promise<void> {
  const p = path.join(LOCAL_CONTENT_DIR, relPath);
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, content, "utf8");
}

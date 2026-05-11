import fs from "node:fs/promises";
import path from "node:path";

const BLOB_TOKEN = process.env.GartenHilfeBlob_READ_WRITE_TOKEN;
const USE_BLOB = !!BLOB_TOKEN;

const LOCAL_CONTENT_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "src", "content");

function mergeWithDefaults<T>(defaults: T, parsed: unknown): T {
  if (
    defaults &&
    parsed &&
    typeof defaults === "object" &&
    typeof parsed === "object" &&
    !Array.isArray(defaults) &&
    !Array.isArray(parsed)
  ) {
    return { ...defaults, ...parsed } as T;
  }
  return parsed as T;
}

// ── Read ───────────────────────────────────────────────────────────────────────

export async function readContentFile<T>(relPath: string, defaults: T): Promise<T> {
  if (USE_BLOB) return readFromBlob(relPath, defaults);
  return readFromFilesystem(relPath, defaults);
}

export async function readPrivateContentFile<T>(relPath: string, defaults: T): Promise<T> {
  return readContentFile(relPath, defaults);
}

async function readFromBlob<T>(relPath: string, defaults: T): Promise<T> {
  try {
    const { get } = await import("@vercel/blob");
    const result = await get(`content/${relPath}`, {
      access: "private",
      token: BLOB_TOKEN,
      useCache: false,
    } as Parameters<typeof get>[1]);
    if (!result || !result.stream) return readFromFilesystem(relPath, defaults);
    const parsed = JSON.parse(await new Response(result.stream).text());
    return mergeWithDefaults(defaults, parsed);
  } catch {
    return readFromFilesystem(relPath, defaults);
  }
}

async function readFromFilesystem<T>(relPath: string, defaults: T): Promise<T> {
  try {
    const p = path.join(LOCAL_CONTENT_DIR, relPath);
    const raw = await fs.readFile(p, "utf8");
    return mergeWithDefaults(defaults, JSON.parse(raw));
  } catch {
    return defaults;
  }
}

// ── Read directory ─────────────────────────────────────────────────────────────

export async function readContentDir(relDir: string): Promise<string[]> {
  if (USE_BLOB) return readDirFromBlob(relDir);
  return readDirFromFilesystem(relDir);
}

async function readDirFromBlob(relDir: string): Promise<string[]> {
  try {
    const { list, get } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `content/${relDir}/`, token: BLOB_TOKEN });
    const jsonBlobs = blobs.filter((b) => b.pathname.endsWith(".json"));
    if (jsonBlobs.length === 0) return readDirFromFilesystem(relDir);

    return Promise.all(
      jsonBlobs.map(async (b) => {
        const result = await get(b.pathname, {
          access: "private",
          token: BLOB_TOKEN,
          useCache: false,
        } as Parameters<typeof get>[1]);
        if (!result || !result.stream) throw new Error(`[storage] Blob nicht lesbar: ${b.pathname}`);
        return new Response(result.stream).text();
      })
    );
  } catch {
    return readDirFromFilesystem(relDir);
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

export async function writeContentFile(relPath: string, content: string): Promise<void> {
  if (USE_BLOB) await writeToBlob(relPath, content);
  else await writeToFilesystem(relPath, content);
}

export async function writePrivateContentFile(relPath: string, content: string): Promise<void> {
  return writeContentFile(relPath, content);
}

async function writeToBlob(relPath: string, content: string): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(`content/${relPath}`, content, {
    access: "private",
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

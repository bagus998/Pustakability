import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();
app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Security Headers Middleware
app.use("*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("X-XSS-Protection", "1; mode=block");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
});

// Security Utilities: Input Sanitization (XSS Defense)
function sanitizeString(str: any): string {
  if (typeof str !== "string") return str ?? "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*(["']).*?\1/gi, "")
    .replace(/javascript:[^\s"']+/gi, "")
    .replace(/[<>]/g, (t) => (t === "<" ? "&lt;" : "&gt;"))
    .trim();
}

// Security Utilities: Web Crypto Password Hashing (SHA-256)
const PASSWORD_SALT = "PustakabilitySecuritySalt2024!";
async function hashPassword(plain: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain + PASSWORD_SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Security Utilities: Rate Limiter (Brute Force / DDoS Defense)
const failedAttemptsMap = new Map<string, { count: number; lockUntil: number }>();

function checkRateLimit(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  const record = failedAttemptsMap.get(key);
  if (!record) return { allowed: true, remainingMs: 0 };
  if (now < record.lockUntil) {
    return { allowed: false, remainingMs: record.lockUntil - now };
  }
  if (now - record.lockUntil > windowMs) {
    failedAttemptsMap.delete(key);
    return { allowed: true, remainingMs: 0 };
  }
  return { allowed: true, remainingMs: 0 };
}

function recordFailedAttempt(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = failedAttemptsMap.get(key) || { count: 0, lockUntil: 0 };
  record.count += 1;
  if (record.count >= maxAttempts) {
    record.lockUntil = now + windowMs;
  }
  failedAttemptsMap.set(key, record);
}

function clearFailedAttempts(key: string) {
  failedAttemptsMap.delete(key);
}

const BUCKET = "make-d4405fa6-books";
const P = "pustaka:"; // key prefix

function sb() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

// ── Ensure storage bucket exists ────────────────────────────────────
async function ensureBucket() {
  const client = sb();
  const { data: buckets } = await client.storage.listBuckets();
  if (!buckets?.some((b) => b.name === BUCKET)) {
    await client.storage.createBucket(BUCKET, { public: false });
    console.log(`Created bucket: ${BUCKET}`);
  }
}

// ── Auth helper ─────────────────────────────────────────────────────
async function getUser(authHeader: string | null) {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const client = sb();
  const { data } = await client.auth.getUser(token);
  return data?.user ?? null;
}

// ── Health ──────────────────────────────────────────────────────────
app.get("/make-server-d4405fa6/health", (c) => c.json({ status: "ok" }));

// ── GET /books  — list approved books ───────────────────────────────
app.get("/make-server-d4405fa6/books", async (c) => {
  try {
    const rows = await kv.getByPrefix(`${P}book:`);
    const approved = rows.filter((b: any) => b?.status === "approved");
    return c.json({ books: approved });
  } catch (e) {
    console.log("GET /books error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── GET /books/pending  — list pending books ────────────────────────
app.get("/make-server-d4405fa6/books/pending", async (c) => {
  try {
    const rows = await kv.getByPrefix(`${P}book:`);
    const pending = rows.filter((b: any) => b?.status === "pending");
    return c.json({ books: pending });
  } catch (e) {
    console.log("GET /books/pending error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── GET /books/:id  — single book ───────────────────────────────────
app.get("/make-server-d4405fa6/books/:id", async (c) => {
  try {
    const book = await kv.get(`${P}book:${c.req.param("id")}`);
    if (!book) return c.json({ error: "Book not found" }, 404);
    return c.json({ book });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── GET /books/:id/chapters/:index  — single chapter ────────────────
app.get("/make-server-d4405fa6/books/:id/chapters/:index", async (c) => {
  try {
    const { id, index } = c.req.param();
    const key = `${P}chapter:${id}:${String(Number(index)).padStart(3, "0")}`;
    const chapter = await kv.get(key);
    if (!chapter) return c.json({ error: "Chapter not found" }, 404);
    return c.json({ chapter, index: Number(index) });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── PUT /books/:id/chapters/:index  — update single chapter ─────────
app.put("/make-server-d4405fa6/books/:id/chapters/:index", async (c) => {
  try {
    const { id, index } = c.req.param();
    const key = `${P}chapter:${id}:${String(Number(index)).padStart(3, "0")}`;
    const existing = await kv.get(key);
    if (!existing) return c.json({ error: "Chapter not found" }, 404);
    const updates = await c.req.json() as { title?: string; content?: string };
    const updated = { ...existing, ...updates };
    await kv.set(key, updated);
    return c.json({ chapter: updated, index: Number(index) });
  } catch (e) {
    console.log("PUT /chapters/:index error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── GET /books/:id/chapters  — all chapters ─────────────────────────
app.get("/make-server-d4405fa6/books/:id/chapters", async (c) => {
  try {
    const id = c.req.param("id");
    const book = await kv.get(`${P}book:${id}`);
    if (!book) return c.json({ error: "Book not found" }, 404);

    const count: number = book.chapterCount ?? 0;
    if (count === 0) return c.json({ chapters: [] });

    const keys = Array.from({ length: count }, (_, i) =>
      `${P}chapter:${id}:${String(i).padStart(3, "0")}`
    );
    const chapters = await kv.mget(keys);
    return c.json({ chapters });
  } catch (e) {
    console.log("GET /chapters error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── POST /books  — upload new book with file ─────────────────────────
app.post("/make-server-d4405fa6/books", async (c) => {
  try {
    await ensureBucket();

    const form = await c.req.formData();
    const title       = (form.get("title") as string)?.trim();
    const author      = (form.get("author") as string)?.trim();
    const publisher   = (form.get("publisher") as string)?.trim() || "UB Press";
    const category    = (form.get("category") as string)?.trim();
    const year        = parseInt(form.get("year") as string) || new Date().getFullYear();
    const description = (form.get("description") as string)?.trim();
    const submittedBy = (form.get("submittedBy") as string)?.trim() || "volunteer";
    const formats     = JSON.parse((form.get("formats") as string) || "[]") as string[];
    const coverImage  = (form.get("coverImage") as string)?.trim() || "";
    const file        = form.get("file") as File | null;

    if (!title || !author || !category) {
      return c.json({ error: "Missing required fields: title, author, category" }, 400);
    }

    const id = crypto.randomUUID();
    let fileUrl = "";
    let fileType = "";
    let chapters: { title: string; content: string }[] = [];

    if (file && file.size > 0) {
      fileType = (file.name.split(".").pop() ?? "txt").toLowerCase();
      const buffer = new Uint8Array(await file.arrayBuffer());
      const storagePath = `books/${id}/${file.name}`;

      const { error: upErr } = await sb()
        .storage.from(BUCKET)
        .upload(storagePath, buffer, { contentType: file.type || "application/octet-stream" });

      if (upErr) {
        console.log("Storage upload error:", upErr.message);
      } else {
        fileUrl = storagePath;
        console.log(`File uploaded: ${storagePath}`);
      }

      // Process file → chapters
      chapters = await processFile(buffer, fileType, title);
      console.log(`Extracted ${chapters.length} chapters from ${fileType}`);
    }

    // Fallback: single placeholder chapter
    if (chapters.length === 0) {
      chapters = [{ title: title, content: description || "Konten belum tersedia." }];
    }

    const book = {
      id,
      title,
      author,
      publisher,
      category,
      year,
      description,
      formats: formats.length > 0 ? formats : [fileType.toUpperCase() || "TXT"],
      coverImage: coverImage || defaultCover(category),
      coverColor: categoryColor(category),
      rating: 0,
      pages: chapters.reduce((sum, ch) => sum + Math.ceil(ch.content.split(/\s+/).length / 250), 0),
      previewPages: 3,
      status: "pending",
      submittedBy,
      fileUrl,
      fileType,
      chapterCount: chapters.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Batch-save book + chapters
    const kvKeys = [`${P}book:${id}`];
    const kvValues: any[] = [book];

    for (let i = 0; i < chapters.length; i++) {
      kvKeys.push(`${P}chapter:${id}:${String(i).padStart(3, "0")}`);
      kvValues.push(chapters[i]);
    }
    await kv.mset(kvKeys, kvValues);

    return c.json({ book, chaptersProcessed: chapters.length });
  } catch (e) {
    console.log("POST /books error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── PUT /books/:id  — update metadata ───────────────────────────────
app.put("/make-server-d4405fa6/books/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`${P}book:${id}`);
    if (!existing) return c.json({ error: "Book not found" }, 404);
    const updates = await c.req.json();
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`${P}book:${id}`, updated);
    return c.json({ book: updated });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── PUT /books/:id/approve ──────────────────────────────────────────
app.put("/make-server-d4405fa6/books/:id/approve", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`${P}book:${id}`);
    if (!existing) return c.json({ error: "Not found" }, 404);
    const updated = { ...existing, status: "approved", updatedAt: new Date().toISOString() };
    await kv.set(`${P}book:${id}`, updated);
    return c.json({ book: updated });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── PUT /books/:id/reject ───────────────────────────────────────────
app.put("/make-server-d4405fa6/books/:id/reject", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`${P}book:${id}`);
    if (!existing) return c.json({ error: "Not found" }, 404);
    const updated = { ...existing, status: "rejected", updatedAt: new Date().toISOString() };
    await kv.set(`${P}book:${id}`, updated);
    return c.json({ book: updated });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── DELETE /books/:id ───────────────────────────────────────────────
app.delete("/make-server-d4405fa6/books/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const book = await kv.get(`${P}book:${id}`);
    if (!book) return c.json({ error: "Not found" }, 404);

    // Delete book metadata
    await kv.del(`${P}book:${id}`);

    // Delete chapters via direct Supabase query (by prefix)
    const { error: chapErr } = await sb()
      .from("kv_store_d4405fa6")
      .delete()
      .like("key", `${P}chapter:${id}:%`);
    if (chapErr) console.log("Chapter delete error:", chapErr.message);

    // Delete file from storage
    if (book.fileUrl) {
      await sb().storage.from(BUCKET).remove([book.fileUrl]);
    }

    return c.json({ success: true });
  } catch (e) {
    console.log("DELETE /books error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Users & Auth ───────────────────────────────────────────────────
const INITIAL_DEFAULT_USERS = [
  { id: "1", name: "Administrator", email: "admin@ub.ac.id", password: "Admin123", role: "admin", faculty: "Rektorat", status: "active", joined: "2024-01-01" },
  { id: "2", name: "Siti Rahayu", email: "mahasiswa@ub.ac.id", password: "User123", role: "user", faculty: "MIPA", status: "active", joined: "2024-03-10" },
  { id: "3", name: "Budi Santoso", email: "relawan@ub.ac.id", password: "Vol123", role: "volunteer", faculty: "Teknik", status: "active", joined: "2024-01-20" },
  { id: "4", name: "Ahmad Fauzan", email: "ahmad@student.ub.ac.id", password: "User123", role: "user", faculty: "Hukum", status: "active", joined: "2024-02-15" },
  { id: "5", name: "Rizky Pratama", email: "rizky@student.ub.ac.id", password: "User123", role: "user", faculty: "Teknik", status: "pending", joined: "2024-04-01" },
  { id: "6", name: "Dewi Lestari", email: "dewi@student.ub.ac.id", password: "Vol123", role: "volunteer", faculty: "Ilmu Budaya", status: "active", joined: "2024-03-25" },
];

async function ensureSeedUsers() {
  const existingUsers = await kv.getByPrefix(`${P}user:`);
  const missingDefaults = INITIAL_DEFAULT_USERS.filter(
    (def) => !existingUsers.some((u: any) => u.email?.toLowerCase() === def.email.toLowerCase())
  );
  if (missingDefaults.length > 0) {
    const hashedDefaults = await Promise.all(
      missingDefaults.map(async (u) => ({
        ...u,
        passwordHash: await hashPassword(u.password),
      }))
    );
    const keys = hashedDefaults.map((u) => `${P}user:${u.id}`);
    await kv.mset(keys, hashedDefaults);
    console.log(`Seeded ${hashedDefaults.length} hashed default users to Supabase`);
    return await kv.getByPrefix(`${P}user:`);
  }
  return existingUsers;
}

// GET /users
app.get("/make-server-d4405fa6/users", async (c) => {
  try {
    const users = await ensureSeedUsers();
    // Strip password and passwordHash from user list output for security
    const safeUsers = users.map(({ password, passwordHash, ...rest }) => rest);
    return c.json({ users: safeUsers });
  } catch (e) {
    console.log("GET /users error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// POST /auth/login
app.post("/make-server-d4405fa6/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const cleanEmail = sanitizeString(email).toLowerCase();

    // 1. Rate limiting check (Brute Force / DDoS Defense)
    const rateCheck = checkRateLimit(cleanEmail);
    if (!rateCheck.allowed) {
      return c.json(
        { error: "Too many failed login attempts. Account temporarily locked.", reason: "ratelimit" },
        429
      );
    }

    const users = await ensureSeedUsers();
    const inputHash = await hashPassword(password);

    // 2. Compare password (supporting both hashed and fallback plain text)
    const found = users.find((u: any) => {
      const isEmailMatch = u.email?.toLowerCase() === cleanEmail;
      if (!isEmailMatch) return false;
      if (u.passwordHash && u.passwordHash === inputHash) return true;
      if (u.password && (u.password === password || u.password === inputHash)) return true;
      return false;
    });

    if (!found) {
      recordFailedAttempt(cleanEmail);
      return c.json({ error: "Invalid credentials", reason: "invalid" }, 401);
    }

    // Clear failed attempts on successful authentication
    clearFailedAttempts(cleanEmail);

    if (found.status === "pending") {
      return c.json({ error: "Account pending verification", reason: "pending" }, 403);
    }
    if (found.status === "suspended") {
      return c.json({ error: "Account suspended", reason: "invalid" }, 403);
    }

    const { password: _, passwordHash: __, ...userWithoutPassword } = found;
    return c.json({ user: userWithoutPassword });
  } catch (e) {
    console.log("POST /auth/login error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// POST /users — Register user
app.post("/make-server-d4405fa6/users", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, password, role, faculty, nim, disability } = body;

    // 1. Input Sanitization (XSS Defense)
    const cleanName = sanitizeString(name);
    const cleanEmail = sanitizeString(email).toLowerCase();
    const cleanFaculty = sanitizeString(faculty);
    const cleanNim = sanitizeString(nim);
    const cleanDisability = sanitizeString(disability);

    if (!cleanName || !cleanEmail || !password || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const users = await ensureSeedUsers();
    if (users.some((u: any) => u.email?.toLowerCase() === cleanEmail)) {
      return c.json({ error: "Email is already registered" }, 400);
    }

    // 2. Web Crypto Password Hashing
    const passwordHash = await hashPassword(password);

    const newUser = {
      id: crypto.randomUUID(),
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      role: role || "user",
      faculty: cleanFaculty || "General",
      nim: cleanNim || "",
      disability: cleanDisability || "",
      status: "pending",
      joined: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    await kv.set(`${P}user:${newUser.id}`, newUser);
    const { passwordHash: _, ...safeUser } = newUser;
    return c.json({ user: safeUser });
  } catch (e) {
    console.log("POST /users error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// PUT /users/:id
app.put("/make-server-d4405fa6/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`${P}user:${id}`);
    if (!existing) return c.json({ error: "User not found" }, 404);
    const updates = await c.req.json();
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`${P}user:${id}`, updated);
    return c.json({ user: updated });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// DELETE /users/:id
app.delete("/make-server-d4405fa6/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`${P}user:${id}`);
    return c.json({ success: true });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── File processing ─────────────────────────────────────────────────
async function processFile(
  buffer: Uint8Array,
  fileType: string,
  title: string
): Promise<{ title: string; content: string }[]> {
  try {
    if (fileType === "txt") {
      const text = new TextDecoder().decode(buffer);
      return splitIntoChapters(text, title);
    }
    if (fileType === "epub") {
      return await processEpub(buffer);
    }
    if (fileType === "pdf") {
      const text = await extractPdfText(buffer);
      return splitIntoChapters(text, title);
    }
  } catch (e) {
    console.log(`processFile(${fileType}) error:`, e);
  }
  return [];
}

// EPUB → chapters
async function processEpub(buffer: Uint8Array): Promise<{ title: string; content: string }[]> {
  const { unzipSync } = await import("npm:fflate@0.8.2");
  const files = unzipSync(buffer);
  const fileNames = Object.keys(files);

  // Find OPF (package file)
  const opfPath = fileNames.find((k) => k.endsWith(".opf")) ?? "";
  if (!opfPath) throw new Error("No OPF found in EPUB");

  const opfText = new TextDecoder().decode(files[opfPath]);
  const opfDir  = opfPath.includes("/") ? opfPath.slice(0, opfPath.lastIndexOf("/") + 1) : "";

  // Parse manifest: id → href
  const manifest: Record<string, string> = {};
  for (const m of opfText.matchAll(/<item[^>]+id="([^"]+)"[^>]+href="([^"]+)"/g)) {
    manifest[m[1]] = m[2];
  }
  // Fallback: also try href-first order in manifest
  for (const m of opfText.matchAll(/<item[^>]+href="([^"]+)"[^>]+id="([^"]+)"/g)) {
    manifest[m[2]] = m[1];
  }

  // Parse spine order
  const spineIds = [...opfText.matchAll(/idref="([^"]+)"/g)].map((m) => m[1]);

  const chapters: { title: string; content: string }[] = [];

  for (const refId of spineIds) {
    const href = manifest[refId];
    if (!href) continue;
    const fullPath = opfDir + href;
    const fileData  = files[fullPath] ?? files[href];
    if (!fileData) continue;

    const html    = new TextDecoder().decode(fileData);
    const rawTitle = html.match(/<(?:h1|h2|h3|title)[^>]*>([^<]+)<\/(?:h1|h2|h3|title)>/i)?.[1];
    const chTitle  = rawTitle ? htmlDecode(rawTitle).trim() : `Bagian ${chapters.length + 1}`;
    const content  = htmlToText(html).trim();

    if (content.length > 80) {
      chapters.push({ title: chTitle, content });
    }
  }

  return chapters;
}

// PDF text extraction
async function extractPdfText(buffer: Uint8Array): Promise<string> {
  try {
    // Attempt with pdf-parse (works in Deno with Node compat)
    const { Buffer } = await import("node:buffer");
    const pdfParse   = await import("npm:pdf-parse/lib/pdf-parse.js");
    const data       = await pdfParse.default(Buffer.from(buffer));
    return data.text ?? "";
  } catch (e) {
    console.log("pdf-parse failed, using raw extraction:", String(e).slice(0, 100));
    // Fallback: pull printable ASCII from binary stream
    const raw = new TextDecoder("latin1").decode(buffer);
    // Grab text inside BT/ET blocks (PDF text operators)
    const chunks: string[] = [];
    for (const m of raw.matchAll(/BT[\s\S]*?ET/g)) {
      const block = m[0];
      for (const t of block.matchAll(/\(([^)]{1,200})\)\s*Tj/g)) {
        chunks.push(t[1]);
      }
    }
    return chunks.length > 0 ? chunks.join(" ") : raw.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ");
  }
}

// Plain-text → chapters
function splitIntoChapters(text: string, fallbackTitle: string): { title: string; content: string }[] {
  // Indonesian & English chapter heading patterns
  const HEADING = /\n((?:BAB|Bab|CHAPTER|Chapter|BAGIAN|Bagian|SECTION|Section)\s+(?:\d+|[IVXivx]+)[^\n]*)\n/g;
  const MD_HEAD = /\n(#{1,3}\s+[^\n]+)\n/g;

  for (const regex of [HEADING, MD_HEAD]) {
    const parts = text.split(regex);
    if (parts.length > 2) {
      const chapters: { title: string; content: string }[] = [];
      // text before first heading → Pendahuluan
      if (parts[0].trim().length > 200) {
        chapters.push({ title: "Pendahuluan", content: parts[0].trim() });
      }
      for (let i = 1; i + 1 < parts.length; i += 2) {
        const t = parts[i].replace(/^#+\s*/, "").trim();
        const c = (parts[i + 1] ?? "").trim();
        if (c.length > 50) chapters.push({ title: t, content: c });
      }
      if (chapters.length > 0) return chapters;
    }
  }

  // Fallback: ~1500-word chunks
  const words = text.trim().split(/\s+/);
  const size  = 1500;
  const result: { title: string; content: string }[] = [];
  for (let i = 0; i < words.length; i += size) {
    result.push({
      title  : result.length === 0 ? fallbackTitle : `Bagian ${result.length + 1}`,
      content: words.slice(i, i + size).join(" "),
    });
  }
  return result.length > 0 ? result : [{ title: fallbackTitle, content: text }];
}

// HTML helpers
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/(?:h[1-6]|div|section|article|blockquote)>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s*&amp;\s*/g, " & ")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&#\d+;/g, "").replace(/&[a-z]+;/g, "")
    .replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}
function htmlDecode(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
}

// Cover & colour helpers
const CAT_COLOURS: Record<string, string> = {
  Hukum: "#0A1172", Sains: "#0D7070", Teknik: "#3B5BDB", Ekonomi: "#B45309",
  Sosial: "#7C3AED", Psikologi: "#BE185D", Teknologi: "#047857", Kedokteran: "#DC2626",
  Pertanian: "#15803D", Sastra: "#1D4ED8",
};
function categoryColor(cat: string) {
  return CAT_COLOURS[cat] ?? "#0A1172";
}
const CAT_COVERS: Record<string, string> = {
  Hukum:     "https://images.unsplash.com/photo-1709626011485-6fe000ea2dbc?w=400&h=560&fit=crop",
  Sains:     "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400&h=560&fit=crop",
  Teknik:    "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=560&fit=crop",
  Ekonomi:   "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=400&h=560&fit=crop",
  Sosial:    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=560&fit=crop",
  Psikologi: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&h=560&fit=crop",
  Teknologi: "https://images.unsplash.com/photo-1592659762303-90081d34b277?w=400&h=560&fit=crop",
  Kedokteran:"https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=560&fit=crop",
  Pertanian: "https://images.unsplash.com/photo-1621394988863-117a9fc6e77f?w=400&h=560&fit=crop",
};
function defaultCover(cat: string) {
  return CAT_COVERS[cat] ?? "https://images.unsplash.com/photo-1709626011485-6fe000ea2dbc?w=400&h=560&fit=crop";
}

Deno.serve(app.fetch);

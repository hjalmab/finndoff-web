/**
 * scripts/import-wix-blog.ts
 *
 * Leser scripts/wix-export/raw-crawl.json (generert av crawl-wix-blog.ts)
 * og importerer innleggene som blogPost-dokumenter i Sanity.
 *
 * Konverterer markdown → Sanity Portable Text automatisk.
 * Eksisterende dokumenter med samme slug oppdateres (createOrReplace).
 *
 * Kjør: npx tsx scripts/import-wix-blog.ts
 * Forutsetter: SANITY_API_WRITE_TOKEN + rå crawl-fil fra forrige steg
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const CRAWL_FILE = join(process.cwd(), "scripts/wix-export/raw-crawl.json");

// ── Sanity Portable Text-hjelpere ─────────────────────────────────────────
const key = () => randomUUID().slice(0, 8);

function makeBlock(text: string, style = "normal"): object {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: text.trim(), marks: [] }],
  };
}

// ── Markdown → Portable Text ──────────────────────────────────────────────
function markdownToPortableText(markdown: string): object[] {
  const blocks: object[] = [];
  const lines = markdown.split("\n");

  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      for (const item of listItems) {
        blocks.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: key(), text: item, marks: [] }],
        });
      }
      listItems = [];
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // ── Headings ──────────────────────────────────────────────────────
    const h4Match = line.match(/^####\s+(.+)/);
    if (h4Match) { flushList(); blocks.push(makeBlock(h4Match[1], "h4")); continue; }

    const h3Match = line.match(/^###\s+(.+)/);
    if (h3Match) { flushList(); blocks.push(makeBlock(h3Match[1], "h3")); continue; }

    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) { flushList(); blocks.push(makeBlock(h2Match[1], "h2")); continue; }

    const h1Match = line.match(/^#\s+(.+)/);
    if (h1Match) { flushList(); blocks.push(makeBlock(h1Match[1], "h2")); continue; } // H1 → H2

    // ── Blockquote ────────────────────────────────────────────────────
    const bqMatch = line.match(/^>\s+(.+)/);
    if (bqMatch) { flushList(); blocks.push(makeBlock(bqMatch[1], "blockquote")); continue; }

    // ── Bullet list ───────────────────────────────────────────────────
    const listMatch = line.match(/^[-*]\s+(.+)/);
    if (listMatch) {
      inList = true;
      listItems.push(listMatch[1]);
      continue;
    }

    // ── Horisontale linjer / bildemetadata — hopp over ───────────────
    if (/^---+$/.test(line) || /^!\[/.test(line)) {
      flushList();
      continue;
    }

    // ── Tom linje ─────────────────────────────────────────────────────
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // ── Normalt avsnitt ───────────────────────────────────────────────
    // Strip inline markdown (bold, italic, links) for ren tekst
    const cleaned = line
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .trim();

    if (cleaned) {
      flushList();
      blocks.push(makeBlock(cleaned));
    }
  }

  flushList();

  // Fjern blokkene som bare er metadata/nav-støy fra WIX (f.eks. korte 1-2-ord blokker)
  return blocks.filter((b: unknown) => {
    const block = b as { children?: Array<{ text?: string }> };
    const text = block.children?.[0]?.text ?? "";
    return text.length > 2;
  });
}

// ── Categoriser post fra innhold og tittel ────────────────────────────────
function guessCategory(title: string, markdown: string): string {
  const text = (title + " " + markdown).toLowerCase();
  if (/lansering|nyhet|oppdatering|kunngjøring/.test(text)) return "nyheter";
  if (/kom i gang|starte|begynne|første|intro/.test(text)) return "komme-i-gang";
  if (/tips|hvordan|guide|best practice/.test(text)) return "produkttips";
  if (/bransje|marked|anskaffelse|doffin/.test(text)) return "bransje";
  if (/partner|samarbeid|nettverk/.test(text)) return "partnerskap";
  return "nyheter";
}

// ── Parse dato til ISO-string ─────────────────────────────────────────────
function parseDate(raw: string | null): string {
  if (!raw) return new Date().toISOString();
  try {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch {
    // fall through
  }
  return new Date().toISOString();
}

// ── Slugify ───────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

// ── Hoved-import ──────────────────────────────────────────────────────────
async function main() {
  if (!existsSync(CRAWL_FILE)) {
    console.error(`❌ Finner ikke ${CRAWL_FILE}`);
    console.error("   Kjør først: npx tsx scripts/crawl-wix-blog.ts");
    process.exit(1);
  }

  const posts: Array<{
    wixUrl: string;
    wixSlug: string;
    newSlug: string;
    title: string;
    excerpt: string;
    publishedAt: string | null;
    markdown: string;
  }> = JSON.parse(readFileSync(CRAWL_FILE, "utf-8"));

  console.log(`📦 Importerer ${posts.length} innlegg til Sanity...\n`);

  let imported = 0;
  let skipped = 0;

  for (const post of posts) {
    if (!post.title) {
      console.warn(`  ⚠️  Hopper over innlegg uten tittel: ${post.wixUrl}`);
      skipped++;
      continue;
    }

    const slug = post.newSlug || slugify(post.title);
    const docId = `blog-wix-${slug}`.replace(/[^a-zA-Z0-9-_]/g, "-");

    const body = markdownToPortableText(post.markdown);

    if (body.length === 0) {
      console.warn(`  ⚠️  Ingen innhold funnet for: ${post.title}`);
      skipped++;
      continue;
    }

    const doc = {
      _id: docId,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: slug },
      category: guessCategory(post.title, post.markdown),
      excerpt: post.excerpt.slice(0, 200) || undefined,
      publishedAt: parseDate(post.publishedAt),
      body,
      // SEO: generer fra tittel (kan redigeres i Studio etterpå)
      seoTitle: post.title.slice(0, 60),
      seoDescription: post.excerpt.slice(0, 160) || undefined,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ "${post.title}"`);
    console.log(`     slug: ${slug} | blokker: ${body.length}`);
    imported++;
  }

  console.log(`\n📊 Resultat:`);
  console.log(`   Importert: ${imported}`);
  console.log(`   Hoppet over: ${skipped}`);
  console.log(`\n💡 Husk å:`);
  console.log(`   1. Legg til redirect-mappinger fra scripts/wix-export/next-redirects.json`);
  console.log(`      i next.config.ts (se scripts/apply-wix-redirects.ts)`);
  console.log(`   2. Sjekk og rediger innleggene i Sanity Studio (/studio)`);
  console.log(`   3. Legg til forfatter-referanser manuelt der det er relevant`);
}

main().catch((err) => {
  console.error("❌ Import feilet:", err);
  process.exit(1);
});

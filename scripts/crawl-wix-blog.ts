/**
 * scripts/crawl-wix-blog.ts
 *
 * Bruker Firecrawl til å hente alle nyhetsinnlegg fra WIX-siden (market.finndoff.no/nyheter).
 * Strategi: map() for å finne alle URL-er → scrape() på hvert enkelt innlegg.
 *
 * Output til scripts/wix-export/:
 *   raw-crawl.json      — alle innlegg med markdown + metadata
 *   redirect-map.json   — gammel WIX-URL → ny Sanity/Next.js-URL
 *   next-redirects.json — klar for copy-paste i next.config.ts
 *
 * Kjør: npm run wix:crawl
 * Forutsetter: FIRECRAWL_API_KEY i .env.local
 */

import { FirecrawlClient } from "@mendable/firecrawl-js";
import type { Document, SearchResultWeb } from "@mendable/firecrawl-js";
import { config } from "dotenv";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

config({ path: ".env.local" });

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
if (!FIRECRAWL_API_KEY) {
  console.error("❌ Mangler FIRECRAWL_API_KEY i .env.local");
  console.error("   FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxx");
  process.exit(1);
}

const WIX_SITE_URL = "https://market.finndoff.no";
const NEW_BASE_PATH = "/nyheter";
const OUTPUT_DIR = join(process.cwd(), "scripts/wix-export");

// ── Slugify ───────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

// ── Trekk ut slug fra en WIX nyheter-URL ─────────────────────────────────
function extractWixSlug(url: string): string | null {
  const patterns = [
    /\/nyheter\/([^/?#]+)/,
    /\/blog\/post\/([^/?#]+)/,
    /\/post\/([^/?#]+)/,
    /\/blog\/([^/?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1] !== "post") {
      try { return decodeURIComponent(match[1]); } catch { return match[1]; }
    }
  }
  return null;
}

// ── Trekk ut excerpt ─────────────────────────────────────────────────────
function extractExcerpt(markdown: string, maxLength = 200): string {
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("!") && trimmed.length > 30) {
      return trimmed
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\[(.+?)\]\(.+?\)/g, "$1")
        .slice(0, maxLength);
    }
  }
  return "";
}

// ── Hoved-crawl ──────────────────────────────────────────────────────────
async function main() {
  console.log("🔍 Starter Firecrawl WIX-migrasjon...");
  console.log(`   Kart: ${WIX_SITE_URL}\n`);

  const app = new FirecrawlClient({ apiKey: FIRECRAWL_API_KEY });

  // Steg 1: Map for å finne alle nyheter-URLer
  console.log("📡 Henter URL-kart fra market.finndoff.no...");
  const mapResult = await app.map(WIX_SITE_URL, { includeSubdomains: false });
  const allLinks: SearchResultWeb[] = mapResult.links ?? [];
  const allUrls = allLinks.map((l) => l.url);

  const nyheterUrls = allUrls.filter((url) => extractWixSlug(url) !== null);

  console.log(`   Totalt ${allUrls.length} sider funnet`);
  console.log(`   ${nyheterUrls.length} nyhetsinnlegg identifisert\n`);

  if (nyheterUrls.length === 0) {
    console.warn("⚠️  Ingen innlegg funnet i URL-kartet. Alle URL-er:");
    allUrls.forEach((u) => console.log(`   ${u}`));
    process.exit(1);
  }

  // Steg 2: Scrape hvert innlegg
  const exportedPosts: Array<{
    wixUrl: string;
    wixSlug: string;
    newSlug: string;
    title: string;
    excerpt: string;
    publishedAt: string | null;
    markdown: string;
  }> = [];

  const redirectMap: Array<{
    source: string;
    destination: string;
    permanent: boolean;
    wixUrl: string;
    title: string;
  }> = [];

  for (const url of nyheterUrls) {
    process.stdout.write(`  📄 ${url.slice(0, 75)}...`);

    let page: Document;
    try {
      page = await app.scrape(url, {
        formats: ["markdown"],
        onlyMainContent: true,
      });
    } catch (err) {
      console.log(` ❌ (${(err as Error).message})`);
      continue;
    }

    const wixSlug = extractWixSlug(url) ?? "ukjent";
    const title = page.metadata?.title ?? page.metadata?.ogTitle ?? "";
    const markdown = page.markdown ?? "";

    const newSlug = title ? slugify(title) : slugify(wixSlug);
    const excerpt = extractExcerpt(markdown);
    const publishedAt = page.metadata?.publishedTime ?? page.metadata?.dcDate ?? null;

    exportedPosts.push({ wixUrl: url, wixSlug, newSlug, title, excerpt, publishedAt, markdown });

    let wixPath = "/";
    try { wixPath = new URL(url).pathname; } catch { /* ignore */ }

    redirectMap.push({
      source: wixPath,
      destination: `${NEW_BASE_PATH}/${newSlug}`,
      permanent: true,
      wixUrl: url,
      title,
    });

    console.log(` ✅ "${title}"`);
  }

  console.log();

  // ── Skriv output ──────────────────────────────────────────────────────
  mkdirSync(OUTPUT_DIR, { recursive: true });

  writeFileSync(join(OUTPUT_DIR, "raw-crawl.json"), JSON.stringify(exportedPosts, null, 2), "utf-8");
  writeFileSync(join(OUTPUT_DIR, "redirect-map.json"), JSON.stringify(redirectMap, null, 2), "utf-8");

  const nextRedirects = redirectMap.map(({ source, destination, permanent }) => ({
    source, destination, permanent,
  }));
  writeFileSync(join(OUTPUT_DIR, "next-redirects.json"), JSON.stringify(nextRedirects, null, 2), "utf-8");

  console.log("💾 Lagret til scripts/wix-export/:");
  console.log(`   raw-crawl.json      — ${exportedPosts.length} innlegg`);
  console.log(`   redirect-map.json   — ${redirectMap.length} redirects`);
  console.log(`   next-redirects.json — klar for next.config.ts`);
  console.log("\n✨ Neste steg: npm run wix:import");
}

main().catch((err) => {
  console.error("❌ Crawl feilet:", err.message ?? err);
  process.exit(1);
});

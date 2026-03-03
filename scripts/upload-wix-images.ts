/**
 * scripts/upload-wix-images.ts
 *
 * For hvert WIX-innlegg i raw-crawl.json:
 *   1. Finner det første/beste bildet i markdown
 *   2. Laster ned fra static.wixstatic.com (striper WIX-transformasjon)
 *   3. Laster opp til Sanity som image-asset
 *   4. Setter mainImage på tilhørende blogPost-dokument
 *
 * Kjør: npx tsx scripts/upload-wix-images.ts
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const CRAWL_FILE = join(process.cwd(), "scripts/wix-export/raw-crawl.json");

// ── Trekk ut ren WIX bilde-URL (uten transformasjon) ─────────────────────
function getBaseImageUrl(url: string): string {
  // WIX-mønster: https://static.wixstatic.com/media/HASH~mv2.ext/v1/fill/.../filename
  // Vi vil ha: https://static.wixstatic.com/media/HASH~mv2.ext
  const match = url.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+(?:~mv2)?\.(?:jpg|jpeg|png|webp|gif))/i);
  if (match) return match[1];

  // Shapes (SVG): https://static.wixstatic.com/shapes/...
  const shapesMatch = url.match(/^(https:\/\/static\.wixstatic\.com\/shapes\/[^/?\s]+)/i);
  if (shapesMatch) return shapesMatch[1];

  return url.split("?")[0]; // fallback
}

// ── Trekk ut MIME-type fra URL ─────────────────────────────────────────────
function getMimeType(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes(".png")) return "image/png";
  if (lower.includes(".webp")) return "image/webp";
  if (lower.includes(".gif")) return "image/gif";
  if (lower.includes(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

// ── Finn det beste bildet i markdown ─────────────────────────────────────
// Heuristikk: velg det største bildet (høyest w_-parameter), fallback til første
function findBestImage(markdown: string): { url: string; alt: string } | null {
  const imageRegex = /!\[([^\]]*)\]\((https:\/\/static\.wixstatic\.com\/[^)]+)\)/g;

  let bestUrl: string | null = null;
  let bestAlt = "";
  let bestWidth = 0;

  let m: RegExpExecArray | null;
  const seen = new Set<string>();

  while ((m = imageRegex.exec(markdown)) !== null) {
    const rawUrl = m[2];
    const alt = m[1];
    const baseUrl = getBaseImageUrl(rawUrl);

    // Skip SVG shapes og duplikater
    if (baseUrl.includes("/shapes/") || seen.has(baseUrl)) continue;
    // Skip veldig små bilder (thumbnails)
    const widthMatch = rawUrl.match(/w_(\d+)/);
    const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
    if (width > 0 && width < 300) continue; // hopp over thumbnails

    seen.add(baseUrl);

    if (width > bestWidth || bestUrl === null) {
      bestWidth = width;
      bestUrl = baseUrl;
      bestAlt = alt;
    }
  }

  if (!bestUrl) return null;
  return { url: bestUrl, alt: bestAlt };
}

// ── Last ned og upload til Sanity ─────────────────────────────────────────
async function uploadImageFromUrl(
  imageUrl: string,
  filename: string,
  mimeType: string
): Promise<string> {
  const response = await fetch(imageUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Finndoff-migrasjon/1.0)" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${imageUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: mimeType,
  });

  return asset._id;
}

// ── Slugify (for å matche docId) ──────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s*\|\s*Finndoff\.no\s*$/i, "")
    .replace(/\s*-\s*Finndoff\.no\s*$/i, "")
    .trim()
    .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

// ── Hoved-script ──────────────────────────────────────────────────────────
async function main() {
  if (!existsSync(CRAWL_FILE)) {
    console.error(`❌ Finner ikke ${CRAWL_FILE}`);
    process.exit(1);
  }

  const posts: Array<{
    wixSlug: string;
    newSlug: string;  // slug som ble brukt ved opprettelse (kan ha -finndoff-no suffix)
    title: string;
    markdown: string;
  }> = JSON.parse(readFileSync(CRAWL_FILE, "utf-8"));

  console.log(`🖼  Laster opp bilder for ${posts.length} innlegg...\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of posts) {
    const cleanTitle = post.title
      .replace(/\s*\|\s*Finndoff\.no\s*$/i, "")
      .replace(/\s*-\s*Finndoff\.no\s*$/i, "")
      .trim();

    // Bruk newSlug fra crawl-filen — dette er slugen som ble brukt ved import
    // og som Sanity _id ble generert fra (uforanderlig selv etter cleanup)
    const docId = `blog-wix-${post.newSlug}`.replace(/[^a-zA-Z0-9-_]/g, "-");

    const image = findBestImage(post.markdown);

    if (!image) {
      console.log(`  ⏭  Ingen bilde: "${cleanTitle}"`);
      skipped++;
      continue;
    }

    process.stdout.write(`  📸 "${cleanTitle.slice(0, 50)}"...`);

    try {
      const ext = image.url.match(/\.(jpg|jpeg|png|webp|gif)$/i)?.[1] ?? "jpg";
      const filename = `${slugify(cleanTitle).slice(0, 40)}.${ext}`;
      const mimeType = getMimeType(image.url);

      const assetId = await uploadImageFromUrl(image.url, filename, mimeType);

      // Oppdater mainImage på blogPost-dokumentet
      await client.patch(docId).set({
        mainImage: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
          alt: image.alt || cleanTitle,
        },
      }).commit();

      console.log(` ✅`);
      uploaded++;
    } catch (err) {
      console.log(` ❌ (${(err as Error).message.slice(0, 60)})`);
      failed++;
    }
  }

  console.log(`\n📊 Resultat:`);
  console.log(`   Lastet opp: ${uploaded}`);
  console.log(`   Ingen bilde: ${skipped}`);
  console.log(`   Feilet: ${failed}`);
  console.log(`\n✨ Sjekk bildene i Sanity Studio (/studio → Blogginnlegg)`);
}

main().catch((err) => {
  console.error("❌ Feilet:", err);
  process.exit(1);
});

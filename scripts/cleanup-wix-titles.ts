/**
 * scripts/cleanup-wix-titles.ts
 *
 * Rydder opp i WIX-importerte blogginnlegg:
 * - Fjerner " | Finndoff.no" suffix fra titler
 * - Regenererer slug og SEO-tittel basert på renset tittel
 *
 * Kjør: npx tsx scripts/cleanup-wix-titles.ts
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s*\|\s*Finndoff\.no\s*$/i, "")
    .replace(/\s*-\s*Finndoff\.no\s*$/i, "")
    .trim();
}

async function main() {
  // Hent alle WIX-importerte innlegg
  const posts = await client.fetch<Array<{ _id: string; title: string; slug: { current: string } }>>(
    `*[_type == "blogPost" && _id match "blog-wix-*"]{ _id, title, slug }`
  );

  console.log(`🔍 Fant ${posts.length} WIX-importerte innlegg å rydde opp\n`);

  for (const post of posts) {
    const cleanedTitle = cleanTitle(post.title);
    const newSlug = slugify(cleanedTitle);

    if (cleanedTitle === post.title && newSlug === post.slug.current) {
      console.log(`  ⏭  Uendret: "${post.title}"`);
      continue;
    }

    await client.patch(post._id).set({
      title: cleanedTitle,
      slug: { _type: "slug", current: newSlug },
      seoTitle: cleanedTitle.slice(0, 60),
    }).commit();

    console.log(`  ✅ "${post.title}"`);
    console.log(`     → "${cleanedTitle}"`);
    console.log(`     slug: ${newSlug}`);
  }

  console.log("\n✨ Ferdig!");
}

main().catch((err) => {
  console.error("❌ Feilet:", err);
  process.exit(1);
});

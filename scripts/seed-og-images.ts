import { createClient } from "@sanity/client";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const SCREENSHOTS = path.resolve("docs/screenshots");
const SITE_FILES = path.resolve("docs/2025_web_page/Site Files");

async function uploadImage(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const imageBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  const contentType =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : "image/webp";

  const asset = await client.assets.upload("image", imageBuffer, {
    filename,
    contentType,
  });

  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function seed() {
  console.log("Uploading OG images...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  // ─── 1. Default OG image on siteSettings ──────────────────────────
  console.log("1. siteSettings — defaultOgImage");
  try {
    const siteSettings = await client.fetch<{ _id: string }>(
      `*[_type == "siteSettings"][0]{ _id }`
    );
    if (!siteSettings) {
      console.error("   ✗ siteSettings document not found");
    } else {
      const file = path.join(SITE_FILES, "20240318_Lykkelig arkitekt.png");
      console.log("   📷 Uploading Lykkelig arkitekt.png...");
      const image = await uploadImage(file);
      await client.patch(siteSettings._id).set({ defaultOgImage: image }).commit();
      console.log("   ✓ defaultOgImage set");
    }
  } catch (err: any) {
    console.error(`   ✗ ${err.message}`);
  }

  // ─── 2. Product OG images ─────────────────────────────────────────
  const productOgImages = [
    {
      docId: "product-anbudshjelp-ai",
      file: path.join(SCREENSHOTS, "anbudshjelp-ai-hero.png"),
      label: "Anbudshjelp AI screenshot",
    },
    {
      docId: "product-innsikt",
      file: path.join(SITE_FILES, "Screenshot 2024-07-08 at 10.48.11.png"),
      label: "Innkjøpsplaner screenshot (wider, better for OG)",
    },
    {
      docId: "product-varsling",
      file: path.join(SCREENSHOTS, "innsikt-hero.png"),
      // Using innsikt screenshot (landscape) instead of varsling mobile (portrait)
      // — portrait images look bad as OG images
      label: "Finndoff app screenshot (landscape)",
    },
  ];

  console.log("\n2. Product ogImage fields");
  for (const { docId, file, label } of productOgImages) {
    try {
      console.log(`   📷 ${docId}: ${label}...`);
      const image = await uploadImage(file);
      await client.patch(docId).set({ ogImage: image }).commit();
      console.log(`   ✓ ${docId}`);
    } catch (err: any) {
      console.error(`   ✗ ${docId}: ${err.message}`);
    }
  }

  console.log("\nDone! OG images uploaded.");
  console.log("\nPages without explicit OG images (hjem, priser, om-oss, konsulent)");
  console.log("will fall back to the defaultOgImage (Lykkelig arkitekt).");
  console.log("\nBlog posts use their mainImage as OG fallback.");
}

seed();

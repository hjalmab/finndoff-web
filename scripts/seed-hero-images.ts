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

const SCREENSHOTS_DIR = path.resolve("docs/screenshots");

const heroImages = [
  {
    productId: "product-anbudshjelp-ai",
    filename: "anbudshjelp-ai-hero.png",
    alt: "Anbudshjelp AI — Tilbudsbiblioteket med oversikt over anbudskonkurranser",
    deviceFrame: "desktop",
  },
  {
    productId: "product-innsikt",
    filename: "innsikt-hero.png",
    alt: "Finndoff Innsikt — Søk og filtrer rammeavtaler",
    deviceFrame: "tablet",
  },
  {
    productId: "product-varsling",
    filename: "varsling-hero.png",
    alt: "Finndoff Varsling — Varsler om nye kunngjøringer på mobil",
    deviceFrame: "phone",
  },
];

async function uploadImage(filename: string) {
  const filePath = path.join(SCREENSHOTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const imageBuffer = fs.readFileSync(filePath);
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
    alt: "",
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function seed() {
  console.log("Uploading hero screenshots and setting device frames...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  for (const { productId, filename, alt, deviceFrame } of heroImages) {
    try {
      // 1. Fetch the product document
      const doc = await client.getDocument(productId);
      if (!doc) {
        console.error(`  ✗ Document ${productId} not found — skipping`);
        continue;
      }

      const sections = doc.sections as any[];
      if (!sections || sections.length === 0 || sections[0]._type !== "hero") {
        console.error(`  ✗ No hero section at index 0 for ${productId} — skipping`);
        continue;
      }

      // 2. Upload the screenshot
      console.log(`  📷 Uploading ${filename}...`);
      const image = await uploadImage(filename);
      image.alt = alt;

      // 3. Patch the hero section with image + deviceFrame
      sections[0].image = image;
      sections[0].deviceFrame = deviceFrame;

      await client.patch(doc._id).set({ sections }).commit();
      console.log(`  ✓ ${productId}: image + deviceFrame="${deviceFrame}"`);
    } catch (err: any) {
      console.error(`  ✗ Failed ${productId}: ${err.message}`);
    }
  }

  console.log("\nDone! Hero images and device frames updated.");
}

seed();

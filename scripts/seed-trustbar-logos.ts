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

const SITE_FILES = path.resolve("docs/2025_web_page/Site Files");

// Map of company name → filename in Site Files
const logoMap: Record<string, string> = {
  MEF: "MEF_logo .png",
  DHL: "DHL-logo-png.png",
  JobZone: "Jobzone.png",
  Vivende: "vivende-logo.png",
  ALV: "Logo_Fjordblå_PNG.png",
  Arkitektbedriftene: "arkitektforbundet.png",
  Byggmesterforbundet: "bmforbundet.png",
  "Brødrene Dahl": "Brødrene Dahl.png",
  BIRKsport: "birk sport_.png",
  Dignio: "Dignio-1024x576.jpg",
  NESO: "neso.png",
  "HD Medical": "HD Logo-kopi.png",
  "GP Gruppen": "GP Gruppen_var1.png",
  NINA: "Norsk institutt for naturforskning.png",
  Medicus: "Medicus.png",
  Taraldsvik: "taraldsvik.png",
};

async function uploadImage(filename: string) {
  const filePath = path.join(SITE_FILES, filename);
  const imageBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  const contentType =
    ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/webp";

  const asset = await client.assets.upload("image", imageBuffer, {
    filename,
    contentType,
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function seed() {
  console.log("Uploading TrustBar logos and patching homepage...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  // 1. Fetch current homepage to find the trustBar section
  const page = await client.getDocument("page-hjem");
  if (!page) {
    console.error("Could not find page-hjem document");
    process.exit(1);
  }

  const sections = page.sections as any[];
  const trustBarIndex = sections.findIndex((s: any) => s._type === "trustBar");
  if (trustBarIndex === -1) {
    console.error("No trustBar section found in page-hjem");
    process.exit(1);
  }

  const trustBar = sections[trustBarIndex];
  const logos = trustBar.logos as any[];

  console.log(`Found trustBar with ${logos.length} logos at section index ${trustBarIndex}\n`);

  // 2. Upload images and update each logo entry
  for (const logo of logos) {
    const filename = logoMap[logo.name];
    if (!filename) {
      console.log(`  ⚠ No file mapping for "${logo.name}" — skipping`);
      continue;
    }

    try {
      console.log(`  📷 Uploading ${filename} (${logo.name})...`);
      const image = await uploadImage(filename);
      logo.logo = image;
      console.log(`  ✓ ${logo.name}`);
    } catch (err: any) {
      console.error(`  ✗ Failed ${logo.name}: ${err.message}`);
    }
  }

  // 3. Patch the page document with updated trustBar
  sections[trustBarIndex] = trustBar;
  await client.patch(page._id).set({ sections }).commit();

  console.log("\nDone! Homepage trustBar updated with all logo images.");
}

seed();

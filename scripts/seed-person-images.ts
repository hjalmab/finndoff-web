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

// Person data with corrected LinkedIn URLs (from WIX source) and photos
const personUpdates = [
  // Team
  {
    _id: "person-hjalmar",
    photo: "Hjalmar profil.png",
    linkedIn: "https://www.linkedin.com/in/hjalmarboe/",
    bio: "Energisk leder som bygger team og partnerskap. Medgründer av Yalmar.com.",
  },
  {
    _id: "person-havard",
    photo: "håvard.jpeg",
    linkedIn: "https://www.linkedin.com/in/havardglattre/",
    bio: "Ekspert på Agile og integrasjoner, med erfaring fra Storebrand og Payex.",
  },
  {
    _id: "person-thomas",
    photo: "thomas.png",
    linkedIn: "https://www.linkedin.com/in/thomas-bangstad-a025b510a/",
    bio: "10+ år i B2B-salg, bidro til at EU Supply ble markedsleder før han kom til Finndoff.",
  },
  {
    _id: "person-daniel",
    photo: "daniel.jpeg",
    linkedIn: "https://www.linkedin.com/in/daniel-dalsborg-916118362/",
    bio: "Over 20 års erfaring med B2B-salg. En kreativ person som alltid har kundens beste i fokus.",
  },
  // Board
  {
    _id: "person-steinar",
    photo: "steinar.jpeg",
    linkedIn: "https://www.linkedin.com/in/koffeld/",
    bio: "Grunnlegger & CEO i Vivende & Ansatteid",
  },
  {
    _id: "person-rolf-olav",
    photo: "Bilde ROJ Høyoppløst.jpg",
    linkedIn: "https://www.linkedin.com/in/rolfolavjohannessen/",
    bio: "Medgründer/medeier og daglig leder i Kionor Anbudsservice AS som ble solgt til Visma/Mercell",
  },
  {
    _id: "person-pal-christian",
    photo: "pct.jpeg",
    linkedIn: "https://www.linkedin.com/in/palchris/",
    bio: "Dynamisk teknologileder, leder i Vivende Rebase",
  },
  {
    _id: "person-sven",
    photo: "sven.jpeg",
    linkedIn: "https://www.linkedin.com/in/sven-br%C3%A6nde-0a5184/",
    bio: "Grunnlegger av Mazeppa, erfaring fra IBM",
  },
];

async function uploadImage(filename: string): Promise<{ _type: string; asset: { _type: string; _ref: string } }> {
  const filePath = path.join(SITE_FILES, filename);
  const imageBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  const contentType = ext === "png" ? "image/png" : "image/jpeg";

  const asset = await client.assets.upload("image", imageBuffer, {
    filename,
    contentType,
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function seed() {
  console.log("Uploading person images and updating documents...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  for (const person of personUpdates) {
    try {
      // Upload image
      console.log(`  📷 Uploading ${person.photo}...`);
      const image = await uploadImage(person.photo);

      // Patch person document
      await client
        .patch(person._id)
        .set({
          image,
          linkedIn: person.linkedIn,
          bio: person.bio,
        })
        .commit();

      console.log(`  ✓ Updated ${person._id}`);
    } catch (err: any) {
      console.error(`  ✗ Failed ${person._id}: ${err.message}`);
    }
  }

  console.log("\nDone! All person documents updated with images, LinkedIn URLs and bios.");
}

seed();

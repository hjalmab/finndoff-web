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

// ─── Pages (type: "page") ───────────────────────────────────────────

const pageMetadata: Record<string, { seoTitle: string; seoDescription: string }> = {
  "page-hjem": {
    seoTitle: "Finn og vinn offentlige anbud",
    seoDescription:
      "Finndoff hjelper norske bedrifter med å finne, forstå og vinne offentlige anbud. Varsling, innsikt, AI-analyse og ekspertrådgivning på én plattform.",
  },
  "page-priser": {
    seoTitle: "Priser — Modulær prising fra 829 kr/mnd",
    seoDescription:
      "Start med anbudsvarsling for 829 kr/mnd. Legg til Innsikt og Anbudshjelp AI når du er klar. Ingen binding, 60 dagers åpent kjøp.",
  },
  "page-om-oss": {
    seoTitle: "Om oss — Teamet bak Finndoff",
    seoDescription:
      "Startet som en anbuds-app under pandemien. I dag en totalløsning bygget av IT-folk og bransjeveteraner som kombinerer teknologi med anbudsfaglig innsikt.",
  },
};

// ─── Products (type: "product") ─────────────────────────────────────

const productMetadata: Record<string, { seoTitle: string; seoDescription: string }> = {
  "product-varsling": {
    seoTitle: "Anbudsvarsling — Treffsikre varsler fra 829 kr/mnd",
    seoDescription:
      "Få varsel om relevante anbud basert på CPV-koder, nøkkelord og geografi. Personlig onboarding og support. 24/7 automatisk overvåking av Doffin.",
  },
  "product-innsikt": {
    seoTitle: "Innsikt — Rammeavtaler og konkurrentanalyse",
    seoDescription:
      "Søk i rammeavtaler, 300+ offentlige innkjøpsplaner og konkurrentdata. Se hvem som vinner anbud i ditt marked. Tillegg fra 649 kr/mnd.",
  },
  "product-anbudshjelp-ai": {
    seoTitle: "Anbudshjelp AI — Spar 80% tid på anbudsvurdering",
    seoDescription:
      "AI-analyse av kvalifikasjonskrav, dokumentoppsummering og tilbudsbibliotek. Bygg anbudsberedskap med dokumenter, CV-er og referanseprosjekter.",
  },
  "product-konsulent": {
    seoTitle: "Anbudskonsulent — Ekspert hjelp når du trenger det",
    seoDescription:
      "Erfarne anbudskonsulenter på for hire-modell. Fleksibel støtte uten faste kostnader, perfekt for viktige anbud. Levert via partnernettverket TendPro.",
  },
};

// ─── Blog posts (type: "blogPost") ─────────────────────────────────

const blogMetadata: Record<string, { seoTitle: string; seoDescription: string }> = {
  "blog-komme-i-gang-anbud": {
    seoTitle: "Slik kommer du i gang med offentlige anbud",
    seoDescription:
      "Alt du trenger å vite for å finne og delta i offentlige anbudskonkurranser. Steg-for-steg guide for bedrifter som er nye i anbudsmarkedet.",
  },
  "blog-5-tips-varsling": {
    seoTitle: "5 tips for å vinne flere anbud med varsling",
    seoDescription:
      "Lær hvordan du setter opp treffsikre anbudsvarsler med riktige CPV-koder, nøkkelord og geografiske filtre. Praktiske tips fra Finndoff-teamet.",
  },
  "blog-lansering-anbudshjelp-ai": {
    seoTitle: "Vi lanserer Anbudshjelp AI",
    seoDescription:
      "Finndoff lanserer AI-drevet anbudsanalyse. Se hvordan kunstig intelligens hjelper deg med å forstå kvalifikasjonskrav og spare tid på anbudsvurdering.",
  },
};

// ─── Run ────────────────────────────────────────────────────────────

async function seed() {
  console.log("Seeding SEO metadata (seoTitle + seoDescription)...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  const allEntries = [
    ...Object.entries(pageMetadata),
    ...Object.entries(productMetadata),
    ...Object.entries(blogMetadata),
  ];

  for (const [docId, { seoTitle, seoDescription }] of allEntries) {
    try {
      const doc = await client.getDocument(docId);
      if (!doc) {
        console.log(`  ⚠ ${docId} — not found, skipping`);
        continue;
      }

      await client
        .patch(docId)
        .set({ seoTitle, seoDescription })
        .commit();

      const titleLen = seoTitle.length;
      const descLen = seoDescription.length;
      console.log(
        `  ✓ ${docId} — title: ${titleLen} chars, desc: ${descLen} chars`
      );
    } catch (err: any) {
      console.error(`  ✗ ${docId}: ${err.message}`);
    }
  }

  console.log("\nDone! All SEO metadata seeded.");
  console.log(
    "\nNext steps:\n" +
      "  1. Review & tweak in Sanity Studio (under 'SEO' on each document)\n" +
      "  2. Upload OG-bilder (1200×630 px) per side + defaultOgImage i siteSettings\n" +
      "  3. Set NEXT_PUBLIC_SITE_URL=https://finndoff.no in Vercel env vars\n"
  );
}

seed();

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { randomUUID } from "crypto";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

const portableText = (text: string) => [
  {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  },
];

// App-screenshot: innsikt-hero.png (904x488, landscape — passer laptop-rammen)
const INNSIKT_HERO_IMAGE = "image-a4853624ba671ef7d88359d0d674e83b18d978a3-904x488-png";

const homepage = {
  _id: "page-hjem",
  _type: "page",
  title: "Hjem",
  slug: { _type: "slug", current: "hjem" },
  seoTitle: "Finndoff — Finn og vinn offentlige anbud",
  seoDescription:
    "Over 1 000 norske bedrifter bruker Finndoff for å aldri gå glipp av relevante anbud. Ekspertoppsett, AI-verktøy og anbudshjelp — alt under samme tak.",
  sections: [

    // ── 1. HERO ───────────────────────────────────────────────────────────
    // Endring #1: kvantifiserte stats under CTA
    // Endring #5: app-screenshot i laptop-ramme
    {
      _type: "hero",
      _key: key(),
      headline: "Finn og vinn ditt neste offentlige anbud",
      subheadline:
        "Over 1 000 norske bedrifter bruker Finndoff for å aldri gå glipp av relevante anbud. Vi setter opp alt for deg — ingen selvbetjening.",
      showSearchBar: false,
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://finndoff.no/signup",
      },
      secondaryCta: {
        text: "Se hvordan det fungerer",
        link: "#slik-fungerer-det",
      },
      // Endring #1: stats
      stats: [
        { _key: key(), value: "1 000+", label: "norske bedrifter" },
        { _key: key(), value: "4+ timer", label: "spart per uke" },
        { _key: key(), value: "100 %", label: "ekspertoppsett" },
      ],
      // Endring #5: laptop device frame med app-screenshot
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: INNSIKT_HERO_IMAGE },
        alt: "Finndoff Innsikt — oversikt over anbud og markedsdata",
      },
      deviceFrame: "laptop",
      style: "default",
    },

    // ── 2. TRUST BAR ──────────────────────────────────────────────────────
    {
      _type: "trustBar",
      _key: key(),
      title: "Betrodd av over 1 000 bedrifter i Norge",
      style: "scrolling",
      logos: [
        "MEF",
        "DHL",
        "JobZone",
        "Vivende",
        "ALV",
        "Arkitektbedriftene",
        "Byggmesterforbundet",
        "Brødrene Dahl",
        "BIRKsport",
        "Dignio",
        "NESO",
        "HD Medical",
        "GP Gruppen",
        "NINA",
        "Medicus",
        "Taraldsvik",
      ].map((name) => ({ _key: key(), name })),
    },

    // ── 3. FEATURE GRID (produkter) ───────────────────────────────────────
    {
      _type: "featureGrid",
      _key: key(),
      title: "Alt du trenger for å vinne anbud",
      subtitle:
        "Bygg din egen pakke — start med varsling og legg til det du trenger.",
      columns: 4,
      features: [
        {
          _key: key(),
          title: "Varsling",
          description:
            "Få relevante anbudsvarsler rett i innboksen. Vi setter opp søkeprofilen din med ekspertise — ikke selvbetjening.",
          icon: "bell",
          link: "/varsling",
        },
        {
          _key: key(),
          title: "Innsikt",
          description:
            "Se hvem som vinner anbud i din bransje, analyser konkurrenter og finn muligheter andre overser.",
          icon: "bar-chart-2",
          link: "/innsikt",
        },
        {
          _key: key(),
          title: "Anbudshjelp AI",
          description:
            "AI-verktøy som hjelper deg å lese dokumenter, forstå krav og skrive bedre tilbud — raskere.",
          icon: "bot",
          link: "/anbudshjelp-ai",
        },
        {
          _key: key(),
          title: "Konsulent",
          description:
            "Trenger du ekstra hjelp? Våre anbudskonsulenter hjelper deg med hele tilbudsprosessen.",
          icon: "users",
          link: "/konsulent",
        },
      ],
    },

    // ── 4. MID-PAGE CTA ───────────────────────────────────────────────────
    // Endring #7: CTA mellom featureGrid og timeline
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å aldri gå glipp av et anbud igjen?",
      description:
        "Start med en gratis prøveperiode. Ingen bindingstid, ingen kredittkort.",
      primaryCta: {
        text: "Prøv gratis i dag",
        link: "https://finndoff.no/signup",
      },
      secondaryCta: {
        text: "Se priser",
        link: "/priser",
      },
      style: "brand",
    },

    // ── 5. TIMELINE ───────────────────────────────────────────────────────
    // Endring #3: reframed — fokus på "vi gjør alt", ikke antall dager
    {
      _type: "timeline",
      _key: key(),
      title: "Vi gjør jobben — du vinner anbud",
      subtitle:
        "I motsetning til selvbetjeningsverktøy setter vi opp alt for deg, basert på erfaring fra over 1 000 bedrifter.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Oppstartsmøte",
          description:
            "Vi kartlegger din bedrift og bransje. Du trenger bare 30 minutter — vi tar oss av resten.",
          icon: "calendar",
          duration: "Dag 1",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Ekspertoppsett",
          description:
            "Våre spesialister konfigurerer søkeprofilen din. Ingen skjemaer å fylle ut — vi bruker vår erfaring fra 1 000+ bedrifter.",
          icon: "settings",
          duration: "Dag 2–5",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Første varsler i innboksen",
          description:
            "Du mottar relevante anbud direkte på e-post. Enkle å lese, med fargekoder og tydelig oppsett.",
          icon: "mail",
          duration: "Dag 5–10",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Vi finjusterer for deg",
          description:
            "Gi én tommel opp eller ned på varslene — vi justerer profilen automatisk til du bare får det som er relevant.",
          icon: "sliders",
          duration: "Dag 10–15",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Null støy, kun muligheter",
          description:
            "Profilen er kalibrert. Du bruker 30 minutter i uken på anbud i stedet for 4–5 timer med manuelt søk.",
          icon: "check-circle",
          duration: "Dag 20",
        },
      ],
    },

    // ── 6. COMPARISON TABLE ───────────────────────────────────────────────
    // Endring #8: sammenligning vs Doffin og manuelt søk
    {
      _type: "comparisonTable",
      _key: key(),
      title: "Finndoff vs. å gjøre det selv",
      subtitle:
        "Doffin er gratis — men tid og kompetanse koster penger. Se hva du faktisk får.",
      columns: [
        { _key: key(), name: "Finndoff", highlighted: true },
        { _key: key(), name: "Doffin (gratis)", highlighted: false },
        { _key: key(), name: "Manuelt søk", highlighted: false },
      ],
      rows: [
        { _key: key(), feature: "Automatiske varsler på e-post", values: ["true", "false", "false"] },
        { _key: key(), feature: "Ekspertoppsatt søkeprofil", values: ["true", "false", "false"] },
        { _key: key(), feature: "AI-analyse av konkurransegrunnlag", values: ["true", "false", "false"] },
        { _key: key(), feature: "Markedsinnsikt og konkurranseanalyse", values: ["true", "false", "false"] },
        { _key: key(), feature: "Anbudshjelp fra konsulent", values: ["true", "false", "false"] },
        { _key: key(), feature: "Tid brukt per uke", values: ["~30 min", "5–8 timer", "8+ timer"] },
        { _key: key(), feature: "Bransjepartner-rabatter", values: ["true", "false", "false"] },
        { _key: key(), feature: "Onboarding og løpende støtte", values: ["true", "false", "false"] },
      ],
    },

    // ── 7. TESTIMONIAL GRID ───────────────────────────────────────────────
    // Endring #2: 3 ekte kundesitatrader
    {
      _type: "testimonialGrid",
      _key: key(),
      title: "Hva kundene våre sier",
      subtitle: "Over 1 000 norske bedrifter stoler på Finndoff for å vinne offentlige anbud.",
      items: [
        {
          _key: key(),
          quote:
            "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
          name: "Tore Killi",
          role: "Daglig leder",
          company: "Brødrene Killi AS",
        },
        {
          _key: key(),
          quote:
            "Vi liker Finndoff anbudsvarsling fordi det er en rimelig tjeneste med god presisjon. Vi vet at det er mennesker med høy kompetanse om offentlige anskaffelser og teknologi som står bak. Vi har maksimal tid til å gjøre tilbud ferdig i god tid før fristen.",
          name: "Kenneth Kuraas",
          role: "Markedssjef",
          company: "Kuraas AS",
        },
        {
          _key: key(),
          quote:
            "I denne bransjen er folk ofte praktisk anlagt — vi har ikke alltid tid til å sette oss inn i kompliserte systemer. Finndoff sine e-poster er enkle å lese, med fargekoder og tydelig oppsett. Dere har vært veldig imøtekommende hele veien.",
          name: "Jo Leander Paulsen",
          role: "Ingeniør",
          company: "Nesna Maskinstasjon",
        },
      ],
    },

    // ── 8. PARTNER SEKSJON ────────────────────────────────────────────────
    // Endring #4: fremhev MEF, Byggmesterforbundet, NESO som offisielle partnere
    {
      _type: "featureGrid",
      _key: key(),
      title: "Offisielle bransjepartnere",
      subtitle:
        "Finndoff er offisiell samarbeidspartner med de ledende bransjeorganisasjonene i norsk bygg, anlegg og fagarbeid. Medlemmer får skreddersydde profiler og rabatt.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Maskinentreprenørenes Forbund (MEF)",
          description:
            "Offisiell partner for MEF Nords 334 medlemsbedrifter. Skreddersydde varslingsprofiler for anleggsbransjen, med særlig gunstige betingelser for MEF-medlemmer.",
          icon: "hard-hat",
          link: "/nyheter/partnerskap-med-maskinentreprenorenes-forbund-mef-nord",
        },
        {
          _key: key(),
          title: "Byggmesterforbundet",
          description:
            "Samarbeidsavtale med Byggmesterforbundet sikrer at norske byggmestere aldri går glipp av relevante offentlige oppdrag i sitt distrikt.",
          icon: "building-2",
          link: "/nyheter/samarbeidsavtale-med-byggmesterforbundet",
        },
        {
          _key: key(),
          title: "NESO",
          description:
            "Finndoff er offisiell partner med NESO — Norsk Elektro Serviceforbund. Medlemmer får skreddersydde anbudsvarsler for elektro og tekniske fag til medlemspris.",
          icon: "zap",
          link: "/nyheter/finndoff-inngar-samarbeid-med-neso-skreddersydd-anbudsvarsling-til-medlemspris",
        },
      ],
    },

    // ── 9. TRUST SIGNALER ─────────────────────────────────────────────────
    // Endring #6: GDPR, norsk drift, kryptert, ingen binding
    {
      _type: "featureGrid",
      _key: key(),
      title: "Trygt og enkelt",
      subtitle: "Vi er et norsk selskap som tar personvern på alvor.",
      columns: 4,
      features: [
        {
          _key: key(),
          title: "Norsk selskap",
          description: "Etablert i 2021. Kontor i Oslo og Narvik. Alle data lagres innenfor EØS.",
          icon: "flag",
        },
        {
          _key: key(),
          title: "GDPR-sertifisert",
          description: "Vi behandler persondata i henhold til GDPR og norsk personvernlovgivning.",
          icon: "shield-check",
        },
        {
          _key: key(),
          title: "Kryptert kommunikasjon",
          description: "All kommunikasjon mellom deg og Finndoff er kryptert med TLS/SSL.",
          icon: "lock",
        },
        {
          _key: key(),
          title: "Ingen bindingstid",
          description: "Prøv gratis, og si opp når du vil. Ingen skjulte gebyrer eller bindingstid.",
          icon: "circle-check",
        },
      ],
    },

    // ── 10. SLUTT-CTA ─────────────────────────────────────────────────────
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å finne ditt neste anbud?",
      description:
        "Start med en gratis prøveperiode og se hvilke anbud som passer din bedrift.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://finndoff.no/signup",
      },
      secondaryCta: {
        text: "Snakk med oss",
        link: "/om-oss#kontakt",
      },
      style: "brand",
    },

    // ── 11. FAQ ───────────────────────────────────────────────────────────
    {
      _type: "faqAccordion",
      _key: key(),
      title: "Ofte stilte spørsmål",
      items: [
        {
          _key: key(),
          question: "Hva er Finndoff?",
          answer: portableText(
            "Finndoff er en norsk tjeneste som hjelper bedrifter å finne og vinne offentlige anbud. Vi kombinerer ekspertise med AI-verktøy for å gi deg relevante anbudsvarsler, markedsinnsikt og hjelp til å skrive tilbud."
          ),
        },
        {
          _key: key(),
          question: "Hva koster det?",
          answer: portableText(
            "Varsling starter på 829 kr/mnd. Du kan legge til Innsikt (+649 kr/mnd) og Anbudshjelp AI (+1 499 kr/mnd) etter behov. Alle pakker inkluderer 2 brukere — ekstra brukere koster 199 kr/mnd."
          ),
        },
        {
          _key: key(),
          question: "Hvordan kommer jeg i gang?",
          answer: portableText(
            "Registrer deg for en gratis prøveperiode. Vi booker et oppstartsmøte der vi kartlegger din bedrift, og setter opp søkeprofilen din med vår ekspertise. Du mottar de første varslene innen få dager."
          ),
        },
        {
          _key: key(),
          question: "Hva er forskjellen fra Doffin?",
          answer: portableText(
            "Doffin er en offentlig database der du selv må søke og filtrere manuelt — noe som tar 5–8 timer i uken. Finndoff setter opp en ekspertkonfigurert søkeprofil for din bedrift, sender varsler automatisk, og gir deg AI-verktøy for å analysere og besvare anbud raskere. Du bruker 30 minutter i uken i stedet."
          ),
        },
        {
          _key: key(),
          question: "Kan jeg prøve gratis?",
          answer: portableText(
            "Ja! Vi tilbyr en gratis prøveperiode der du kan teste varsling og se hvilke anbud som er relevante for din bedrift. Ingen bindingstid, ingen kredittkort."
          ),
        },
        {
          _key: key(),
          question: "Trenger jeg å sette opp noe selv?",
          answer: portableText(
            "Nei. I motsetning til andre tjenester setter våre eksperter opp alt for deg. Vi konfigurerer søkeprofilen basert på erfaring fra over 1 000 bedrifter i din bransje. Du trenger bare 30 minutter til et oppstartsmøte."
          ),
        },
        {
          _key: key(),
          question: "Er Finndoff kun for bygg og anlegg?",
          answer: portableText(
            "Nei — Finndoff brukes av bedrifter i mange bransjer, fra kjøttindustri og helsesektoren til IT og rådgivning. Vi har spesialkompetanse på bygg, anlegg og tekniske fag, men kan sette opp profiler for alle som leverer til offentlig sektor."
          ),
        },
      ],
    },
  ],
};

async function seed() {
  console.log("🌱 Seeder forbedret hjemmeside til Sanity...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("❌ Mangler SANITY_API_WRITE_TOKEN i .env.local");
    process.exit(1);
  }

  try {
    await client.createOrReplace(homepage);
    console.log("✅ Hjemmeside oppdatert (id: page-hjem)");
    console.log("\n📋 Seksjoner seeded:");
    console.log("   1. Hero med stats + laptop-screenshot");
    console.log("   2. TrustBar (16 logoer)");
    console.log("   3. FeatureGrid (4 produkter)");
    console.log("   4. Mid-page CTA (brand-stil)");
    console.log("   5. Timeline (reframed: vi gjør alt for deg)");
    console.log("   6. ComparisonTable (vs Doffin vs manuelt søk)");
    console.log("   7. TestimonialGrid (3 ekte kundesitatrader)");
    console.log("   8. FeatureGrid (partnere: MEF, Byggmesterforbundet, NESO)");
    console.log("   9. FeatureGrid (trust-signaler: GDPR, norsk drift, kryptert, ingen binding)");
    console.log("  10. Slutt-CTA");
    console.log("  11. FAQ (7 spørsmål)");
  } catch (err) {
    console.error("❌ Seed feilet:", err);
    process.exit(1);
  }
}

seed();

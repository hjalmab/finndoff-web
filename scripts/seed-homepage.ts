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

const homepage = {
  _id: "page-hjem",
  _type: "page",
  title: "Hjem",
  slug: { _type: "slug", current: "hjem" },
  seoTitle: "Finndoff — Spar tid og vinn flere anbud",
  seoDescription:
    "Anbudsekspertise og AI-verktøy under samme tak. Varsling, innsikt og anbudshjelp for norske bedrifter i offentlig sektor.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "Spar tid og vinn flere anbud",
      subheadline:
        "Anbudsekspertise og AI-verktøy under samme tak hjelper deg å vinne oppdrag i offentlig sektor.",
      primaryCta: {
        text: "Prøv gratis",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Se hvordan det fungerer",
        link: "#produkter",
      },
      style: "default",
    },

    // 2. TrustBar
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
      ].map((name) => ({
        _key: key(),
        name,
      })),
    },

    // 3. FeatureGrid
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

    // 4. Timeline
    {
      _type: "timeline",
      _key: key(),
      title: "Kom i gang på 20 dager",
      subtitle: "Vi setter opp alt for deg — ingen selvbetjening.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Oppstartsmøte",
          description:
            "Vi kartlegger din bedrift, bransje og hvilke oppdrag du ønsker å vinne.",
          icon: "calendar",
          duration: "Dag 1",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Ekspertoppsett",
          description:
            "Våre spesialister setter opp søkeprofilen din basert på erfaring fra over 1 000 bedrifter.",
          icon: "settings",
          duration: "Dag 2–5",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Første varsler",
          description:
            "Du mottar de første anbudsvarslene og gir tilbakemelding på relevans.",
          icon: "mail",
          duration: "Dag 5–10",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Finjustering",
          description:
            "Vi justerer profilen basert på dine tilbakemeldinger for optimal treffsikkerhet.",
          icon: "sliders",
          duration: "Dag 10–15",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Optimalisert",
          description:
            "Profilen er ferdig tilpasset. Du får kun relevante anbud — ingen støy.",
          icon: "check-circle",
          duration: "Dag 20",
        },
      ],
    },

    // 5. Testimonial
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },

    // 6. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å finne ditt neste anbud?",
      description:
        "Start med en gratis prøveperiode og se hvilke anbud som passer din bedrift.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Snakk med oss",
        link: "/kontakt",
      },
      style: "brand",
    },

    // 7. FaqAccordion
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
          question: "Hva er forskjellen fra gratistjenester som Doffin?",
          answer: portableText(
            "Doffin er en offentlig database der du selv må søke og filtrere. Finndoff setter opp en ekspertkonfigurert søkeprofil for din bedrift, sender varsler automatisk, og gir deg AI-verktøy for å analysere og besvare anbud raskere."
          ),
        },
        {
          _key: key(),
          question: "Kan jeg prøve gratis?",
          answer: portableText(
            "Ja! Vi tilbyr en gratis prøveperiode der du kan teste varsling og se hvilke anbud som er relevante for din bedrift. Ingen bindingstid."
          ),
        },
        {
          _key: key(),
          question: "Trenger jeg å sette opp noe selv?",
          answer: portableText(
            "Nei. I motsetning til andre tjenester setter våre eksperter opp alt for deg. Vi konfigurerer søkeprofilen basert på erfaring fra over 1 000 bedrifter i din bransje."
          ),
        },
      ],
    },
  ],
};

async function seed() {
  console.log("Seeding homepage to Sanity...");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  try {
    await client.createOrReplace(homepage);
    console.log("Homepage created/updated successfully (id: page-hjem)");
  } catch (err) {
    console.error("Failed to seed homepage:", err);
    process.exit(1);
  }
}

seed();

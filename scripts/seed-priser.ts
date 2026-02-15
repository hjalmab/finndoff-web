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

const page = {
  _id: "page-priser",
  _type: "page",
  title: "Priser",
  slug: { _type: "slug", current: "priser" },
  seoTitle: "Priser — Enkel og modulær prising | Finndoff",
  seoDescription:
    "Start med Varsling fra 829 kr/mnd og legg til Innsikt, Anbudshjelp AI eller Konsulent etter behov. Se din totalpris med vår interaktive kalkulator.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "Enkel og modulær prising",
      subheadline:
        "Start med Varsling og legg til det du trenger. Ingen bindingstid, ingen skjulte kostnader.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      style: "default",
    },

    // 2. PricingCalculator
    {
      _type: "pricingCalculator",
      _key: key(),
      title: "Bygg din pakke",
      subtitle:
        "Velg modulene som passer din bedrift og se totalprisen umiddelbart.",
    },

    // 3. PricingTable (overview)
    {
      _type: "pricingTable",
      _key: key(),
      title: "Alle moduler i oversikt",
      subtitle:
        "Varsling er grunnpakken — legg til tilleggsmoduler etter behov.",
      plans: [
        {
          _key: key(),
          name: "Varsling",
          price: 829,
          description:
            "Grunnpakken for anbudsvarsler. Ekspertoppsett av søkeprofil, daglige varsler fra Doffin og TED.",
          isAddon: false,
          highlighted: true,
          features: [
            "Daglige anbudsvarsler",
            "Ekspertoppsett av søkeprofil",
            "Doffin + TED-overvåking",
            "E-post- og app-varsler",
            "2 brukere inkludert",
          ],
          ctaText: "Start gratis",
          ctaLink: "https://app.finndoff.no/register",
        },
        {
          _key: key(),
          name: "Innsikt",
          price: 649,
          priceLabel: "+649 kr/mnd",
          description:
            "Dypere innsikt i anbudsmarkedet med markedsanalyse, konkurrentoversikt og historiske data.",
          isAddon: true,
          highlighted: false,
          features: [
            "Markedsanalyse og trender",
            "Konkurrentoversikt",
            "Historiske data og statistikk",
            "Eksport av rapporter",
          ],
          ctaText: "Les mer",
          ctaLink: "/innsikt",
        },
        {
          _key: key(),
          name: "Anbudshjelp AI",
          price: 1499,
          priceLabel: "+1 499 kr/mnd",
          description:
            "AI-drevet analyse av konkurransegrunnlag. Automatisk nedlasting, kvalifiseringssjekk og prosjektplan.",
          isAddon: true,
          highlighted: false,
          features: [
            "Automatisk nedlasting",
            "AI-analyse og oppsummering",
            "Kvalifiseringssjekk",
            "Prosjektplan med milepæler",
          ],
          ctaText: "Les mer",
          ctaLink: "/anbudshjelp-ai",
        },
        {
          _key: key(),
          name: "Anbudskonsulent",
          priceLabel: "Etter avtale",
          description:
            "Personlig rådgivning fra erfarne anbudskonsulenter via vår partner TendPro.",
          isAddon: true,
          highlighted: false,
          features: [
            "Gjennomgang av konkurransegrunnlag",
            "Hjelp med tilbudsskrivning",
            "Strategisk rådgivning",
          ],
          ctaText: "Les mer",
          ctaLink: "/konsulent",
        },
      ],
    },

    // 4. FaqAccordion (pricing-specific)
    {
      _type: "faqAccordion",
      _key: key(),
      title: "Ofte stilte spørsmål om priser",
      items: [
        {
          _key: key(),
          question: "Er det bindingstid?",
          answer: portableText(
            "Nei, det er ingen bindingstid. Du kan si opp når som helst, og abonnementet løper ut ved slutten av inneværende måned."
          ),
        },
        {
          _key: key(),
          question: "Hva er inkludert i grunnpakken Varsling?",
          answer: portableText(
            "Varsling inkluderer daglige anbudsvarsler tilpasset din bedrift, ekspertoppsett av søkeprofil, overvåking av Doffin og TED, e-post- og app-varsler, og 2 brukere."
          ),
        },
        {
          _key: key(),
          question: "Kan jeg legge til moduler senere?",
          answer: portableText(
            "Ja, du kan legge til og fjerne tilleggsmoduler når som helst. Endringen trer i kraft umiddelbart, og prisen justeres fra neste faktura."
          ),
        },
        {
          _key: key(),
          question: "Hva koster ekstra brukere?",
          answer: portableText(
            "De første 2 brukerne er inkludert i Varsling. Ekstra brukere koster 199 kr/mnd per bruker."
          ),
        },
        {
          _key: key(),
          question: "Finnes det en gratis prøveperiode?",
          answer: portableText(
            "Ja, du kan prøve Finndoff gratis. Registrer deg på app.finndoff.no for å komme i gang."
          ),
        },
        {
          _key: key(),
          question: "Trenger jeg Varsling for å bruke tilleggsmodulene?",
          answer: portableText(
            "Ja, Varsling er grunnpakken og kreves for alle tilleggsmoduler. Innsikt, Anbudshjelp AI og Konsulent er tillegg som bygger på Varsling."
          ),
        },
        {
          _key: key(),
          question: "Hva er forskjellen på Anbudshjelp AI og Anbudskonsulent?",
          answer: portableText(
            "Anbudshjelp AI er et AI-verktøy som automatisk analyserer konkurransegrunnlag og lager prosjektplaner. Anbudskonsulent gir deg personlig rådgivning fra erfarne konsulenter via vår partner TendPro. Du kan bruke begge, eller velge den som passer best for din bedrift."
          ),
        },
        {
          _key: key(),
          question: "Er prisene eks. eller inkl. mva?",
          answer: portableText(
            "Alle priser er oppgitt eksklusiv merverdiavgift (mva)."
          ),
        },
      ],
    },

    // 5. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å komme i gang?",
      description:
        "Start med en gratis prøveperiode og opplev hvordan Finndoff kan hjelpe deg å finne og vinne flere anbud.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo med Daniel",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding priser page to Sanity...");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  try {
    await client.createOrReplace(page);
    console.log(
      "Priser page created/updated successfully (id: page-priser)"
    );
  } catch (err) {
    console.error("Failed to seed priser page:", err);
    process.exit(1);
  }
}

seed();

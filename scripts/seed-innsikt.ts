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

const product = {
  _id: "product-innsikt",
  _type: "product",
  title: "Innsikt",
  slug: { _type: "slug", current: "innsikt" },
  subtitle:
    "Overvåk rammeavtaler, innkjøpsplaner og konkurrenter — vær tidlig ute med strategisk innsikt.",
  description:
    "Finndoff Innsikt gir deg strategisk forsprang med overvåkning av rammeavtaler, innkjøpsplaner, oppdragsgivere og konkurrenter — så du kan posisjonere deg før konkurransen starter.",
  icon: "bar-chart-2",
  price: 649,
  priceLabel: "+649 kr/mnd",
  isAddon: true,
  seoTitle: "Innsikt — I posisjon før konkurransen starter | Finndoff",
  seoDescription:
    "Overvåk rammeavtaler, innkjøpsplaner og konkurrenter. Finndoff Innsikt gir deg strategisk forsprang — fra 649 kr/mnd som tillegg til Varsling.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "I posisjon før konkurransen starter",
      subheadline:
        "Overvåk rammeavtaler, innkjøpsplaner og konkurrenter – vær tidlig ute med strategisk innsikt.",
      primaryCta: {
        text: "Prøv gratis",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book møte med Thomas",
        link: "https://meetings-eu1.hubspot.com/thomas-bangstad/finndoff-kundemote",
      },
      style: "default",
    },

    // 2. FeatureGrid (4 features, 2 columns)
    {
      _type: "featureGrid",
      _key: key(),
      title: "Fire kraftige verktøy",
      subtitle:
        "Strategisk innsikt som gir deg et forsprang — lenge før konkurransen lyses ut.",
      columns: 2,
      features: [
        {
          _key: key(),
          title: "Rammeavtaler",
          description:
            "Oversikt over 1 000+ aktive rammeavtaler med fornyelsesdatoer, varsler og leverandøranalyse. Vit når avtaler utløper og posisjonér deg tidlig.",
          icon: "file-text",
        },
        {
          _key: key(),
          title: "Innkjøpsplaner",
          description:
            "Tilgang til 300+ kommunale innkjøpsplaner. Søk med nøkkelord, filtrer på fylke og kommune — og få tidlig varsling om kommende anskaffelser.",
          icon: "calendar",
        },
        {
          _key: key(),
          title: "Følg oppdragsgiver",
          description:
            "Overvåk viktige kunder og oppdragsgivere. Se alle kunngjøringer fra dem, kombiner med CPV-koder, og vær først ute når de lyser ut.",
          icon: "eye",
        },
        {
          _key: key(),
          title: "Konkurrentanalyse",
          description:
            "Se hvem som vinner anbud, analysér verdier og trender. Oppdage nye aktører i markedet og få varsler når konkurrenter vinner kontrakter.",
          icon: "users",
        },
      ],
    },

    // 3. TextSection — strategiske brukseksempler
    {
      _type: "textSection",
      _key: key(),
      title: "Slik bruker du Innsikt strategisk",
      content: [
        ...portableText(
          "En elektrikerbedrift i Tromsø bruker Innsikt til å overvåke rammeavtaler hos kommunen og Troms fylkeskommune. Når en avtale nærmer seg utløp, starter de forberedelsene måneder i forveien — og stiller sterkere i konkurransen."
        ),
        ...portableText(
          "Et rådgivningsfirma følger innkjøpsplanene til sine viktigste kunder. De ser kommende prosjekter lenge før kunngjøring, og bruker tiden til å bygge relasjoner og forberede tilbud."
        ),
        ...portableText(
          "En maskinentreprenør bruker konkurrentanalysen til å forstå markedet. De ser hvem som vinner i sine områder, hvilke priser som aksepteres, og justerer sin strategi deretter."
        ),
      ],
    },

    // 4. ComparisonTable
    {
      _type: "comparisonTable",
      _key: key(),
      title: "Forskjellen med Innsikt",
      subtitle:
        "Se hvordan strategisk innsikt forandrer måten du jobber med anbud.",
      columns: [
        { _key: key(), name: "Uten Innsikt", highlighted: false },
        { _key: key(), name: "Med Finndoff Innsikt", highlighted: true },
      ],
      rows: [
        {
          _key: key(),
          feature: "Rammeavtaler",
          values: [
            "Oppdager utløp tilfeldig",
            "Varslet måneder i forveien",
          ],
        },
        {
          _key: key(),
          feature: "Innkjøpsplaner",
          values: [
            "Ser kunngjøringen når alle andre gjør det",
            "Kjenner planene før utlysning",
          ],
        },
        {
          _key: key(),
          feature: "Oppdragsgivere",
          values: [
            "Manuell sjekk av Doffin",
            "Automatisk overvåkning og varsler",
          ],
        },
        {
          _key: key(),
          feature: "Konkurrenter",
          values: [
            "Vet lite om hvem som vinner",
            "Full oversikt over tildelinger og trender",
          ],
        },
        {
          _key: key(),
          feature: "Posisjonering",
          values: [
            "Reaktiv — svarer på det som dukker opp",
            "Proaktiv — forbereder seg i god tid",
          ],
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

    // 6. FaqAccordion (5 questions)
    {
      _type: "faqAccordion",
      _key: key(),
      title: "Ofte stilte spørsmål om Innsikt",
      items: [
        {
          _key: key(),
          question: "Hva er Finndoff Innsikt?",
          answer: portableText(
            "Finndoff Innsikt er en tilleggsmodul som gir deg strategisk markedsinnsikt — overvåkning av rammeavtaler, innkjøpsplaner, oppdragsgivere og konkurrenter. Den hjelper deg å posisjonere deg før konkurransen starter."
          ),
        },
        {
          _key: key(),
          question: "Hva koster Innsikt?",
          answer: portableText(
            "Innsikt koster 649 kr/mnd som tillegg til Varsling (829 kr/mnd). Du trenger altså Varsling som grunnpakke for å bruke Innsikt."
          ),
        },
        {
          _key: key(),
          question: "Hvor mange rammeavtaler dekker dere?",
          answer: portableText(
            "Vi har oversikt over mer enn 1 000 aktive rammeavtaler på tvers av sektorer og regioner. Databasen oppdateres løpende med nye avtaler og fornyelsesdatoer."
          ),
        },
        {
          _key: key(),
          question: "Kan jeg overvåke spesifikke oppdragsgivere?",
          answer: portableText(
            "Ja, du kan følge så mange oppdragsgivere du vil. Du får varsler når de legger ut nye kunngjøringer, og du kan kombinere overvåkning med CPV-koder for presise treff."
          ),
        },
        {
          _key: key(),
          question: "Hva inneholder konkurrentanalysen?",
          answer: portableText(
            "Konkurrentanalysen viser hvem som vinner kontrakter i dine segmenter, kontraktsverdier, trender over tid og nye aktører i markedet. Du kan sette opp varsler for spesifikke konkurrenter."
          ),
        },
      ],
    },

    // 7. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å komme i posisjon?",
      description:
        "Legg til Innsikt og få strategisk forsprang — se rammeavtaler, innkjøpsplaner og konkurrenter før alle andre.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book møte med Thomas",
        link: "https://meetings-eu1.hubspot.com/thomas-bangstad/finndoff-kundemote",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding Innsikt product to Sanity...");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  try {
    await client.createOrReplace(product);
    console.log(
      "Innsikt product created/updated successfully (id: product-innsikt)"
    );
  } catch (err) {
    console.error("Failed to seed Innsikt:", err);
    process.exit(1);
  }
}

seed();
